// Initialise player score, dealer score, deck
let playerScore = 0;
let dealerScore = 0;
let deck = [];
let playersHand = [];
let dealersHand = [];

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

//Create deck
const createDeck = () => {
  ranks.forEach((rank) => {
    suits.forEach((suit) => {
      deck.push(`${rank} of ${suit}`);
    });
  });
};

//Shuffle deck - code copied from https://www.geeksforgeeks.org/how-to-shuffle-an-array-using-javascript/
const shuffleDeck = (deck) => {
  for (let i = deck.length - 1; i > 0; i--) {
    // Generate random number
    const j = Math.floor(Math.random() * (i + 1));

    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
};

//Start game
const startGame = () => {
  playerScore = 0;
  dealerScore = 0;
  createDeck();
  shuffleDeck(deck);
  dealHands();
};

//Deal cards to player and computer
const dealHands = () => {
  for (let i = 0; i < 2; i++) {
    const playerCard = playersHand.push(deck[0]);

    deck.shift();
    const dealerCard = dealersHand.push(deck[0]);
    deck.shift();
  }
};

//Hit/Stand funtionality - remove cards from deck/add up scores - ACE 11 or 1 functionality

//Determine who won game

//Replay
