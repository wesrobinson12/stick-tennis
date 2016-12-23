class Paddle {
  constructor(ctx, x, y, width, height) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  render() {
    this.ctx.fillStyle = '#7f7f7f';
    this.ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  move(y) {
    this.y += y;

    if (this.y + this.height > 600) {
      this.y = 600 - this.height;
    } else if (this.y < 0) {
      this.y = 0;
    }
  }

  reset() {
    this.y = 300 - (this.height / 2);
    this.x = this.x;
  }
}

module.exports = Paddle;
