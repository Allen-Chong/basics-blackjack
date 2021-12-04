// Blackjack base
// 1. playable game with minimum functions: creating deck, shuffling, dealing cards, evaluatiing winner
// 2. ability for player to hit or stand
// 3. ability for dealer to hit or stand
// 4. variable value of ace where Ace - either '1' or '11

// =============== Pseudocode for version 1 ================
// 1. define player and dealer
// 2. create and shuffle game deck
// 3. draw 2 cards for player and dealer respectively
// 4. win conditions
//             --- blackjack
//             --- higher hand value
// 5. display hands of both player and dealer and declare winner

//==========================================================
//================== GLOBAL VARIABLES ======================
//==========================================================

// declare game modes
var GAME_START = " game start";
var GAME_CARDS_DRAWN = "cards drawn";
var GAME_RESULTS_SHOWN = "results shown";
var currentGameMode = GAME_START;

// declare variables to store player and dealer hands
// we use arrays as each hand will be holding multiple cards objects
var playerHand = [];
var dealerHand = [];

// declare variable to hold deck of cards
var gameDeck = " empty at the start";

var createDeck = function () {
  // Initialise an empty deck array
  var cardDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  var suits = ["hearts", "diamonds", "clubs", "spades"];
  // Loop over the suits array
  var suitIndex = 0;
  while (suitIndex < suits.length) {
    // Store the current suit in a variable
    var currentSuit = suits[suitIndex];
    console.log(`current suit: ${currentSuit}`);
    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    var rankCounter = 1;
    while (rankCounter <= 13) {
      // By default, the card name is the same as rankCounter
      var cardName = rankCounter;
      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName == 1) {
        cardName = "ace";
      } else if (cardName == 11) {
        cardName = "jack";
      } else if (cardName == 12) {
        cardName = "queen";
      } else if (cardName == 13) {
        cardName = "king";
      }
      // Create a new card with the current name, suit, and rank
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: rankCounter,
      };
      console.log(`rank: ${rankCounter}`);
      // Add the new card to the deck
      cardDeck.push(card);
      // Increment rankCounter to iterate over the next rank
      rankCounter += 1;
    }
    // Increment the suit index to iterate over the next suit
    suitIndex += 1;
  }
  // Return the completed card deck
  return cardDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
var getRandomIndex = function (max) {
  return Math.floor(Math.random() * max);
};

// Shuffle the elements in the cardDeck array
var shuffleCards = function (cardDeck) {
  // Loop over the card deck array once
  var currentIndex = 0;
  while (currentIndex < cardDeck.length) {
    // Select a random index in the deck
    var randomIndex = getRandomIndex(cardDeck.length);
    // Select the card that corresponds to randomIndex
    var randomCard = cardDeck[randomIndex];
    // Select the card that corresponds to currentIndex
    var currentCard = cardDeck[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cardDeck[currentIndex] = randomCard;
    cardDeck[randomIndex] = currentCard;
    // Increment currentIndex
    currentIndex = currentIndex + 1;
  }
  // Return the shuffled deck
  return cardDeck;
};

// function that creates and shuffles a deck
var makeDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleCards(newDeck);
  return shuffledDeck;
};

//==========================================================
//================== GAME FUNCTIONS ========================
//==========================================================
var checkForBJ = function (handArray) {
  // check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;
  // if there is bj, return true
  // ppossible scenarios:
  // 1st card ace, 2nd card 10 or picture cards
  // 1st casrd 10 or picture cards, second card ace
  if (
    (playerCardOne.name == "ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo == "ace")
  ) {
    isBlackJack = true;
  }
  // else return false - dont need statement because variable already set to false
  return isBlackJack;
};

// function that calculates a hand
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  // loop through player or dealer hand and add up the values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];

    // for jack, queen, king, value is 10
    if (
      currentCard.name == "jack" ||
      currentCard.name == "queen" ||
      currentCard.name == "king"
    ) {
      totalHandValue += 10;
    } else {
      totalHandValue += currentCard.rank;
    }
    index += 1;
  }
  return totalHandValue;
};
// function that displays the player and dealer hands in a message
// player hand
// dealer hand

