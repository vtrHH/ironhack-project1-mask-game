class Mask {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 5;
  }

  runLogic() {
    this.x += 2;
  }

  draw() {
    context.fillStyle = 'white';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}


/* context.clearRect(0, 0, canvasWidth, canvasHeight);
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
  */