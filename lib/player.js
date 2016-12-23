const Paddle = require('./paddle');

class Player {
  constructor(ctx, x, y) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.paddle = new Paddle(ctx, x, y, 20, 120);
  }

  render() {
    this.paddle.render();
  }

  update() {
    key.getPressedKeyCodes().forEach((code) => {
      if (code === 40) {
        this.paddle.move(5);
      } else if (code === 38) {
        this.paddle.move(-5);
      }
    });
  }

  reset() {
    this.paddle.reset();
  }
}

module.exports = Player;
