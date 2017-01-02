const ballSound = new Audio('assets/audio/ball-hit.wav');

class Ball {
  constructor(ctx, game, x, y) {
    this.x = x;
    this.y = y;
    this.game = game;
    this.ctx = ctx;
    this.xSpeed = -12;
    this.ySpeed = 2;
    this.radius = 12;
  }

  render() {
    this.ctx.beginPath();
    this.ctx.arc(
      this.x, this.y, this.radius, 2 * Math.PI, false
    );
    this.ctx.fillStyle = '#00ffa5';
    this.ctx.fill();
  }

  update(playerPaddle, computerPaddle) {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    let intLine = false;
    const xLeft = this.x - this.radius;
    const xRight = this.x + this.radius;
    const yTop = this.y - this.radius;
    const yBottom = this.y + this.radius;

    if (yTop < 0) {
      this.y = 12;
      this.ySpeed = -this.ySpeed;
    } else if (yBottom > this.game.height) {
      this.y = this.game.height - this.radius;
      this.ySpeed = -this.ySpeed;
    } else if (xRight > this.game.width || xLeft < 0) {
      const oldXSpeed = -this.xSpeed;
      const oldYSpeed = -this.ySpeed;
      this.xSpeed = 0;
      this.ySpeed = 0;
      this.x = this.game.width / 2;
      this.y = this.game.height / 2;
      (xRight > this.game.width) ? (this.game.computerScore += 1) : (this.game.playerScore += 1);
      window.setTimeout(() => {
        this.xSpeed = oldXSpeed;
        this.ySpeed = oldYSpeed / 3;
      }, 500);
    }

    if (
      (xRight > playerPaddle.x &&
      xRight < playerPaddle.x + 12 &&
      yBottom > playerPaddle.y &&
      yTop < (playerPaddle.y + playerPaddle.height)) ||
      (xLeft < (computerPaddle.x + computerPaddle.width) &&
      xLeft > (computerPaddle.x + computerPaddle.width - 12) &&
      yBottom > computerPaddle.y &&
      yTop < (computerPaddle.y + computerPaddle.height))
    ) {
        ballSound.volume = 0.3;
        ballSound.play();
        const maxAngle = 3 * Math.PI / 12;
        const paddle = this.x < this.game.width / 2 ? computerPaddle : playerPaddle;
        const relIntY = (paddle.y + (paddle.height / 2)) - this.y;
        const normalized = (relIntY / (paddle.height / 2));
        const bounceAngle = normalized * maxAngle;
        const direction = this.xSpeed > 0 ? -1 : 1;

        if (relIntY < 5 && relIntY > -5) {
          this.xSpeed = -this.xSpeed;
          this.ySpeed = -this.ySpeed;
        } else {
          this.xSpeed = (direction * 12 * Math.cos(bounceAngle));
          this.ySpeed = 12 *  -Math.sin(bounceAngle);
        }
      }
  }

  reset() {
    this.x = this.game.width / 2;
    this.y = this.game.height / 2;
    this.xSpeed = -12;
    this.ySpeed = 2;
  }
}

module.exports = Ball;
