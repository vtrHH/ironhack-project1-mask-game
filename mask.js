class Mask {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 5;
  }

  runLogic() {
    this.x += 4;
  }

  draw() {
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
