// Initialise player score, dealer score, deck, hands
let playerScore = 0;
let dealerScore = 0;
let deck = [];
let playersHand = [];
let dealersHand = [];

const dealCardSound = new Audio("sounds/536784__egomassive__deal.ogg");

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
  $("#start-game").css("display", "none");
  $(".hit-container").attr("style", "display: flex !important");
  $(".stand-container").attr("style", "display: flex !important");
  $("#play-again").css("display", "none");
  $(".score-container.dealer").css("visibility", "hidden");
  $(".cards").empty();
  $("h1").remove();

  playerScore = 0;
  dealerScore = 0;
  deck = [];
  playersHand = [];
  dealersHand = [];

  $("ul").empty();
  createDeck();
  shuffleDeck(deck);
  dealHands();

  $("#dealers-area .cards :nth-child(2)").css("display", "none");
  $("#dealers-area .cards").append(
    '<img class="card back"src="img/red_back.png"></img>'
  );
  $(".score-container.player").css("visibility", "visible");

  if (playerScore === 21) {
    checkForWinner();
  }
};

//Deal cards to player and computer

const dealCard = (player) => {
  const card = deck[0];
  const cardValue = card.split(" ")[0];
  const cardImage = `<img class='card' src='img/${card}.png'></img>`;

  if (player === "player") {
    playersHand.push(card);
    $("#players-area .cards").append(cardImage);
    playerScore += calculateScore(cardValue);
    $(".players-score").text(playerScore);
  } else if (player === "dealer") {
    dealersHand.push(card);
    $("#dealers-area .cards").append(cardImage);
    dealerScore += calculateScore(cardValue);
    $(".dealers-score").text(dealerScore);
  }

  dealCardSound.play();
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
    return 9;
  } else {
    return 10;
  }
};

//Dealers turn

const dealersTurn = () => {
  while (dealerScore < 17) {
    dealCard("dealer");
  }
  checkForWinner();
};

//Hit/Stand funtionality - remove cards from deck/add up scores - ACE 11 or 1 functionality

//Determine who won game

const checkForWinner = () => {
  if (playerScore === dealerScore) {
    $("#game-area").append("<h1>It's a draw!</h1>");
  } else if (dealerScore > playerScore && dealerScore <= 21) {
    $("#game-area").append("<h1>The Dealer wins!</h1>");
  } else {
    $("#game-area").append("<h1>You win!🥳</h1>");
  }

  gameOver();
};

//Replay

const gameOver = () => {
  $(".back").remove();
  $("#dealers-area .cards :nth-child(2)").css("display", "inline");
  $(".score-container.dealer").css("visibility", "visible");
  $(".hit-container").css("display", "none");
  $(".stand-container").css("display", "none");
  $("#play-again").css("display", "inline");
};

//Button functionality

$("#hit-button").click(function () {
  dealCard("player");
  if (playerScore > 21) {
    $("#game-area").append("<h1>Bust! The Dealer wins.</h1>");
    gameOver();
  }
});

$("#stand-button").click(function () {
  dealersTurn();
});

$("#start-game").click(function () {
  startGame();
});

$("#play-again").click(function () {
  startGame();
});
