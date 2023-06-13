class Ball {
  constructor(speed, racket) {
    this.element = document.getElementById("ball"); // getting the div ball
    this.x = this.element.getBoundingClientRect().left;
    this.y = this.element.getBoundingClientRect().top;
    this.direction = { dx: 0, dy: 1 }; // default to get into the while
    this.speed = speed;
    this.racket = racket;
    // sound
    this.racketHit = new Audio("../sounds/mixkit-metal-bowl-hit-1842.wav");
    this.sadTrombone = new Audio("../sounds/Sad-trombone.mp3");
    this.wallHit = new Audio("../sounds/mixkit-metallic-sword-strike-2160.wav");
    this.bullet = new Audio("../sounds/bullet.mp3");
    this.sky = new Audio("../sounds/sky.mp3");

    this.reset(); // execute the reset method to restart from the default setting
  }

  reset() {
    //nitial setting -----> ball default position
    this.element.style.left = "10vw";
    this.element.style.top = "50vh";

    //direction
    while (
      Math.abs(this.direction.dx <= 0.3) ||
      Math.abs(this.direction.dx >= 0.9)
    ) {
      const angle = getRandom(0, 2 * Math.PI); // random between 0° and 360°

      //console.log(angle);

      this.direction.dx = Math.cos(angle);
      this.direction.dy = Math.sin(angle);
    }
    //console.log(this.direction);
  }

  // collision handlers ------------------------------------------------------

  ballHitsTheWall() {
    const ballBound = this.element.getBoundingClientRect(); // collision handler
    return ballBound.right >= window.innerWidth;
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

  update(timeSlice) {
    const ballBound = this.element.getBoundingClientRect(); // collision handler
    const racketBound = this.racket.element.getBoundingClientRect();

    if (this.ballHitsTheSky()) {
      this.direction.dy *= -1; //invert y vector
      this.bullet.play();
      this.y += this.direction.dy * this.speed * timeSlice;
    }

    if (this.ballHitsTheGround()) {
      this.direction.dy *= -1; //invert y vector
      this.bullet.play();
      this.y += this.direction.dy * this.speed * timeSlice;
    }

    if (this.ballHitsTheWall()) {
      this.direction.dx *= -1; // invert x vector
      this.wallHit.play();
      this.x += this.direction.dx * this.speed * timeSlice;
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

      setTimeout(() => {
        let message = document.getElementById("retry");
        message.style.display = "block";
        location.reload();
      }, 4000);
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
