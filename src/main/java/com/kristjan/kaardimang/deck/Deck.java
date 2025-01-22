package com.kristjan.kaardimang.deck;

import java.util.*;

public class Deck {

    private final List<Card> deck;
    private final Random randomGenerator;

    public Deck () {
        this.randomGenerator = new Random();
        this.deck = new ArrayList<>();
        for (int i=0; i<13; i++) {
            CardValue value = CardValue.values()[i];
            for (int j=0; j<4; j++) {
                Card card = new Card(value, Suit.values()[j]);
                this.deck.add(card);
            }
        }
    }

    public Card getRandomCard() {
        int index = randomGenerator.nextInt(deck.size());
        return deck.get(index);
    }

//    public static void main(String[] args) {
//        Deck deck = new Deck();
//        Card randomCard = deck.getRandomCard();
//        System.out.println(randomCard);
//        System.out.println(randomCard.getCardRank());
//    }

}
