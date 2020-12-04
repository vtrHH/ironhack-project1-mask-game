const unmaskedPersonImage = new Image();
unmaskedPersonImage.src = 'images/Male2.png';

const freshlyMaskedPersonImage = new Image();
freshlyMaskedPersonImage.src = 'images/Male.png';

class UnmaskedPerson {
  constructor(x, y, width, height, speedX, speedY, image) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;
    this.image = image;
  }

  runLogic() {
    this.x += this.speedX;
    this.y += this.speedY;
  }

  draw() {
    context.drawImage(
      this.image,
      0,
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
