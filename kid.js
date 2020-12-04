class Kid {
  constructor(x, y, width, height, speedX, speedY) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
  }

  runLogic() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    context.fillStyle = '#DEE41F';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
