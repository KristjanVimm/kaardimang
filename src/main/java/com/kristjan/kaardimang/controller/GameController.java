package com.kristjan.kaardimang.controller;

import com.kristjan.kaardimang.deck.Card;
import com.kristjan.kaardimang.deck.Deck;
import com.kristjan.kaardimang.repository.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class GameController {

    private final Deck deck = new Deck();

    @Autowired
    GameRepository gameRepository;

    @GetMapping("start-round")
    public Card startRoundRequest() {
        return deck.getRandomCard();
    }

}
