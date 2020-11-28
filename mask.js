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


/*   canvasElement.addEventListener('mousemove', (event) => {
      const mouseX = event.offsetX;
      const mouseY = event.offsetY;


const speed = 5;
      const vx = mouseX - playerX;
      const vy = mouseY - playerY;
      const distance = Math.sqrt (vx * vx + vy * vy);
      let distanceX = vx / distance;
      let distanceY = vy / distance;
      distanceX *= speed;
      distanceY *= speed;


*/

