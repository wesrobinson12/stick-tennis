const Paddle = require('./paddle');
const Ball = require('./ball');

class Computer {
  constructor(ctx, x, y, ball) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.paddle = new Paddle(ctx, x, y, 20, 120);
  }

  render() {
    this.paddle.render();
  }

  update(ball) {
    const diff = (ball.y - (this.paddle.y + (this.paddle.height / 2)));

    if (diff > 5) {
      this.paddle.move(5);
    } else if (diff < -5) {
      this.paddle.move(-5);
    } else if ((ball.ySpeed < 5 && ball.ySpeed > -5) && (diff < 5 || diff > -5)) {
      this.paddle.move(ball.ySpeed);
    }
  }

  reset() {
    this.paddle.reset();
  }
}

module.exports = Computer;
