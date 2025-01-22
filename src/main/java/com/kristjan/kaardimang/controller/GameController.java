package com.kristjan.kaardimang.controller;

import com.kristjan.kaardimang.deck.Card;
import com.kristjan.kaardimang.deck.Deck;
import com.kristjan.kaardimang.repository.GameRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.TimeUnit;

@RestController
@Getter
@Setter
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {

    private final Deck deck = new Deck();
    private int lives = 3;
    private int score = 0;
    private Card card;
    private Card lastCard;
    private String choice;

    @Autowired
    GameRepository gameRepository;

    @GetMapping("score")
    public int getScore() {
        return score;
    }

    @GetMapping("lives")
    public int getLives() {
        return lives;
    }

    @GetMapping("start-round")
    public Card startRoundRequest() {
        if (lives == 0) {
            return new Card();
        }
        if (card == null) {
            card = deck.getRandomCard();
        }
        return card;
    }

    @PostMapping("make-choice")
    public void makeChoice(@RequestParam String playerChoice) {
        choice = playerChoice;
    }

    @PostMapping("wait-and-calculate")
    public Card waitAndCalculateScore() throws InterruptedException {
        TimeUnit.SECONDS.sleep(5);
        lastCard = card;
        card = deck.getRandomCard();
        String correctChoice = "";
        if (card.getCardRank() < lastCard.getCardRank()) {
            correctChoice = "lower";
        } else if (card.getCardRank() > lastCard.getCardRank()) {
            correctChoice = "higher";
        } else {
            correctChoice = "equal";
        }
        if (correctChoice.equals(choice)) {
            score += 1;
        } else {
            lives -= 1;
        }
        choice = "";
        return card;
    }

    @PostMapping("reset")
    public void resetGame() {
        lives = 3;
        score = 0;
        card = null;
        lastCard = null;
    }
}
