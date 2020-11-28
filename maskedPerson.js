class MaskedPerson {
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
    context.fillStyle = '#1E701E';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
