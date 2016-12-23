const Ball = require('./ball');
const Paddle = require('./paddle');
const Player = require('./player');
const Computer = require('./computer');

const animate = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  function(callback) { window.setTimeout(callback, 1000/60); };

class Game {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.ball = new Ball(ctx, this, this.width / 2, this.height / 2);
    this.player = new Player(ctx, this.width - 31, (this.height / 2) - 60);
    this.computer = new Computer(ctx, 11, (this.height / 2) - 60);
    this.playerScore = 0;
    this.computerScore = 0;
  }

  startGame() {
    $('.title').html('');
    $('.new-game-title').html('Welcome to Stick Tennis');
    $('.new-game-instructions')
      .html('Use the up and down arrow keys to control your stick (right side)');
    $('.continue').html("(Click here to continue)");

    $('.new-game-box').on('click', this.start.bind(this));
  }

  endGame() {
    let message;

    if (this.playerScore === 11) {
      message = "You won!";
    } else {
      message = "You lost.";
      $('.end-game').css('color', 'red');
    }
    $('.end-game').html(`Game Over. ${message}`);
    $('.retry').html('Play again?');
    $('.retry').css('border', '1px solid #fff');
    $('.retry').css('cursor', 'pointer');

    $('.retry').on('click', this.reset.bind(this));
  }

  start() {
    $('.new-game-title').html("");
    $('.new-game-instructions').html("");
    $('.continue').html("");
    $('.new-game-box').css('border', 'none');
    $('.new-game-box').off('click');
    $('.new-game-box').css('cursor', 'auto');
    $('.title').html('Stick Tennis');
    $('#game-canvas').css('border', '1px solid #fff');
    this.animateId = animate(this.step.bind(this));
  }

  step() {
    this.update();
    this.render();
    if (this.playerScore === 11 || this.computerScore === 11) {
      this.endGame();
    } else {
      animate(this.step.bind(this));
    }
  }

  update() {
    this.ball.update(this.player.paddle, this.computer.paddle);
    this.computer.update(this.ball);
    this.player.update();
  }

  centerLine() {
    this.ctx.beginPath();
      this.ctx.setLineDash([5, 15]);
      this.ctx.moveTo(this.width / 2, 0);
      this.ctx.lineTo(this.width / 2, this.height);
    this.ctx.closePath();
    this.ctx.strokeStyle = '#fff';
    this.ctx.stroke();
  }

  score() {
    this.ctx.font = 'bold 50px Orbitron';
    this.ctx.fillStyle = '#7f7f7f';
    this.ctx.fillText(this.playerScore, this.width/2 + 30, 70);
    this.ctx.fillText(this.computerScore, this.width/2 - 30 - 40, 70);
  }

  render() {
    this.ctx.fillStyle = "#093c1c";
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.centerLine();
    this.score();
    this.ball.render();
    this.player.render();
    this.computer.render();
  }

  reset() {
    $('.end-game').html('');
    $('.retry').html('');
    $('.retry').css('border', 'none');
    $('.retry').css('cursor', 'auto');
    $('.retry').off('click');

    this.ball.reset();
    this.player.reset();
    this.computer.reset();
    this.playerScore = 0;
    this.computerScore = 0;
    window.cancelAnimationFrame(this.animateId);
    this.start();
  }

}

module.exports = Game;
