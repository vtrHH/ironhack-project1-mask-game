const playerImage = new Image();
playerImage.src = 'images/Player.png';

class Player {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.angle = 0;
    this.setMouseMovement();
  }

  setMouseMovement() {
    canvasElement.addEventListener('mousemove', (event) => {
      const x = event.offsetX;
      const y = event.offsetY;
      this.angle = Math.atan2(y - this.y + this.height / 2, x - this.x);
    });
  }

  draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    context.save();
    context.translate(this.x + this.width / 2, this.y + this.height / 2);
    context.rotate(this.angle);
    context.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    context.drawImage(
            playerImage,
            0,
            240,
            90,
            120,
            this.x,
            this.y,
            this.width,
            this.height
          );
          context.restore();
          console.log(this.angle);
  } 
}

