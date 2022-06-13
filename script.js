// ===== REQUIREMENTS ===== //
// 1) there are 2 players who take turns
// 2) when a player clicks submit, the game rolls 2 dice and shows the dice rolls eg. 3 and 6
// 3) the player picks the orsder of the dice they want eg. if they want 63, they will specify that the 2nd dice goes first
// 4) after both players have rolled and chosen dice order, the player with the higher combined number wins

// ===== breakdown and planning ===== //
// v1. Rolls 2 dice and turns the output for 1 player. That player chooses the dice order and gets the correct return output.
// v2. Refactored code to include player 2
// v3. Implement comparing dice scores and declare winner
// v4. Reset the game without refreshing the browser page.

var gameStateDiceRoll = 'game state dice roll';
var gameStateChooseDiceOrder = 'game state choose dice order';
var gameState = gameStateDiceRoll;

var playerRolls = [];

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
    playerRolls.push(rollDice());
    counter += 1;
  }

  console.log('rollDiceForPlayer changes, playerRolls: ', playerRolls)
  return 'Dice 1: ' + playerRolls[0], '<br>Dice 2: ' + playerRolls[1], '<br> Please input 1 or 2 to choose the corresponding dice to be used as the first digit of your final value.'
}

var getPlayerScore = function (playerInput) {
  // playerInput validation
  if (playerInput != 1 && playerInput != 2) {
    console.log('control flow: input validation, invalid input... NOT 1 AND NOT 2')
    myOutputValue = 'Error. Please input only 1 or 2 based on your desired value from your rolls <br>Dice 1: ' + playerRolls[0] + '<br>Dice 2: ' + playerRolls[1];
  }

  // playerInput = 1
  if (playerInput == 1) {
    console.log('control flow: playerInput == 1')
    var playerScore = Number(String(playerRolls[0]) + String(playerRolls[1]));
    myOutputValue = 'Your final value is ' + playerScore
  }

  // playerInput = 2
  if (playerInput == 2) {
    console.log('control flow: playerInput == 2')
    var playerScore = Number(String(playerRolls[1]) + String(playerRolls[0]));
    myOutputValue = 'Your final value is ' + playerScore
  }

  return myOutputValue
}

var main = function (input) {
  console.log('checking game state on submit click: ', gameState)
  var myOutputValue = '';

  if (gameState == gameStateDiceRoll) {
    console.log('control flow: gameState == gameStateDiceRoll');

    // display dice rolled as message
    myOutputValue = rollDiceForPlayer();

    // change the game state
    gameState = gameStateChooseDiceOrder;
  }

  if (gameState == gameStateChooseDiceOrder) {
    console.log('control flow: gameState == gameStateChooseDiceOrder');

    myOutputValue = getPlayerScore(input);
    
  }
  return myOutputValue;
};
