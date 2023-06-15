let previousTime;
let theme = new Audio("../sounds/Green_Day-Hitchin'_A_Ride_8bit.mp3");

const ball = new Ball(0.4); // the game's ball woth its starting SPEED

function update(time) {
  if (previousTime) {
    // if it's not the first iteration
    const timeSlice = time - previousTime; // we need the timeslice to adjust the ball motion

    //update the ball
    ball.update(timeSlice);
  }

  previousTime = time;

  if (!ball.missionCompleted && !ball.youHaveLost) {
    // if nothing happens, the ball keeps going
    window.requestAnimationFrame(update);
  } else if (ball.missionCompleted) {
    // if the wall is down you won!
    theme.pause();
    theme.currentTime = 0;
    let p = document.getElementById("game-win");
    p.style.display = "inline-block";
  } else {
    // otherwise you have lost
    theme.pause();
    theme.currentTime = 0;
    let p = document.getElementById("lose");
    p.style.display = "inline-block";
  }
}

// event handlers on click and move
const onMouseMove = (e) => {
  ball.racket.element.style.top = e.pageY + "px";
};

document.addEventListener("mousemove", onMouseMove); // you can move the racket

let startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
  let startDiv = document.getElementById("game-start");
  startDiv.style.display = "none";

  theme.play(); // music on!
  window.requestAnimationFrame(update); // the game loop starts
});

let refreshButton = document.getElementById("refresh-button"); // play again

refreshButton.addEventListener("click", () => {
  location.reload();
});
