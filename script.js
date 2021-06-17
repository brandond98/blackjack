// Initialise player score, dealer score, deck
let playerScore = 0;
let dealerScore = 0;
let deck = [];
const suits = ["spades", "hearts", "diamonds", "clubs"];
const ranks = [
  "ace",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "jack",
  "queen",
  "king",
];

//Start game

//Create deck
const createDeck = () => {
  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      deck.push(`${rank} of ${suit}`);
    });
  });
};

createDeck();

//Deal cards to player and computer

//Hit/Stand funtionality - remove cards from deck/add up scores - ACE 11 or 1 functionality

//Determine who won game

//Replay
