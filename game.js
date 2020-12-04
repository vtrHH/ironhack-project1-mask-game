class Game {
  constructor() {
    this.player = new Player(canvasWidth / 2, canvasHeight / 2 - 25, 50, 50);
    this.unmaskedPersons = [];
    this.maskedPersons = [];
    this.kids = [];
    this.masks = [];
    this.lastUnmaskedPersonTimestamp = 0;
    this.lastMaskedPersonTimestamp = 0;
    this.lastKidTimestamp = 0;
    this.score = 10000;
    this.setKeyBindings();
    this.active = true;
  }

  reset() {
    this.player = new Player(canvasWidth / 2, canvasHeight / 2 - 25, 50, 50);
    this.unmaskedPersons = [];
    this.maskedPersons = [];
    this.kids = [];
    this.masks = [];
    this.lastUnmaskedPersonTimestamp = 0;
    this.lastMaskedPersonTimestamp = 0;
    this.lastKidTimestamp = 0;
    this.score = 10000;
    this.setKeyBindings();
    this.active = true;
  }

  setKeyBindings() {
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.player.y -= 10;
          break;
        case 'ArrowDown':
          this.player.y += 10;
          break;
        case 'ArrowLeft':
          this.player.x -= 10;
          break;
        case 'ArrowRight':
          this.player.x += 10;
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
    canvasElement.addEventListener('mousedown', (event) => {
      let playerX = this.player.x + this.player.width / 2;
      let playerY = this.player.y + this.player.height / 2 - 2.5;
      let vectorX = event.offsetX - playerX;
      let vectorY = event.offsetY - playerY;
      let length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
      let directionX = vectorX / length;
      let directionY = vectorY / length;
      let mask = new Mask(
        playerX,
        playerY,
        directionX,
        directionY,
        this.player.angle
      );
      this.masks.push(mask);
      console.log(mask);
    });
  }

  addDifferentPeople() {
    let currentTimeStamp = Date.now();
    if (currentTimeStamp > this.lastUnmaskedPersonTimestamp + 2500) {
      this.unmaskedPersons.push(
        new UnmaskedPerson(
          canvasWidth,
          Math.random() * (canvasHeight - 50),
          50,
          50,
          -1,
          0,
          'red'
        )
      );
      this.lastUnmaskedPersonTimestamp = currentTimeStamp;
    }
    if (currentTimeStamp > this.lastMaskedPersonTimestamp + 3500) {
      this.maskedPersons.push(
        new MaskedPerson(
          canvasWidth,
          Math.random() * (canvasHeight - 50),
          50,
          50,
          -1,
          0,
          'green'
        )
      );
      this.lastMaskedPersonTimestamp = currentTimeStamp;
    }
    if (currentTimeStamp > this.lastKidTimestamp + 1500) {
      this.kids.push(
        new Kid(
          canvasWidth,
          Math.random() * (canvasHeight - 20),
          20,
          20,
          -1,
          0,
          '#DEE41F'
        )
      );
      this.lastKidTimestamp = currentTimeStamp;
    }
  }

  throwMask() {
    canvasElement.addEventListener('mousedown', (event) => {
      let playerX = this.player.x + this.player.width / 2;
      let playerY = this.player.y + this.player.height / 2 - 2.5;
      let vectorX = event.offsetX - playerX;
      let vectorY = event.offsetY - playerY;
      let length = Math.sqrt(vectorX * vectorX + vectorY * vectorY);
      let directionX = vectorX / length;
      let directionY = vectorY / length;
      const mask = new Mask(
        playerX,
        playerY,
        directionX,
        directionY,
        this.player.angle
      );
      this.masks.push(mask);
    });
  }

  checkIntersectionOfMaskAndUnmaskedPersons() {
    for (let mask of this.masks) {
      for (let unmaskedPerson of this.unmaskedPersons) {
        if (
          mask.x >= unmaskedPerson.x - mask.width &&
          mask.x <= unmaskedPerson.x + unmaskedPerson.width &&
          mask.y >= unmaskedPerson.y &&
          mask.y <= unmaskedPerson.y + unmaskedPerson.height
        ) {
          const indexOfUnmaskedPerson = this.unmaskedPersons.indexOf(
            unmaskedPerson
          );
          const indexOfMask = this.masks.indexOf(mask);
          this.score += 20;
          this.unmaskedPersons[indexOfUnmaskedPerson].color = 'blue';
          this.masks.splice(indexOfMask, 1);
        }
      }
    }
  }

  checkIntersectionOfMaskAndMaskedPersons() {
    for (let mask of this.masks) {
      for (let maskedPerson of this.maskedPersons) {
        if (
          mask.x >= maskedPerson.x - mask.width &&
          mask.x <= maskedPerson.x + maskedPerson.width &&
          mask.y >= maskedPerson.y &&
          mask.y <= maskedPerson.y + maskedPerson.height
        ) {
          const indexOfMask = this.masks.indexOf(mask);
          this.masks.splice(indexOfMask, 1);
        }
      }
    }
  }

  checkIntersectionOfMaskAndKids() {
    for (let mask of this.masks) {
      for (let kid of this.kids) {
        if (
          mask.x >= kid.x - kid.width &&
          mask.x <= kid.x + kid.width &&
          mask.y >= kid.y &&
          mask.y <= kid.y + kid.height
        ) {
          const indexOfMask = this.masks.indexOf(mask);
          this.masks.splice(indexOfMask, 1);
        }
      }
    }
  }

  checkIntersectionOfPlayerAndMaskedPersons() {
    for (let maskedPerson of this.maskedPersons) {
      const indexOfMaskedPerson = this.maskedPersons.indexOf(maskedPerson);
      if (
        this.player.x >= maskedPerson.x - this.player.width &&
        this.player.x <= maskedPerson.x + maskedPerson.width &&
        this.player.y >= maskedPerson.y &&
        this.player.y <= maskedPerson.y + maskedPerson.height
      ) {
        // this.score -= 10;
        this.maskedPersons.splice(indexOfMaskedPerson, 1);
      }
    }
  }

  checkIntersectionOfPlayerAndUnmaskedPersons() {
    for (let unmaskedPerson of this.unmaskedPersons) {
      const indexOfUnmaskedPerson = this.unmaskedPersons.indexOf(
        unmaskedPerson
      );
      if (
        this.player.x >= unmaskedPerson.x - this.player.width &&
        this.player.x <= unmaskedPerson.x + unmaskedPerson.width &&
        this.player.y >= unmaskedPerson.y &&
        this.player.y <= unmaskedPerson.y + unmaskedPerson.height
      ) {
        // this.score -= 10;
        this.unmaskedPersons.splice(indexOfUnmaskedPerson, 1);
      }
    }
  }

  checkIntersectionOfPlayerAndKids() {
    for (let kid of this.kids) {
      const indexOfKid = this.kids.indexOf(kid);
      if (
        this.player.x >= kid.x - this.player.width &&
        this.player.x <= kid.x + kid.width &&
        this.player.y >= kid.y &&
        this.player.y <= kid.y + kid.height
      ) {
        this.score -= 10;
        this.kids.splice(indexOfKid, 1);
      }
    }
  }

  collectGarbage() {
    for (let mask of this.masks) {
      if (
        mask.x >= canvasWidth ||
        mask.x <= 0 ||
        mask.y >= canvasHeight ||
        mask.y <= 0
      ) {
        let indexOfMask = this.masks.indexOf(mask);
        //console.log(indexOfMask);
        this.masks.splice(indexOfMask, 1);
      }
    }
    for (let unmaskedPerson of this.unmaskedPersons) {
      if (
        unmaskedPerson.x >= canvasWidth ||
        unmaskedPerson.x <= 0 ||
        unmaskedPerson.y >= canvasHeight ||
        unmaskedPerson.y <= 0
      ) {
        let indexOfUnmaskedPerson = this.unmaskedPersons.indexOf(
          unmaskedPerson
        );
        this.masks.splice(indexOfUnmaskedPerson, 1);
      }
    }
    for (let maskedPerson of this.maskedPersons) {
      if (
        maskedPerson.x >= canvasWidth ||
        maskedPerson.x <= 0 ||
        maskedPerson.y >= canvasHeight ||
        maskedPerson.y <= 0
      ) {
        let indexOfMaskedPerson = this.maskedPersons.indexOf(maskedPerson);
        this.masks.splice(indexOfMaskedPerson, 1);
      }
    }
    for (let kid of this.kids) {
      if (
        kid.x >= canvasWidth ||
        kid.x <= 0 ||
        kid.y >= canvasHeight ||
        kid.y <= 0
      ) {
        let indexOfKid = this.kids.indexOf(kid);
        this.kids.splice(indexOfKid, 1);
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
    this.addDifferentPeople();
    for (let unmaskedPerson of this.unmaskedPersons) {
      unmaskedPerson.runLogic();
    }
    for (let maskedPerson of this.maskedPersons) {
      maskedPerson.runLogic();
    }
    for (let kid of this.kids) {
      kid.runLogic();
    }
    for (let mask of this.masks) {
      mask.runLogic();
    }

    this.checkIntersectionOfMaskAndUnmaskedPersons();
    this.checkIntersectionOfMaskAndMaskedPersons();
    this.checkIntersectionOfMaskAndKids();
    this.checkIntersectionOfPlayerAndMaskedPersons();
    this.checkIntersectionOfPlayerAndUnmaskedPersons();
    this.checkIntersectionOfPlayerAndKids();
    // if (this.score <= 0) {
    // this.active = false;
    // }
  }

  drawScore() {
    context.fillStyle = 'grey';
    context.font = '64px sans-serif';
    context.fillText(this.score, 50, 100);
  }

  draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.player.draw();
    for (let maskedPerson of this.maskedPersons) {
      maskedPerson.draw();
    }
    for (let unmaskedPerson of this.unmaskedPersons) {
      unmaskedPerson.draw();
    }
    for (let kid of this.kids) {
      kid.draw();
    }
    for (let mask of this.masks) {
      mask.draw();
    }
    this.drawScore();
  }
}