//==========================================================
//================== MAIN FUNCTIONS ========================
//==========================================================
var main = function (input) {
  var outputMessage = "";
  // FIRST CLICK
  if (currentGameMode == GAME_START) {
    // Create the game deck
    gameDeck = makeDeck();
    console.log(gameDeck);
    // Deal 2 cards to player and dealer respectively
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());

    console.log("player hand ==> ");
    console.log(playerHand);
    console.log("dealer hannd ==> ");
    console.log(dealerHand);

    // progress the gameMode
    currentGameMode = GAME_CARDS_DRAWN;

    // write and return appropriate output message
    outputMessage =
      'Everyone had been dealt 2 cards. Click "submit" to evaluate cards!';
    return outputMessage;
  }

  // SECOND CLICK
  if (currentGameMode == GAME_CARDS_DRAWN)
    // check for blackjack
    var playerHasBJ = checkForBJ(playerHand);
  var dealerHasBJ = checkForBJ(dealerHand);

  console.log("Does player have Blackjack? ==?", playerHasBJ);
  console.log("Does dealer have BlackJack? ==?", dealerHasBJ);

  if (playerHasBJ == true || dealerHasBJ == true) {
    // both player and dealer has blackjack -> tie
    if (playerHasBJ == true && dealerHasBJ == true) {
      outputMessage =
        displayPlayerAndDealderHands(playerhand, dealerHand) +
        "It is a blackjack tie!";
    }
    // only player has blackjack -> player win
    else if (playerHasBJ == true && dealerHasBJ == false) {
      outputMessage =
        displayPlayerAndDealderHands(playerhand, dealerHand) +
        "Player wins by blackjack!";
    }
    // only dealer has blackjack -> dealer win
    else {
      outputMessage =
        displayPlayerAndDealderHands(playerhand, dealerHand) +
        "Dealer wins by blackjack!";
    }
  } else {
    outputMessage =
      displayPlayerAndDealderHands(playerhand, dealerHand) +
      " There is no blackjack!";
    console.log(outputMessage);
  }
  // no  blackjack -> game continues
  // calculate the total hand value of both player and dealer
  var playerHandTotalValue = calculateTotalHandValue(playerHand);
  var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
  // compare total hand value
  // same value -> tie
  if (playerHandTotalValue == dealerHandTotalValue) {
    outputMessage =
      displayPlayerAndDealderHands(playerHand, dealerHand) +
      "<br>It is a tie!" +
      displayHandTotalValues(playerHandTotalValue, dealerHand);
    console.log("It is a tie!");
  }
  // player higher -> player wins
  else if (playerHandTotalValue > dealerHandTotalValue) {
    outputMessage =
      displayPlayerAndDealderHands(playerhand, dealerHand) +
      "<br>Player Wins!" +
      displayHandTotalValues(playerHandTotalValue, dealerHand);
    console.log("Player wins!");
  }
  // dealer higher -> dealer wins
  else {
    outputMessage =
      displayPlayerAndDealderHands(playerhand, dealerHand) +
      "<br>Dealer Wins!" +
      displayHandTotalValues(playerHandTotalValue, dealerHand);
    console.log("Dealer wins!");
  }

  // change game mode
  // appropriate output message
};

// //Base
// //Gameplay Description
// //The main function runs on each player's turn. The sequence of actions in the game might be the following.
// //Deck is shuffled. User clicks Submit to deal cards. The cards are analysed for game winning conditions, e.g. Blackjack.The cards are displayed to the user.The user decides whether to hit or stand, using the submit button to submit their choice.The user's cards are analysed for winning or losing conditions.The computer decides to hit or stand automatically based on game rules.The game either ends or continues.

// //Second Version: Add Player Hit or Stand
// //The player hitting or standing is different from the dealer hitting or standing. The rules state that the dealer hits or stands after all players are done, so let's work on the players hitting or standing first.

// //The player hitting or standing is a new mode in the game that allows the player to enter their choice. Add the logic for when the player busts (has a total score of >21).

// //Refactor your logic to wait until the player is done to evaluate the game-winning condition.The player should not immediately lose if he busts - there is a possibility he will tie with the dealer if the dealer also busts.

// //Test your code.

// // create the first game mode to deal cards (var)
// var gameMode = ''

// // create a function to shuffle deck
//   // Get a random index ranging from 0 (inclusive) to max (exclusive).
//   var getRandomIndex = function (max) {
//     return Math.floor(Math.random() * max);
//   };

//   // Shuffle the elements in the cardDeck array
//   var shuffleCards = function (cardDeck) {
//     // Loop over the card deck array once
//     var currentIndex = 0;
//     while (currentIndex < cardDeck.length) {
//       // Select a random index in the deck
//       var randomIndex = getRandomIndex(cardDeck.length);
//       // Select the card that corresponds to randomIndex
//       var randomCard = cardDeck[randomIndex];
//       // Select the card that corresponds to currentIndex
//       var currentCard = cardDeck[currentIndex];
//       // Swap positions of randomCard and currentCard in the deck
//       cardDeck[currentIndex] = randomCard;
//       cardDeck[randomIndex] = currentCard;
//       // Increment currentIndex
//       currentIndex = currentIndex + 1;
//     }
//     // Return the shuffled deck
//     return cardDeck;
//   };

// const suits = ['Spades', 'Diamonds', 'Hearts', 'Clubs'];
// const values = ['Ace','2','3','4','5','6','7','8','9','10','Jack','Queen','King'];
// var generateRandomCom = function ();
// var comBJ = generateRandomBJ ();

// // empty array to store cards
// let deck =[]
// // create a function to get computer cards
// var comBJ = generateRandomBJ
// if (userBJ> comBJ){
//   return 'You have won!'
// }
// if (comBJ > userBJ) {
//   return 'You have lost!';
// } else;
// {
//   return 'You have drawn!';
// }
// // create function to determine winner

// }
// }
// // arrays to store computer and player cards
// var playerHand = [];
// var comHand = [];
// // create the second game mode to hit or stand (var)
// // create a function to hit or stand when player clicks 1 or 2
// // create a function to hit or stand computer according to rules
// // create a function to determine the winner

// var main = function (input) {
//   // call line 16 to obtain 2 random cards
//   var userBJ = (generateRandomBJ, generateRandomBJ);

//   // display string to show dealt cards
//   // change game mode when submitted
//   // display string to prompt user to hit or stand
//   // get player move = input
//   // display string to display player final move
//   // call line 21 to get computer final move
//   // call line 22 to determine winner
//   // display string to show winner
// };
