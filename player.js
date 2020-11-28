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
      context.fillStyle = 'black';
      context.save();
      context.translate(this.x, this.y + this.height / 2);
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
  