//////// SOUNDS ////////

const hitSound = new Audio(
  'http://freesoundeffect.net/sites/default/files/human-voiceclip-860-sound-effect-97180176.mp3'
);
const maskFallingDown = new Audio('sounds/MaskFallingDown.wav');
const gameMusic = new Audio('sounds/PlayingMusik.mp3');
const gameOver = new Audio('sounds/GameOver.wav');

//////// GAME AND RESET DEFITIONS ////////

class Game {
  constructor() {
    this.player = new Player(100, 300, 70, 70);
    this.unmaskedPersons = [];
    this.maskedPersons = [];
    this.freshlyMaskedPersons = [];
    this.kids = [];
    this.masks = [];
    this.lastUnmaskedPersonTimestamp = 0;
    this.lastMaskedPersonTimestamp = 0;
    this.lastKidTimestamp = 0;
    this.lastPersonTimestamp = 0;
    this.score = 100;
    this.setKeyBindings();
    this.active = true;
  }

  reset() {
    this.player = new Player(100, 300, 70, 70);
    this.unmaskedPersons = [];
    this.maskedPersons = [];
    this.freshlyMaskedPersons = [];
    this.kids = [];
    this.masks = [];
    this.lastUnmaskedPersonTimestamp = 0;
    this.lastMaskedPersonTimestamp = 0;
    this.lastKidTimestamp = 0;
    this.lastPersonTimestamp = 0;
    this.score = 100;
    this.active = true;
  }

  //////// CONTROL WITH KEYBOARD AND MOUSE ////////

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

