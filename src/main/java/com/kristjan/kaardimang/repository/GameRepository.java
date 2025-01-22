package com.kristjan.kaardimang.repository;

import com.kristjan.kaardimang.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepository extends JpaRepository<Game, Long> {
}
