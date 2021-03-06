const canvasElement = document.querySelector('canvas');

const canvasWidth = canvasElement.width;
const canvasHeight = canvasElement.height;

const context = canvasElement.getContext('2d');

const game = new Game();

const triggerPlayElement = document.getElementById('trigger-play');
const triggerPlayAgainElement = document.getElementById('trigger-play-again');

const screenStartElement = document.getElementById('screen-start');
const screenGameOverElement = document.getElementById('screen-game-over');
const screenPlayElement = document.getElementById('screen-play');
const screenScoreElement = document.getElementById('screen-score');

// START THE GAME

triggerPlayElement.addEventListener('click', () => {
  screenStartElement.style.display = 'none';
  screenPlayElement.style.display = 'initial';
  game.playGameMusik()
  game.loop();
});

// START AGAIN

triggerPlayAgainElement.addEventListener('click', () => {
  screenGameOverElement.style.display = 'none';
  screenPlayElement.style.display = 'initial';

  game.reset();
  game.playGameMusik()
  game.loop();
});

// MANAGED TO SURVIVE AND START AGAIN

/*triggerPlayAgainElement.addEventListener('click', () => {
  screenScoreElement.style.display = 'none';
  screenPlayElement.style.display = 'initial';

  game.reset();
  game.loop();
});*/
