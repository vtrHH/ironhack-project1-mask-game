class Game {
  constructor() {
    this.player = new Player(canvasWidth / 2, canvasHeight / 2 - 25, 50, 50);
    this.unmaskedPersons = [];
    this.masks = [];
    this.lastUnmaskedPersonTimestamp = 0;
    this.score = 100;
    this.setKeyBindings();
    this.active = true;
  }

  reset() {
    this.player = new Player(canvasWidth / 2, canvasHeight / 2 - 25, 50, 50);
    this.unmaskedPersons = [];
    this.masks = [];
    this.lastUnmaskedPersonTimestamp = 0;
    this.score = 100;
    this.setKeyBindings();
    this.active = true;
  }

  setKeyBindings() {
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.player.y -= 20;
          break;
        case 'ArrowDown':
          this.player.y += 20;
          break;
        case 'ArrowLeft':
          this.player.x -= 20;
          break;
        case 'ArrowRight':
          this.player.x += 20;
          break;
      }
      // x is working funny (I think due to rotation)
      this.player.x = Math.max(
        Math.min(this.player.x, canvasElement.width - this.player.width),
        0
      );
      this.player.y = Math.max(
        Math.min(this.player.y, canvasElement.height - this.player.height),
        0
      );
    });
  }

  throwMask() {
    /*let playerX = this.player.x + this.player.width / 2;
      let playerY = this.player.y + this.player.height / 2 - 2.5;*/
    canvasElement.addEventListener('mousedown', (event) => {
      let mouseX = event.offsetX;
      let mouseY = event.offsetY;
      let directionX = mouseX - this.player.x;
      let directionY = mouseY - this.player.y;
      let length = Math.sqrt(directionX * directionX + directionY * directionY);
      directionX /= length;
      directionY /= length;
      const mask = new Mask(this.player.x, this.player.y, this.player.angle);
      this.masks.push(mask);
    });
  }

  addUnmaskedPersons() {
    const currentTimeStamp = Date.now();
    if (currentTimeStamp > this.lastUnmaskedPersonTimestamp + 3000) {
      this.unmaskedPersons.push(
        new UnmaskedPerson(
          canvasWidth,
          Math.random() * (canvasHeight - 50),
          50,
          50
        )
      );
      this.lastUnmaskedPersonTimestamp = currentTimeStamp;
    }
  }

  // not working
  checkIntersectionOfMasksAndUnmaskedPersons() {
    for (let mask of this.masks) {
      for (let unmaskedPerson of this.unmaskedPersons) {
        if (
          mask.x + mask.width === unmaskedPerson.x &&
          mask.y + mask.hight >= unmaskedPerson.y &&
          mask.y + mask.hight <= unmaskedPerson.y
        ) {
          this.score += 10;

          /* 
          this.player.x + this.player.width / 2 >= unmaskedPerson.x &&
         this.player.x <= unmaskedPerson.x + unmaskedPerson.width &&
          this.player.y + this.player.height >= unmaskedPerson.y &&
          this.player.y <= unmaskedPerson.y + unmaskedPerson.height */

          /*  this.unmaskedPerson.context.fillStyle = '#0C690B';
  
          const indexOfMask = this.masks.indexOf(mask);
          const indexOfUnma  skedPersons = this.unmaskedPersons.indexOf(
            unmaskedPerson
          );
          this.masks.splice(indexOfMask, 1);
          this.unmaskedPersons.splice(indexOfUnmaskedPersons, 1);*/
        }
      }
    }
  }

  checkIntersectionOfPlayerAndUnmaskedPersons() {
    for (let unmaskedPerson of this.unmaskedPersons) {
      if (
        this.player.x + this.player.width / 2 >= unmaskedPerson.x &&
        this.player.x <= unmaskedPerson.x + unmaskedPerson.width &&
        this.player.y + this.player.height >= unmaskedPerson.y &&
        this.player.y <= unmaskedPerson.y + unmaskedPerson.height
      ) {
        const indexOfUnmaskedPersons = this.unmaskedPersons.indexOf(
          unmaskedPerson
        );
        this.score -= 20;
        this.unmaskedPersons.splice(indexOfUnmaskedPersons, 1);
      }
    }
  }

  unmaskedPersonLeavingPlayground() {
    for (let unmaskedPerson of this.unmaskedPersons) {
      if (unmaskedPerson.x + unmaskedPerson.width === 0) {
        this.active = false;
      }
    }
  }

  collectGarbage() {
    for (let mask of this.masks) {
      if (mask.x >= canvasWidth) {
        const indexOfMask = this.masks.indexOf(mask);
        this.masks.splice(indexOfMask, 1);
      }
    }
  }

  loop() {
    this.runLogic();
    this.draw();
    if (this.active) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    } else {
      screenPlayElement.style.display = 'none';
      screenGameOverElement.style.display = 'initial';
    }
  }

  runLogic() {
    this.collectGarbage();
    this.addUnmaskedPersons();
    for (let unmaskedPerson of this.unmaskedPersons) {
      unmaskedPerson.runLogic();
    }
    this.throwMask();
    for (let mask of this.masks) {
      mask.runLogic();
    }
    this.checkIntersectionOfMasksAndUnmaskedPersons();
    this.checkIntersectionOfPlayerAndUnmaskedPersons();
    this.unmaskedPersonLeavingPlayground();
    if (this.score <= 0) {
      this.active = false;
    }
  }

  drawScore() {
    context.fillStyle = 'grey';
    context.font = '64px sans-serif';
    context.fillText(this.score, 50, 100);
  }

  draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.player.draw();

    for (let unmaskedPerson of this.unmaskedPersons) {
      unmaskedPerson.draw();
    }
    for (let mask of this.masks) {
      mask.draw();
    }
    this.drawScore();
  }
}
