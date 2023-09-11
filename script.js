'use strict';

const againBtn = document.querySelector('.again');
const number = document.querySelector('.number');
const guess = document.querySelector('.guess');
const check = document.querySelector('.check');
const message = document.querySelector('.message');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highscore');
const body = document.body;

let guessNum,
  scoreNumber,
  highScoreNumber = 0;

const setMessage = text => {
  message.textContent = text;
};

const setBodyBackgroundColor = color => {
  body.style.backgroundColor = color;
};

const setNumberText = text => {
  number.textContent = text;
};
const getRandomNumber = () => Math.trunc(Math.random() * 20) + 1;

const resetGame = () => {
  scoreNumber = 20;
  score.textContent = scoreNumber;
  guessNum = getRandomNumber();
  setMessage('Start guessing...');
  setBodyBackgroundColor('#222');
  setNumberText('?');
  guess.removeAttribute('disabled');
};

const handleCorrectGuess = () => {
  setMessage('🎉 Correct Number!');
  setBodyBackgroundColor('#60b347');
  setNumberText(guessNum);
  guess.value = '';
  guess.setAttribute('disabled', true);
  check.setAttribute('disabled', true);
  if (scoreNumber > highScoreNumber) {
    highScoreNumber = scoreNumber;
    highScore.textContent = highScoreNumber;
  }
};

const handleGuess = guessType => {
  if (scoreNumber > 0) {
    scoreNumber--;
    setMessage(guessType === 'high' ? '📈 Too high!' : '📉 Too low!');
    score.textContent = scoreNumber;
  } else {
    setMessage('You lost 💔. Start again!');
    guess.setAttribute('disabled', true);
  }
};

const handleCheck = () => {
  const userNumber = Number(guess.value);

  if (!userNumber) {
    setMessage('⛔️ Please enter a valid number!');
  } else if (userNumber === guessNum) {
    handleCorrectGuess();
  } else if (userNumber > guessNum) {
    handleGuess('high');
  } else if (userNumber < guessNum) {
    handleGuess('low');
  }
};

againBtn.addEventListener('click', resetGame);
check.addEventListener('click', handleCheck);

resetGame();
