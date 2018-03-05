'use strict';

const newGameBtn = document.getElementById('js-newGameBtn');
newGameBtn.addEventListener('click', newGame);

const pickRock = document.getElementById('js-playerPick_rock');
const pickPaper = document.getElementById('js-playerPick_paper');
const pickScissors = document.getElementById('js-playerPick_scissors');

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

let gameState = 'notStarted', // started //ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

const newGameElem = document.getElementById('js-newGameElem');
const pickElem = document.getElementById('js-playerPickElem');
const resultsElem = document.getElementById('js-resultsTableElem');

function setGameElements() {
  switch(gameState) {
    case 'started':
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

let playerPointsElem = document.getElementById('js-playerPoints');
let playerNameElem = document.getElementById('js-playerName');
let computerPointsElem = document.getElementById('js-computerPoints');

function newGame() {
  player.name = prompt('Please enter your name', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }

}

function playerPick(playerPick) {
  console.log(playerPick);
}

let x = Math.random();
Math.floor(Math.random() * 3);

function getComputerPick() {
    const possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random() * 3)];
}

let playerPickElem = document.getElementById('js-playerPick');
let computerPickElem = document.getElementById('js-computerPick');
let playerResultElem = document.getElementById('js-playerResult');
let computerResultElem = document.getElementById('js-computerResult');

function playerPick(playerPick) {
    let computerPick = getComputerPick();

    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  let winnerIs = 'player';
    if (playerPick == computerPick) {
        winnerIs = 'noone'; // remis
    } else if (
        (computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {
        winnerIs = 'computer';
    }
    if (winnerIs == 'player') {
        playerResultElem.innerHTML = "Win!";
        player.score++;
    } else if (winnerIs == 'computer') {
        computerResultElem.innerHTML = "Win!";
        computer.score++;
    }
}

function playerPick(playerPick) {
  var computerPick = getComputerPick();

  playerPickElem.innerHTML = playerPick;
  computerPickElem.innerHTML = computerPick;

  checkRoundWinner(playerPick, computerPick);
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}