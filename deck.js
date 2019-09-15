class Deck {
  constructor(cards) {
    this.cards = cards;
    this.matchedCards = [];
    this.selectedCards = [];
    this.matches = 0;
    this.totalGuesses = 0;
    this.player1Matches = 0;
    this.player2Matches = 0;
  }
  shuffle() {

  }
  checkSelectedCards() {
    this.totalGuesses ++;
    var matchID = this.selectedCards[0].matchInfo;
    return deck.selectedCards.every(function(card) {
      return card.matchInfo === matchID;
    });
  }
  moveToMatched() {
    this.matchedCards = this.matchedCards.concat(this.selectedCards);
  }
}
