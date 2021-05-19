'use strict';

let player0 = document.querySelector('.player--0');
let player1 = document.querySelector('.player--1');
let score0 = document.getElementById('score--0');
let score1 = document.getElementById('score--1');
let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let dice = document.querySelector('.dice');
let current, activePlayer, scores;
function init() {
  current = 0;
  activePlayer = 0;
  scores = [0, 0];

  score0.textContent = 0;
  score1.textContent = 0;
  dice.classList.add('hidden');
  document
    .querySelector(`.player--${Number(activePlayer)}`)
    .classList.remove('player--winner');
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
  scores = [0, 0];
  current = 0;
  btnRoll.disabled = false;
  btnHold.disabled = false;
  score0.textContent = 0;
  score1.textContent = 0;
  document.querySelector('#current--0').textContent = 0;
  document.querySelector('#current--1').textContent = 0;
}

init();

function Roll() {
  let randomNumber = Math.trunc(Math.random() * 6) + 1;

  dice.classList.remove('hidden');
  dice.src = `dice-${randomNumber}.png`;
  if (randomNumber == 1) {
    console.log(
      Number(activePlayer) +
        ' ka chance gya, abhi ' +
        Number(!activePlayer) +
        ' will play'
    );
    console.log('latest value is ' + current);

    toggle();
  } else {
    current = current + randomNumber;
    if (Number(activePlayer) === 0) {
      document.querySelector('#current--0').textContent = current;
    } else if (Number(activePlayer) === 1) {
      document.querySelector('#current--1').textContent = current;
    }
  }
}

function Hold() {
  scores[Number(activePlayer)] = scores[Number(activePlayer)] + current;
  document.getElementById(`score--${Number(activePlayer)}`).textContent =
    scores[Number(activePlayer)];
  console.log(scores);
  if (scores[Number(activePlayer)] > 100) {
    dice.classList.add('hidden');
    document
      .querySelector(`.player--${Number(activePlayer)}`)
      .classList.remove('player--active');
    document
      .querySelector(`.player--${Number(activePlayer)}`)
      .classList.add('player--winner');

    btnRoll.disabled = true;
    btnHold.disabled = true;
  } else {
    toggle();
  }
}

function toggle() {
  current = 0;
  document.getElementById(`current--${Number(activePlayer)}`).textContent =
    current;
  activePlayer = !activePlayer;
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
}

btnRoll.addEventListener('click', Roll);

btnHold.addEventListener('click', Hold);

btnRoll.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    Roll();
  }
});

btnRoll.addEventListener('keydown', function (e) {
  if (e.key === 'h') {
    Hold();
  }
});

btnNew.addEventListener('click', init);
