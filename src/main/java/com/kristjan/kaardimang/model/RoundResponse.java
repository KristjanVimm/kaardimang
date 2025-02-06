package com.kristjan.kaardimang.model;

import com.kristjan.kaardimang.model.deck.Card;
import lombok.Data;

@Data
public class RoundResponse {

    private Card card;
    private RoundResponseMessage message;

}
