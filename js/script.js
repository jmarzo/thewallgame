let previousTime;

function update(time) {
  if (previousTime) {
    const timeSlice = time - previousTime;
    console.log(timeSlice);
  }

  previousTime = time;

  window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);
