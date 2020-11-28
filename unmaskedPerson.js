class UnmaskedPerson {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  runLogic() {
    this.x -= 1;
  }

  draw() {
    context.fillStyle = '#C70039';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}