const maskedPersonImage = new Image();
maskedPersonImage.src = 'images/Male.png';

class MaskedPerson {
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
    context.drawImage(
      maskedPersonImage,
      240,
      120,
      90,
      120,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}
