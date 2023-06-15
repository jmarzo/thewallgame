class Ball {
  constructor(speed) {
    this.element = document.getElementById("ball"); // getting the div ball
    this.x = this.element.getBoundingClientRect().left;
    this.y = this.element.getBoundingClientRect().top;
    this.direction = { dx: 0, dy: 1 }; // default to get into the while
    this.speed = speed;
    this.racket = new Racket();
    this.wallElement = document.getElementById("wall");
    this.wallHitsCounter = 0;
    // sound
    this.racketHit = new Audio("./sounds/mixkit-metal-bowl-hit-1842.wav");
    this.sadTrombone = new Audio("../sounds/Sad-trombone.mp3");
    this.wallHit = new Audio("./sounds/mixkit-metallic-sword-strike-2160.wav");
    this.bullet = new Audio("./sounds/bullet.mp3");
    this.bullet2 = new Audio("./sounds/bullet2.mp3");
    this.bravo = new Audio("./sounds/bravo.mp3");
    this.wallDown = new Audio("./sounds/walldown.mp3");
    this.youLose = new Audio("./sounds/you-lose.mp3");
    this.missionCompleted = false;
    this.youHaveLost = false;
    //this.sky = new Audio("../sounds/sky.mp3");

    this.reset(); // execute the reset method to restart from the default setting
  }
  //
  reset() {
    //nitial setting -----> ball default position
    this.element.style.left = "10vw";
    this.element.style.top = "50vh";

    //direction
    while (
      Math.abs(this.direction.dx <= 0.4) ||
      Math.abs(this.direction.dx >= 0.8)
    ) {
      const angle = getRandom(0, 2 * Math.PI); // random between 0° and 360°

      //console.log(angle);

      this.direction.dx = Math.cos(angle);
      this.direction.dy = Math.sin(angle);
    }
    //console.log(this.direction);
  }

  // collision handlers ------------------------------------------------------

  /*ballHitsTheTop() {
    const ballBound = this.element.getBoundingClientRect(); // collision handler
    const wallHead = this.wallHead.getBoundingClientRect();
    console.log(wallHead.left);
    return (
      ballBound.right >= window.innerWidth - wallHead.width &&
      ballBound.bottom <= wallHead.bottom + ballBound.height
    );
  }*/

  ballHitsTheWall() {
    const ballBound = this.element.getBoundingClientRect(); // collision handler
    const wallBound = this.wallElement.getBoundingClientRect();

    return ballBound.right >= window.innerWidth - wallBound.width;
  }

  racketMiss() {
    const ballBound = this.element.getBoundingClientRect(); // collision handler
    return ballBound.left <= 0;
  }

  ballHitsTheSky() {
    const ballBound = this.element.getBoundingClientRect(); // collision handler
    return ballBound.top <= 0;
  }

  ballHitsTheRacket() {
    const ballBound = this.element.getBoundingClientRect(); // collision handler
    const racketBound = this.racket.element.getBoundingClientRect();

    return (
      ballBound.left <= racketBound.right &&
      ballBound.top >= racketBound.top - ballBound.height &&
      ballBound.bottom <= racketBound.bottom + ballBound.height
    );
  }

  ballHitsTheGround() {
    const ballBound = this.element.getBoundingClientRect(); // collision handler
    return ballBound.bottom >= window.innerHeight;
  }

  setWallOriginalColor() {
    this.wallElement = document.getElementById("wall");
    this.wallElement.style.backgroundColor = "gray"; // the wall turns to the original color
  }

  wallHitAnimation() {
    this.wallElement.style.backgroundColor = "red"; // the wall turns red for few ms
    const myTimeout = setTimeout(this.setWallOriginalColor(), 60);
  }

  update(timeSlice) {
    const ballBound = this.element.getBoundingClientRect(); // collision handler
    const racketBound = this.racket.element.getBoundingClientRect();

    /*if (this.ballHitsTheTop) {
      console.log("hits the top");
      this.direction.dx = Math.cos(0.5);
      this.direction.dy = Math.sin(0.5);

      this.direction.dx *= -1; // invert x vector
      this.wallHit.play();
      this.x += this.direction.dx * this.speed * timeSlice;
    }*/

    if (this.ballHitsTheSky()) {
      this.direction.dy *= -1; //invert y vector
      this.bullet.play();
      this.y += this.direction.dy * this.speed * timeSlice;
    }

    if (this.ballHitsTheGround()) {
      this.direction.dy *= -1; //invert y vector
      this.bullet2.play();
      this.y += this.direction.dy * this.speed * timeSlice;
    }

    if (this.ballHitsTheWall()) {
      // THE BALL HITS THE WALL

      this.direction.dx *= -1; // invert x vector
      this.wallHit.play();

      this.wallHitsCounter++;

      if (this.wallHitsCounter === 5) {
        theme.playbackRate = 1.5;
      }

      if (this.wallHitsCounter === 10) {
        this.wallElement.style.display = "none";

        this.wallDown.volume = 1;
        this.wallDown.play();

        setTimeout(() => {
          this.bravo.play();
        }, 3600);
        this.missionCompleted = true;
      }

      //this.wallHitAnimation();
      this.wallElement.style.backgroundColor = "red"; // the wall turns red for few ms
      const myTimeout = setTimeout(hitFlash, 60);

      function hitFlash() {
        this.wallElement = document.getElementById("wall"); // NEEDED WHY?????
        this.wallElement.style.backgroundColor = "gray"; // the wall turns to the original color
      }

      this.x += this.direction.dx * this.speed * timeSlice;
      this.speed = this.speed + 0.03;
    }

    if (this.ballHitsTheRacket()) {
      this.direction.dx *= -1; // invert x vector
      this.racketHit.play();
      this.x += this.direction.dx * this.speed * timeSlice;
    }

    if (this.racketMiss()) {
      // yous lose!!!
      this.element.style.display = "none";
      this.sadTrombone.play();
      this.youHaveLost = true;
      this.youLose.play();

      setTimeout(() => {
        location.reload();
      }, 3500);
    } else {
      // keep going!
      this.x += this.direction.dx * this.speed * timeSlice;
      this.y += this.direction.dy * this.speed * timeSlice;
    }

    //update the #ball position
    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
