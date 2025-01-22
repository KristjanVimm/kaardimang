package com.kristjan.kaardimang.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@AllArgsConstructor
public class Game {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long gameId;
    private String playerName;

    public Game(String playerName) {
        this.playerName = playerName;
    }

}
