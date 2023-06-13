class Ball {
  constructor(speed, racket) {
    this.element = document.getElementById("ball"); // getting the div ball
    this.x = this.element.getBoundingClientRect().left;
    this.y = this.element.getBoundingClientRect().top;
    this.direction = { dx: 0, dy: 1 }; // default to get into the while
    this.speed = speed;
    this.racket = racket;
    this.racketHit = new Audio("../sounds/mixkit-metal-bowl-hit-1842.wav");
    this.sadTrombone = new Audio("../sounds/Sad-trombone.mp3");
    this.topBottomHit = new Audio(
      "../sounds/mixkit-metallic-sword-strike-2160.wav"
    );

    this.reset(); // execute the reset method to restart from the default setting
  }

  reset() {
    //nitial setting -----> ball default position
    this.element.style.left = "10vw";
    this.element.style.top = "50vh";

    //direction
    while (
      Math.abs(this.direction.dx <= 0.2) ||
      Math.abs(this.direction.dx >= 0.9)
    ) {
      const angle = getRandom(0, 2 * Math.PI); // random between 0° and 360°

      console.log(angle);

      this.direction.dx = Math.cos(angle);
      this.direction.dy = Math.sin(angle);
    }
    //console.log(this.direction);
  }

  update(timeSlice) {
    const ballBound = this.element.getBoundingClientRect(); //to manage ball collisions

    const racketBound = this.racket.element.getBoundingClientRect();

    if (ballBound.top <= 0 || ballBound.bottom >= window.innerHeight) {
      this.direction.dy *= -1; //invert y vector
      this.racketHit.play();
      this.y += this.direction.dy * this.speed * timeSlice;
    }

    if (
      ballBound.right >= window.innerWidth ||
      (ballBound.left <= racketBound.right &&
        ballBound.top >= racketBound.top - ballBound.height &&
        ballBound.bottom <= racketBound.bottom + ballBound.height) // the ball can bounce only on the racket
    ) {
      this.direction.dx *= -1; // invert x vector
      this.racketHit.play();
      this.x += this.direction.dx * this.speed * timeSlice;
    }

    if (ballBound.left <= 0) {
      this.element.style.display = "none";
      this.sadTrombone.play();
      //location.reload();
    } else {
      this.x += this.direction.dx * this.speed * timeSlice;
      this.y += this.direction.dy * this.speed * timeSlice;
    }

    //console.log(this.x);

    this.element.style.top = `${this.y}px`;
    this.element.style.left = `${this.x}px`;
  }
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
