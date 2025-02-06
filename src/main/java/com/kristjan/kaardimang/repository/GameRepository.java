package com.kristjan.kaardimang.repository;

import com.kristjan.kaardimang.entity.Game;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface GameRepository extends JpaRepository<Game, Long> {

    Page<Game> findByPlayer_Name(Pageable pageable, String name);

}
