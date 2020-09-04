class MovingBackground {
  constructor() {
    this.background = new Image();
    this.background.src = "https://github.com/mathcodes/Catwalk2DPlatform/blob/master/src/images/game_background_2.png";
    this.background.width = 1920;
    this.background.height = 1080;
    this.vel = 100;
    this.dist = 0;
    this.elapsedTime = Date.now();
  }

  offset() {
    const delta = Date.now() - this.elapsedTime;
    this.elapsedTime = Date.now();
    return this.vel * delta / (1000 * 5);
  }

  draw(ctx) {
    this.dist += this.offset();
    if (this.dist > this.background.width) this.dist = 0;
    ctx.save();
    ctx.translate(this.dist, 0);
    ctx.drawImage(this.background, 0, 0, this.background.width, this.background.height);
    ctx.drawImage(this.background, -this.background.width, 0, this.background.width, this.background.height);
    ctx.restore();
  }
}

export default MovingBackground;