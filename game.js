class Game {
  constructor() {
    this.player = new Player(canvasWidth / 2, canvasHeight / 2 - 25, 50, 50);
    this.unmaskedPersons = [];
    this.masks = [];
    this.lastUnmaskedPersonTimestamp = 0;
    this.setKeyBindings();
    this.addUnmaskedPersons();
    this.throwMask();
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
        case 'Space':
          this.throwMask();
          break;
      }
    });
  }

  throwMask() {
    /*let playerX = this.player.x + this.player.width / 2;
      let playerY = this.player.y + this.player.height / 2 - 2.5;*/
      canvasElement.addEventListener('mousedown', (event) => {
        let mouseX = event.offsetX;
        let mouseY = event.offsetY;
        let vectorX = mouseX - this.player.x;
        let vectorY = mouseY - this.player.y;
        let distance = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
        mouseX = mouseX / distance;
        mouseY = mouseY / distance;
        const mask = new Mask(this.player.x, this.player.y, this.player.angle);
        this.masks.push(mask);
      });
    const mask = new Mask(this.player.x, this.player.y, this.player.angle);
    this.masks.push(mask);
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

  checkIntersectionOfMasksAndUnmaskedPersons() {
    for (let mask of this.masks) {
      for (let unmaskedPerson of this.unmaskedPersons) {
        if (
          mask.x >= unmaskedPerson.x - mask.height &&
          mask.y > unmaskedPerson.y &&
          mask.y <= unmaskedPerson.y + unmaskedPerson.height
        ) {
          const indexOfMask = this.masks.indexOf(mask);
          const indexOfUnmaskedPersons = this.unmaskedPersons.indexOf(
            unmaskedPerson
          );
          this.masks.splice(indexOfMask, 1);
          this.unmaskedPersons.splice(indexOfUnmaskedPersons, 1);
        }
      }
    }
  }

  checkIntersectionOfPlayerAndUnmaskedPersons() {
    for (let unmaskedPerson of this.unmaskedPersons) {
      if (
        (this.player.x + this.player.width >= unmaskedPerson.x &&
          this.player.x <= unmaskedPerson.x + unmaskedPerson.width &&
          this.player.y + this.player.height >= unmaskedPerson.y &&
          this.player.y <= unmaskedPerson.y + unmaskedPerson.height) ||
        unmaskedPerson.x + unmaskedPerson.width < 0
      ) {
        const indexOfUnmaskedPersons = this.unmaskedPersons.indexOf(
          unmaskedPerson
        );
        this.unmaskedPersons.splice(indexOfUnmaskedPersons, 1);
      }
    }
  }

  loop() {
    this.runLogic();
    this.draw();
    window.requestAnimationFrame(() => {
      this.loop();
    });
  }

  runLogic() {
    this.addUnmaskedPersons();
    for (let unmaskedPerson of this.unmaskedPersons) {
      unmaskedPerson.runLogic();
    }
    for (let mask of this.masks) {
      mask.runLogic();
    }
    this.checkIntersectionOfMasksAndUnmaskedPersons();
    this.checkIntersectionOfPlayerAndUnmaskedPersons()
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
  }
}
