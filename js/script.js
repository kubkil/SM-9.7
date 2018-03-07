'use strict';

const newGameBtn = document.getElementById('js-newGameBtn');

newGameBtn.addEventListener('click', newGame);

const pickRock = document.getElementById('js-playerPick_rock');
const pickPaper = document.getElementById('js-playerPick_paper');
const pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function playerRock() { 
  playerPick('rock');
});
pickPaper.addEventListener('click', function playerPaper() { 
  playerPick('paper');
});
pickScissors.addEventListener('click', function playerScissors() { 
  playerPick('scissors');
});

const newGameElem = document.getElementById('js-newGameElem');
const pickElem = document.getElementById('js-playerPickElem');
const resultsElem = document.getElementById('js-resultsTableElem');
let gameState = 'notStarted'; // started //ended

// SET DISPLAY OF NEW GAME BTN; ROCK PAPER SCISSORS BTNS; RESULT TABLE
function setGameElements() {
  switch(gameState) {
    case 'started':
      playerResultElem.innerHTML = computerResultElem.innerHTML = ''; // reset playerResult and computerResult after 'play again'
      newGameElem.style.display = 'none';
      pickElem.style.display = 'block';
      resultsElem.style.display = 'block';
    break;
    case 'ended':
      newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
      newGameElem.style.display = 'block';
      pickElem.style.display = 'none';
      resultsElem.style.display = 'none';
  }
}

const playerPointsElem = document.getElementById('js-playerPoints');
const computerPointsElem = document.getElementById('js-computerPoints');

// PASS SCORE TO HTML
function setGamePoints() {
  playerPointsElem.innerHTML = player.score;
  computerPointsElem.innerHTML = computer.score;
}

const player = {
  name: '',
  score: 0
};
const computer = {
  score: 0
};

const playerNameElem = document.getElementById('js-playerName');

// START GAME
function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    playerNameElem.innerHTML = player.name;
    setGameElements();
    setGamePoints();
  }
}

// CALCULATE PICK
function getComputerPick() {
  const possiblePicks = ['rock', 'paper', 'scissors'];
  return possiblePicks[Math.floor(Math.random() * 3)];
}

const playerPickElem = document.getElementById('js-playerPick');
const computerPickElem = document.getElementById('js-computerPick');
const playerResultElem = document.getElementById('js-playerResult');
const computerResultElem = document.getElementById('js-computerResult');

// PASS PICK TO HTML
function playerPick(playerPick) {
  const computerPick = getComputerPick();

  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;

  checkRoundWinner(playerPick, computerPick);
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  let winnerIs = 'player';

  if (playerPick === computerPick) {
      winnerIs = 'none'; // remis
      playerResultElem.innerHTML = computerResultElem.innerHTML = "Draw!";
  } else if (
      (computerPick === 'rock' &&  playerPick === 'scissors') ||
      (computerPick === 'scissors' &&  playerPick === 'paper') ||
      (computerPick === 'paper' &&  playerPick === 'rock')) {
      winnerIs = 'computer';
  }
  if (winnerIs === 'player') {
      playerResultElem.innerHTML = "Win!";
      player.score++;
  } else if (winnerIs === 'computer') {
      computerResultElem.innerHTML = "Win!";
      computer.score++;
  }
  setGamePoints();
  if (player.score === 10 || computer.score === 10) {
    disableSelectionButtons();
    setTimeout(endGame, 2000); // delay endGame function so final score is visible
  }
}

function disableSelectionButtons() {
  pickRock.removeEventListener('click', playerRock);
  pickPaper.removeEventListener('click', playerPaper);
  pickScissors.removeEventListener('click', playerScissors);
}

function endGame () {
  if (player.score === 10 || computer.score === 10) {
    gameState = 'ended';
    setGameElements();
    if (player.score === 10) {
      alert('wygrałeś');
    } else {
      alert('przegrałeś');
    }
  }
}

setGameElements(); // wywołanie funkcji z automatu