package com.kristjan.kaardimang.controller;

import com.kristjan.kaardimang.entity.Player;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.kristjan.kaardimang.repository.PlayerRepository;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class PlayerController {

    @Autowired
    PlayerRepository playerRepository;

    @PostMapping("players")
    public List<Player> addPlayer(@RequestBody Player player) {
        playerRepository.save(player);
        return playerRepository.findAll();
    }

    @GetMapping("players")
    public List<Player> getPlayers() {
        return playerRepository.findAll();
    }

    @GetMapping("player-exists")
    public boolean checkIfPlayerExists(@RequestParam String playerName) {
        Optional<Player> playerOptional = playerRepository.findById(playerName);
        return playerOptional.isPresent();
    }

}
