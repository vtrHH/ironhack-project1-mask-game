class Mask {
  constructor(x, y, directionX, directionY, angle) {
    this.x = x;
    this.y = y;
    this.speedX = directionX;
    this.speedY = directionY;
    this.angle = angle;
    this.width = 20;
    this.height = 5;
  }

  runLogic() {
    this.x += this.speedX * 10;
    this.y += this.speedY * 10;
  }

  draw() {
    context.fillStyle = 'white';
    context.save();
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate(this.angle);
    context.fillRect(
      -0.5 * this.width,
      -0.5 * this.height,
      this.width,
      this.height
    );
    context.restore();
  }
}
