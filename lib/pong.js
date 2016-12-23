const Game = require('./game');

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('game-canvas');
  const width = 900;
  const height = 600;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  const game = new Game(ctx, width, height);
  game.startGame();
});
