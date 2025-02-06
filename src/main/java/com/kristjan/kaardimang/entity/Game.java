package com.kristjan.kaardimang.entity;

import jakarta.persistence.*;
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
    private Long id;
    private int score;
    private Long duration;
    @ManyToOne
    private Player player;

    public Game(int score, Long duration, Player player) {
        this.score = score;
        this.duration = duration;
        this.player = player;
    }
}
