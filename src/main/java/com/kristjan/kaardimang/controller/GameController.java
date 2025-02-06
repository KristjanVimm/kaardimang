package com.kristjan.kaardimang.controller;

import com.kristjan.kaardimang.entity.Player;
import com.kristjan.kaardimang.model.RoundResponse;
import com.kristjan.kaardimang.model.RoundResponseMessage;
import com.kristjan.kaardimang.entity.Game;
import com.kristjan.kaardimang.model.Choice;
import com.kristjan.kaardimang.repository.GameRepository;
import com.kristjan.kaardimang.service.GameService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.TimeUnit;

@RestController
@Getter
@Setter
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {


    @Autowired
    GameRepository gameRepository;
    @Autowired
    GameService gameService;

    @GetMapping("score")
    public int getScore() {
        return gameService.getScore();
    }

    @GetMapping("lives")
    public int getLives() {
        return gameService.getLives();
    }

    @PostMapping("start-round")
    public RoundResponse startRoundRequest(@RequestParam String playerName) {
        RoundResponse roundResponse = new RoundResponse();
        RoundResponse roundStarted = gameService.checkRoundStarted(roundResponse);
        if (roundStarted != null)
            return roundStarted;
        RoundResponse livesZero = gameService.checkLivesZero(roundResponse);
        if (livesZero != null)
            return livesZero;
        gameService.checkIfFirstRound(roundResponse, playerName);
        return roundResponse;
    }

    @PostMapping("make-choice")
    public void makeChoice(@RequestParam Choice playerChoice) {
        gameService.initChoice(playerChoice);
    }

    @PostMapping("wait-and-calculate")
    public RoundResponse waitAndCalculateScore() throws InterruptedException {
        RoundResponse roundResponse = new RoundResponse();
        gameService.checkRoundStartedAtWait();
        TimeUnit.SECONDS.sleep(5);
        gameService.prepareAndCompleteRound(roundResponse);
        gameService.checkRoundStartedAtWaitEnd();
        return roundResponse;
    }

    @PostMapping("reset")
    public RoundResponse resetGame() {
        RoundResponse roundResponse = new RoundResponse();
        RoundResponse roundStartedAtReset = gameService.checkRoundStartedAtReset(roundResponse);
        if (roundStartedAtReset != null) return roundStartedAtReset;
        gameService.resetAllVariables();
        roundResponse.setMessage(RoundResponseMessage.OK);
        roundResponse.setCard(null);
        return roundResponse;
    }

    @GetMapping("games")
    public Page<Game> getGames(Pageable pageable, @RequestParam String playerName) {
        if (playerName.isEmpty()) {
            return gameRepository.findAll(pageable);
        }
        return gameRepository.findByPlayer_Name(pageable, playerName);
    }
}


























