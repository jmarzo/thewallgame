let previousTime;

const ball = new Ball(0.4);

function update(time) {
  if (previousTime) {
    const timeSlice = time - previousTime;
    //console.log(timeSlice);

    //update the ball
    ball.update(timeSlice);
  }

  previousTime = time;

  if (!ball.missionCompleted && !ball.youHaveLost) {
    window.requestAnimationFrame(update);
  } else if (ball.missionCompleted) {
    let p = document.getElementById("win");
    p.style.display = "inline-block";
  } else {
    let p = document.getElementById("lose");
    p.style.display = "inline-block";
  }
}

const onMouseMove = (e) => {
  ball.racket.element.style.top = e.pageY + "px";
};

document.addEventListener("mousemove", onMouseMove); // you can move the racket

let startButton = document.getElementById("start-button");

startButton.addEventListener("click", () => {
  let startDiv = document.getElementById("game-start");
  startDiv.style.display = "none";

  window.requestAnimationFrame(update);
});
