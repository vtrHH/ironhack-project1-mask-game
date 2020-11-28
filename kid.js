class Kid {
    constructor(x, y, width, height) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
  
    runLogic() {
      this.x += 1
      this.y += 1;
    }
  
    draw() {
      context.fillStyle = '#DEE41F';
      context.fillRect(this.x, this.y, this.width, this.height);
    }
  }