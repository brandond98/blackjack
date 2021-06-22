// Initialise player score, dealer score, deck, hands
let playerScore = 0;
let dealerScore = 0;
let deck = [];
let playersHand = [];
let dealersHand = [];
let gameOver = false;

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

  $("#dealers-cards li:nth-child(2)").css("background-color", "#fff");
  $(".score.player").css("visibility", "visible");

  if (playerScore === 21) {
    dealersTurn();
  }
};

//Deal cards to player and computer

const dealCard = (player) => {
  const card = deck[0];
  const cardValue = card.split(" ")[0];

  if (player === "player") {
    playersHand.push(card);
    $("#players-cards").append(`<li>${card}</li>`);
    playerScore += calculateScore(cardValue);
    $(".score.player").text(playerScore);
  } else if (player === "dealer") {
    dealersHand.push(card);
    $("#dealers-cards").append(`<li>${card}</li>`);
    dealerScore += calculateScore(cardValue);
    $(".score.dealer").text(dealerScore);
  }
  deck.shift();
};

const dealHands = () => {
  for (let i = 0; i < 2; i++) {
    //Get card and it's value and add to hand/score
    dealCard("player");
    dealCard("dealer");
  }
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

//Dealers turn

const dealersTurn = () => {
  $("#dealers-cards li:nth-child(2)").css("background-color", "green");
  $(".score.dealer").css("visibility", "visible");

  while (dealerScore < 17) {
    dealCard("dealer");
  }
  checkForWinner();
};

//Hit/Stand funtionality - remove cards from deck/add up scores - ACE 11 or 1 functionality

$("#hit-button").click(function () {
  dealCard("player");
  if (playerScore > 21) {
    alert("Bust! Dealer wins.");
  }
});

$("#stand-button").click(function () {
  dealersTurn();
  checkForWinner();
});

//Determine who won game

const checkForWinner = () => {
  if (playerScore === dealerScore) {
    alert("Draw!");
  } else if (dealerScore > playerScore && dealerScore <= 21) {
    alert("Dealer wins!");
  } else if (playerScore > dealerScore && playerScore <= 21) {
    alert("Player wins!");
  } else {
    alert("Player wins!");
  }

  gameOver = true;
};

if (gameOver) {
}

$("#start-game").click(function () {
  startGame();
  $("#start-game").css("visibility", "hidden");
  $("#hit-button").css("visibility", "visible");
  $("#stand-button").css("visibility", "visible");
});

//Replay