      this.player.x = Math.max(
        Math.min(this.player.x, canvasElement.width - this.player.width),
        0
      );
      this.player.y = Math.max(
        Math.min(this.player.y, canvasElement.height - this.player.height),
        200
      );
    });

    canvasElement.addEventListener('mousedown', (event) => {
      let playerX = this.player.x + this.player.width / 2;
      let playerY = this.player.y + this.player.height / 2 - 10;
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
    });
  }

  //////// CREATING PEOPLE IN THE GAME ////////

  addDifferentPeople() {
    let occurance = Math.floor(Math.random() * 4);
    let currentTimeStamp = Date.now();
    if (currentTimeStamp > this.lastPersonTimestamp + 1500) {
      if (occurance == 0) {
        this.unmaskedPersons.push(
          new UnmaskedPerson(
            canvasWidth,
            Math.random() * (330 - 200) + 200,
            70,
            70,
            -2,
            0,
            unmaskedPersonImage
          )
        );
        this.lastPersonTimestamp = currentTimeStamp;
      } else if (occurance == 1) {
        this.maskedPersons.push(
          new MaskedPerson(
            canvasWidth,
            Math.random() * (320 - 200) + 200,
            70,
            70,
            -1,
            0
          )
        );
        this.lastPersonTimestamp = currentTimeStamp;
      } else if (occurance == 2) {
        this.kids.push(
          new Kid(canvasWidth, Math.random() * (360 - 220) + 200, 40, 40, -1, 0)
        );
        this.lastPersonTimestamp = currentTimeStamp;
      }
    }
  }

  //////// CHECKING FOR COLLISION BETWEEN MASK AND DIFFERENT PEOPLE ////////

  // People not wearing masks
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
          if (
            this.unmaskedPersons[indexOfUnmaskedPerson].image ==
            freshlyMaskedPersonImage
          ) {
            maskFallingDown.play();
          } else {
            this.score += 20;
            this.unmaskedPersons[
              indexOfUnmaskedPerson
            ].image = freshlyMaskedPersonImage;
            hitSound.play();
          }
          this.masks.splice(indexOfMask, 1);
        }
      }
    }
  }

  // People wearing masks already

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
          maskFallingDown.play();
        }
      }
    }
  }

  // Kids who do not need to wear masks

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
          maskFallingDown.play();
        }
      }
    }
  }

  //////// CHECKING FOR COLLISION BETWEEN PLAYER AND DIFFERENT PEOPLE ////////

  // unfortunately not working - I fear due to rotation

  // Masked People - score decreases by 10, speed change
  /*
  checkIntersectionOfPlayerAndMaskedPersons() {
    for (let maskedPerson of this.maskedPersons) {
      const indexOfMaskedPerson = this.maskedPersons.indexOf(maskedPerson);
      if (
        this.player.x >= maskedPerson.x - this.player.width &&
        this.player.x <= maskedPerson.x + maskedPerson.width &&
        this.player.y >= maskedPerson.y &&
        this.player.y <= maskedPerson.y + maskedPerson.height
      ) {
        this.score -= 10;
        this.maskedPersons.splice(indexOfMaskedPerson, 1);
      }
    }
  }

  // Unmasked People - score decreases by 20

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
        this.score -= 20;
        this.unmaskedPersons.splice(indexOfUnmaskedPerson, 1);
      }
    }
  }

  // Kids - score decreases by 10

  checkIntersectionOfPlayerAndKids() {
    for (let kid of this.kids) {
      const indexOfKid = this.kids.indexOf(kid);
      if (
        this.player.x > kid.x &&
        this.player.x < kid.x + kid.width &&
        this.player.y > kid.y &&
        this.player.y < kid.y + kid.height
      ) {

        this.score -= 10;
        this.kids.splice(indexOfKid, 1);
      }
    }
  }*/

  //////// CLEANING UP IF ELEMENTS ARE LEAVING CANVAS ////////

  collectGarbage() {
    for (let mask of this.masks) {
      if (
        mask.x >= canvasWidth ||
        mask.x <= 0 ||
        mask.y >= canvasHeight ||
        mask.y <= 0
      ) {
        let indexOfMask = this.masks.indexOf(mask);
        this.masks.splice(indexOfMask, 1);
      }
    }
    /*  for (let unmaskedPerson of this.unmaskedPersons) {
      if (
        unmaskedPerson.x >= canvasWidth ||
        unmaskedPerson.x <= 0 ||
        unmaskedPerson.y >= canvasHeight ||
        unmaskedPerson.y <= 0
      ) {
        let indexOfUnmaskedPerson = this.unmaskedPersons.indexOf(
          unmaskedPerson
        );
        this.unmaskedPersons.splice(indexOfUnmaskedPerson, 1);
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
        this.maskedPersons.splice(indexOfMaskedPerson, 1);
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
    }*/
  }

  //////// SOUNDTRACK DURING GAME ////////

  playGameMusik() {
    if ((this.actice = true)) {
      gameMusic.volume = 0.1;
      gameMusic.play();
    } else {
      gameMusic.pause();
    }
  }

  //////// GAME ENDING LOGICS ////////

  gameEndingLogic() {
    if (this.score <= 0) {
      this.active = false;
      gameMusic.pause();
    }
  }

  unmaskedPersonLeavingPlayground() {
    for (let unmaskedPerson of this.unmaskedPersons) {
      const indexOfUnmaskedPerson2 = this.unmaskedPersons.indexOf(
        unmaskedPerson
      );
      if (
        (this.unmaskedPersons[indexOfUnmaskedPerson2].image ===
          unmaskedPersonImage &&
          unmaskedPerson.x + unmaskedPerson.width === 0) ||
        unmaskedPerson.x >= canvasWidth
      ) {
        this.active = false;
        gameMusic.pause();
      }
    }
  }

  //////// WINNIG - Did not find time to work on it  ////////

  //////// LOOP FOR THE GAME ITSELF ////////

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
      gameOver.play();
    }
  }

  //////// RUNLOGIC FOR GAME ELEMENTS ////////

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
    /* this.checkIntersectionOfPlayerAndMaskedPersons();
    this.checkIntersectionOfPlayerAndUnmaskedPersons();
    this.checkIntersectionOfPlayerAndKids();*/
    this.unmaskedPersonLeavingPlayground();
    this.gameEndingLogic();
  }

  //////// DRAWING A SCORE ////////

  drawScore() {
    context.fillStyle = 'grey';
    context.font = '30px sans-serif';
    context.fillText(this.score, 50, 70);
  }

  //////// DRAWING ALL GAME ELEMENTS ////////

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
