package com.kristjan.kaardimang.service;

import com.kristjan.kaardimang.entity.Game;
import com.kristjan.kaardimang.entity.Player;
import com.kristjan.kaardimang.model.Choice;
import com.kristjan.kaardimang.model.RoundResponse;
import com.kristjan.kaardimang.model.RoundResponseMessage;
import com.kristjan.kaardimang.model.deck.Card;
import com.kristjan.kaardimang.model.deck.Deck;
import com.kristjan.kaardimang.repository.GameRepository;
import com.kristjan.kaardimang.repository.PlayerRepository;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.concurrent.atomic.AtomicBoolean;

@Service
public class GameService {

    @Autowired
    GameRepository gameRepository;

    private final Deck deck = new Deck();
    @Getter
    private int lives = 3;
    @Getter
    private int score = 0;
    private Card card;
    private Card lastCard;
    private Choice choice;
    private AtomicBoolean roundStarted = new AtomicBoolean(false);
    private Long startTime;
    private Player player;
    @Autowired
    private PlayerRepository playerRepository;

    public void checkIfFirstRound(RoundResponse roundResponse, String playerName) {
        if (card == null) {
            card = deck.getRandomCard();
            roundResponse.setCard(card);
            startTime = new Date().getTime();
            this.player = playerRepository.findById(playerName).orElseThrow();
        } else {
            roundResponse.setCard(card);
        }
        roundResponse.setMessage(RoundResponseMessage.OK);
    }

    public RoundResponse checkLivesZero(RoundResponse roundResponse) {
        if (lives <= 0) {
            roundResponse.setCard(new Card());
            roundResponse.setMessage(RoundResponseMessage.GAME_OVER);
            return roundResponse;
        }
        return null;
    }

    public RoundResponse checkRoundStarted(RoundResponse roundResponse) {
        if (!roundStarted.compareAndSet(false, true)) {
            roundResponse.setCard(null);
            roundResponse.setMessage(RoundResponseMessage.DOUBLE_ROUND_ERROR);
            return roundResponse;
        }
        return null;
    }

    public void initChoice(Choice playerChoice) {
        choice = playerChoice;
    }

    public void prepareAndCompleteRound(RoundResponse roundResponse) {
        lastCard = card;
        card = deck.getRandomCard();
        checkPlayerChoice(roundResponse);
        choice = null;
        roundResponse.setCard(card);
    }

    public void checkRoundStartedAtWaitEnd() {
        if (!roundStarted.compareAndSet(true, false)) {
            throw new RuntimeException("Atomic boolean roundStarted was false at function end");
        }
    }

    public void checkPlayerChoice(RoundResponse roundResponse) {
        if (lastCard.getCardRank() < card.getCardRank() && choice == Choice.HIGHER ||
                lastCard.getCardRank() > card.getCardRank() && choice == Choice.LOWER ||
                lastCard.getCardRank() == card.getCardRank() && choice == Choice.EQUAL) {
            roundResponse.setMessage(RoundResponseMessage.CORRECT);
            score++;
        } else {
            if (choice == null) {
                roundResponse.setMessage(RoundResponseMessage.NO_CHOICE);
            } else {
                roundResponse.setMessage(RoundResponseMessage.WRONG);
            }
            lives --;
            if (lives <= 0) {
                roundResponse.setMessage(RoundResponseMessage.GAME_OVER);
                Long duration = new Date().getTime() - startTime;
                Game game = new Game(score, duration, player);
                gameRepository.save(game);
            }
        }
    }

    public void checkRoundStartedAtWait() {
        if (!roundStarted.get()) {
            throw new RuntimeException("Atomic boolean roundStarted is false at waitAndCalculate function start");
        }
    }

    public void resetAllVariables() {
        lives = 3;
        score = 0;
        card = null;
        lastCard = null;
        choice = null;
        roundStarted.set(false);
        startTime = 0L;
    }

    public RoundResponse checkRoundStartedAtReset(RoundResponse roundResponse) {
        if (roundStarted.get()) {
            roundResponse.setCard(card);
            roundResponse.setMessage(RoundResponseMessage.BAD_RESET);
            return roundResponse;
        }
        return null;
    }

}
