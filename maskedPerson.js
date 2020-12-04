class MaskedPerson {
  constructor(x, y, width, height, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;
  }

  runLogic() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}