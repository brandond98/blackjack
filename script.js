// Initialise player score, dealer score, deck, hands
let playerScore;
let dealerScore;
let deck;
let playersHand;
let dealersHand;

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

//Start game - reset everything

const startGame = () => {
  $("#start-game").css("display", "none");
  $(".hit-container").attr("style", "display: flex !important");
  $(".stand-container").attr("style", "display: flex !important");
  $("#play-again").css("display", "none");
  $(".score-container.dealer").css("visibility", "hidden");
  $(".cards").empty();
  $("h1").remove();

  playerScore = [0, 0];
  dealerScore = [0, 0];
  deck = [];
  playersHand = [];
  dealersHand = [];

  createDeck();
  shuffleDeck(deck);
  dealHands();

  //Hide second dealers card and show back of card

  $("#dealers-area .cards :nth-child(2)").css("display", "none");
  $("#dealers-area .cards").append(
    '<img class="card back"src="img/red_back.png"></img>'
  );
  $(".score-container.player").css("visibility", "visible");

  //Check if either player have a 'natural' and check for winner if they do
  if (playerScore.includes(21) || dealerScore.includes(21)) {
    checkForWinner();
  }
};

//Deal cards to player and computer

const dealCard = (player) => {
  //Get card details, first word of card, and image
  const card = deck[0];
  const cardValue = card.split(" ")[0];
  const cardImage = `<img class='card' src='img/${card}.png'></img>`;
  const playerScoreElement = ".players-score";
  const dealerScoreElement = ".dealers-score";

  //Check if it is player or dealers turn and add score/change score text
  if (player === "player") {
    playersHand.push(card);
    $("#players-area .cards").append(cardImage);
    playerScore[0] += calculateScore(cardValue, "player");
    playerScore[1] += calculateScore(cardValue, "player");
    if (playerScore[0] === playerScore[1]) {
      $(playerScoreElement).text(playerScore[0]);
    } else if (playerScore[0] === 21 || playerScore[1] === 21) {
      $(playerScoreElement).text(21);
    } else {
      $(playerScoreElement).text(`${playerScore[0]} or ${playerScore[1]}`);
    }
  } else if (player === "dealer") {
    dealersHand.push(card);
    $("#dealers-area .cards").append(cardImage);
    dealerScore[0] += calculateScore(cardValue, "dealer");
    dealerScore[1] += calculateScore(cardValue, "dealer");
    if (dealerScore[0] === dealerScore[1]) {
      $(dealerScoreElement).text(dealerScore[0]);
    } else if (dealerScore[0] === 21 || dealerScore[1] === 21) {
      $(dealerScoreElement).text(21);
    } else {
      $(dealerScoreElement).text(`${dealerScore[0]} or ${dealerScore[1]}`);
    }
  }
  //Play card deal sound and remove that card from deck
  dealCardSound.play();
  deck.shift();
};

//Deal 2 cards to the player and delaer to start thge game
const dealHands = () => {
  for (let i = 0; i < 2; i++) {
    //Get card and it's value and add to hand/score
    dealCard("player");
    dealCard("dealer");
  }
};

//Calculate score
const calculateScore = (card, player) => {
  if (card === "ace") {
    if (player === "player") {
      playerScore[0] += 1;
      playerScore[1] += 11;
    } else if (player === "dealer") {
      dealerScore[0] += 1;
      dealerScore[1] += 11;
      console.log("ace");
    }
    return 0;
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
  let stop = false;

  if (dealerScore[0] >= 17 || dealerScore[1] >= 17) {
    checkForWinner();
    return;
  }
  //Make sure that if either of the dealers score are 17 or over the dealers turn ends
  while (dealerScore[0] < 17 || dealerScore[1] < 17) {
    dealCard("dealer");
    if (dealerScore[0] >= 17 && dealerScore[0] <= 21) {
      break;
    } else if (dealerScore[1] >= 17 && dealerScore[1] <= 21) {
      break;
    }
  }
  checkForWinner();
};

//Determine who won game

const checkForWinner = () => {
  //Get the score from user/dealer that can be used
  const eligibleDealerScoreArr = dealerScore
    .filter((score) => {
      return score <= 21;
    })
    .sort((a, b) => {
      return b - a;
    });

  const eligiblePlayerScoreArr = playerScore
    .filter((score) => {
      return score <= 21;
    })
    .sort((a, b) => {
      return b - a;
    });

  const eligiblePlayerScore = eligiblePlayerScoreArr[0];
  const eligibleDealerScore = eligibleDealerScoreArr[0];

  //Change score text to eligible score
  if (!eligibleDealerScore) {
    $(".dealers-score").text(dealerScore[0]);
  } else {
    $(".dealers-score").text(eligibleDealerScore);
  }

  if (!eligiblePlayerScore) {
    $(".players-score").text(playerScore[0]);
  } else {
    $(".players-score").text(eligiblePlayerScore);
  }

  if (eligiblePlayerScore === eligibleDealerScore) {
    $("#game-area").append("<h1>It's a draw!</h1>");
  } else if (
    eligibleDealerScore > eligiblePlayerScore &&
    eligibleDealerScore <= 21
  ) {
    $("#game-area").append("<h1>The Dealer wins!</h1>");
  } else {
    $("#game-area").append("<h1>You win! 🥳</h1>");
  }

  gameOver();
};

//Game over/Replay

const gameOver = () => {
  $(".back").remove();
  $("#dealers-area .cards :nth-child(2)").css("display", "inline");
  $(".score-container.dealer").css("visibility", "visible");

  $(".hit-container").css("display", "none");
  $(".stand-container").css("display", "none");
  $("#play-again").css("display", "inline");
};

//Buttons functionality

$("#hit-button").click(function () {
  dealCard("player");
  if (playerScore[0] > 21 && playerScore[1] > 21) {
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
