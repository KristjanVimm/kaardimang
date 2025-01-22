package com.kristjan.kaardimang.deck;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Card
{
    private CardValue cardValue;
    private Suit suit;
    private int cardRank;

    public Card (CardValue cardValue, Suit suit) {
        this.cardValue = cardValue;
        this.suit = suit;
        this.cardRank = cardValue.getNumericCardValue();
    }

    public Card() {
    }

    public String toString() {
        return getCardValue() + " OF " + getSuit();
    }

}