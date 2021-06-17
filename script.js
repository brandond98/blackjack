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

//Start game
const startGame = () => {
  playerScore = 0;
  dealerScore = 0;
  dealHands();
};

const dealHands = () => {
  for (let i = 0; i < 2; i++) {
    const playerCard = deck[Math.round(Math.random() * 52)];
    const dealerCard = deck[Math.round(Math.random() * 52)];
    playersHand.push(playerCard);
    dealersHand.push(dealerCard);
  }
};

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
