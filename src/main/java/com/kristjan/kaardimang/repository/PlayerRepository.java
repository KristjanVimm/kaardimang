package com.kristjan.kaardimang.repository;

import com.kristjan.kaardimang.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, String> {
}
