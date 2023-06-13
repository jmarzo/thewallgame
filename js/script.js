let previousTime;

const racket = new Racket();
const ball = new Ball(0.4, racket);

function update(time) {
  if (previousTime) {
    const timeSlice = time - previousTime;
    console.log(timeSlice);
    //update the ball
    ball.update(timeSlice);
  }

  previousTime = time;

  window.requestAnimationFrame(update);
}

const onMouseMove = (e) => {
  racket.element.style.top = e.pageY + "px";
};

let startButton = document.getElementById("start-button");

document.addEventListener("mousemove", onMouseMove); // you can move the racket

startButton.addEventListener("click", () => {
  let startDiv = document.getElementById("game-start");
  startDiv.style.display = "none";

  window.requestAnimationFrame(update);
});
