// ===== REQUIREMENTS ===== //
// 1) there are 2 players who take turns
// 2) when a player clicks submit, the game rolls 2 dice and shows the dice rolls eg. 3 and 6
// 3) the player picks the orsder of the dice they want eg. if they want 63, they will specify that the 2nd dice goes first
// 4) after both players have rolled and chosen dice order, the player with the higher combined number wins

// ===== BREAKDOWN AND PLANNING ===== //
// v1. Rolls 2 dice and turns the output for 1 player. That player chooses the dice order and gets the correct return output.

// v2. Refactored code to include player 2
//      - global variables for currentPlayer; allPlayersScore
//      - refactor myOutputValue to interact with each player
//      - write logic for player 1 to go first then player 2, and finally point towards comparing score

// v3. Implement comparing dice scores and declare winner

// v4. Reset the game without refreshing the browser page.

var gameStateDiceRoll = 'game state dice roll';
var gameStateChooseDiceOrder = 'game state choose dice order';
var gameStateCompareScores = 'game state compare scores'
var gameState = gameStateDiceRoll;

var currentPlayerRoles = [];

var currentPlayer = 1;
var allPlayersScore = [];

// helper function: dice roll
var rollDice = function () {
  var randomDecimal = Math.random() * 6;
  var randomInteger = Math.floor(randomDecimal) + 1;
  console.log('rollDice output: ' + randomInteger);
  return randomInteger;
}

var rollDiceForPlayer = function () {
  console.log('control flow: start of rollDiceForPlayer()')
  var counter = 0;
  while (counter < 2) {
    currentPlayerRoles.push(rollDice());
    counter += 1;
  }

  console.log('rollDiceForPlayer changes, playerRolls: ' + currentPlayerRoles)
  return 'Welcome, Player ' + currentPlayer + '<br><br>Dice 1: ' + currentPlayerRoles[0] + '<br>Dice 2: ' + currentPlayerRoles[1] + '<br><br>Please input 1 or 2 to choose the corresponding dice to be used as the first digit of your final value.'
}

var getPlayerScore = function (playerInput) {
  var playerScore;

  // input validation
  if (playerInput != 1 && playerInput != 2) {
    console.log('control flow: input validation, invalid input... NOT 1 AND NOT 2')
    myOutputValue = 'Error. Please input only 1 or 2 based on your desired value from your rolls <br><br>Dice 1: ' + currentPlayerRoles[0] + '<br>Dice 2: ' + currentPlayerRoles[1];
  }

  // playerInput = 1
  if (playerInput == 1) {
    console.log('control flow: playerInput == 1')
    playerScore = Number(String(currentPlayerRoles[0]) + String(currentPlayerRoles[1]));
    myOutputValue = 'Player ' + currentPlayer + ' your final value is ' + playerScore;
  }

  // playerInput = 2
  if (playerInput == 2) {
    console.log('control flow: playerInput == 2')
    playerScore = Number(String(currentPlayerRoles[1]) + String(currentPlayerRoles[0]));
    myOutputValue = 'Player ' + currentPlayer + ' your final value is ' + playerScore;
  }

  allPlayersScore.push(playerScore);

  // clear current player rolls array
  currentPlayerRoles = [];
  return myOutputValue
}

var comparePlayersScores = function () {
  console.log('control flow: gameState == gameStateCompareScores');

  compareMessage = "Player 1 score: " + allPlayersScore[0] + '<br>Player 2 score: ' + allPlayersScore[1];

  // player 1 wins
  if (allPlayersScore[0] > allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 1 wins!"
  }

  // player 2 wins
  if (allPlayersScore[0] < allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>Player 2 wins!"
  }

  // tie
  if (allPlayersScore[0] == allPlayersScore[1]) {
    compareMessage = compareMessage + "<br><br>It's a tie!"
  }

  return compareMessage;
}

var main = function (input) {
  console.log('checking game state on submit click: ' + gameState);
  console.log('checking currentPlayer on submit click: ' + currentPlayer);
  var myOutputValue = '';

  if (gameState == gameStateDiceRoll) {
    console.log('control flow: gameState == gameStateDiceRoll');

    // display dice rolled as message
    myOutputValue = rollDiceForPlayer();

    // change the game state
    gameState = gameStateChooseDiceOrder;

    return myOutputValue;
  }

  if (gameState == gameStateChooseDiceOrder) {
    console.log('control flow: gameState == gameStateChooseDiceOrder');

    myOutputValue = getPlayerScore(input);
    if (currentPlayer == 1) {
      console.log('control flow: end of player 1 turn, now starting player 2 turn')
      currentPlayer = 2;
      gameState = gameStateDiceRoll;
      return myOutputValue + "<br><br>It is now player 2's turn!";
    }

    if (currentPlayer == 2) {
      console.log('control flow: end of player 2 turn, next submit click will calculate score')
      gameState = gameStateCompareScores;
      return myOutputValue + "<br><br>Press submit to calculate scores!";
    }
  }

  if (gameState = gameStateCompareScores) {
    console.log('control flow: gameState == gameStateCompareScores')
    myOutputValue = comparePlayersScores();
    return myOutputValue;
  }
};
