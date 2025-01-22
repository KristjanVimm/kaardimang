package com.kristjan.kaardimang.deck;

public class Card
{
    private CardValue cardValue;
    private Suit suit;
    private int cardRank;

    public Card (CardValue cardValue, Suit suit)
    {
        this.cardValue = cardValue;
        this.suit = suit;
        this.cardRank = cardValue.getNumericCardValue();
    }

    public Suit getSuit() {
        return suit;
    }

    public void setSuit(Suit suit) {
        this.suit = suit;
    }

    public CardValue getCardValue() {
        return cardValue;
    }

    public void setCardValue(CardValue cardValue) {
        this.cardValue = cardValue;
    }

    public int getCardRank() {
        return cardRank;
    }

    public void setCardRank(int cardRank) {
        this.cardRank = cardRank;
    }

    public String toString() {
        return getCardValue() + " OF " + getSuit();
    }

}