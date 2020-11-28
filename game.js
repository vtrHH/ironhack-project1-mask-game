class Game {
  constructor() {
    this.player = new Player(canvasWidth / 2, canvasHeight / 2 - 25, 50, 50);
    this.unmaskedPersons = [];
    this.masks = [];
    this.lastUnmaskedPersonTimestamp = 0;
    this.setKeyBindings();
    this.addUnmaskedPersons();
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
          console.log(event);
          break;
      }
    });
  }

  throwMask() {
    const x = this.player.x + this.player.width / 2;
    const y = this.player.y + this.player.height / 2 - 2.5;
    const mask = new Mask(x, y);
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

  // not working yet !!!
  /*checkIntersectionOfPlayerAndUnmaskedPersons() {
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
  }*/

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
    this.checkIntersectionOfMasksAndUnmaskedPersons();
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
