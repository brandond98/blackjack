// Initialise player score, dealer score, deck, hands
let playerScore = 0;
let dealerScore = 0;
let deck = [];
let playersHand = [];
let dealersHand = [];

//Create deck
const createDeck = () => {
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
  deck = [];
  playersHand = [];
  dealersHand = [];

  $("ul").empty();
  createDeck();
  shuffleDeck(deck);
  dealHands();
};

//Deal cards to player and computer
const dealHands = () => {
  for (let i = 0; i < 2; i++) {
    //Get card and it's value and add to hand/score
    const playerCard = deck[0];
    const playerCardValue = playerCard.split(" ")[0];
    playersHand.push(playerCard);
    $("#players-cards").append(`<li>${playerCard}</li>`);
    playerScore += calculateScore(playerCardValue);
    //Remove card from deck
    deck.shift();

    const dealerCard = deck[0];
    const dealerCardValue = dealerCard.split(" ")[0];
    playersHand.push(dealerCard);
    $("#dealers-cards").append(`<li>${dealerCard}</li>`);
    dealerScore += calculateScore(dealerCardValue);
    deck.shift();
  }
  //Update on screen score
  $(".score.player").text(playerScore);
  $(".score.dealer").text(dealerScore);
  checkForWinner();
};

//Calculate score
const calculateScore = (card) => {
  if (card === "ace") {
    return 11;
  } else if (card === "one") {
    return 1;
  } else if (card === "two") {
    return 2;
  } else if (card === "three") {
    return 3;
  } else if (card === "four") {
    return 4;
  } else if (card === "five") {
    return 5;
  } else if (card === "six") {
    return 6;
  } else if (card === "seven") {
    return 7;
  } else if (card === "eight") {
    return 8;
  } else if (card === "nine") {
    return 5;
  } else {
    return 10;
  }
};

//Hit/Stand funtionality - remove cards from deck/add up scores - ACE 11 or 1 functionality

//Determine who won game

const checkForWinner = () => {
  if (playerScore === 21) {
    console.log("Player Wins!");
  }
};

//Replay

$("#start-game").click(function () {
  startGame();
  $("#start-game").css("visibility", "hidden");
  $("#hit-button").css("visibility", "visible");
  $("#stand-button").css("visibility", "visible");
});
