class Mask {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.speed = 4;
    this.angle = angle;
    this.width = 20;
    this.height = 5;
  }

  runLogic() {
    // completely lost here - needs to be fixed
  this.x += 4;
  }

  draw() {
    context.fillStyle = 'white';
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
