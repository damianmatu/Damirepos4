let angleSlider;
let lengthSlider;
let circleRadiusSlider;
let windStrength = 5;
let windDirection = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(240);

  angleSlider = createSlider(0, TWO_PI, PI / 4, 0.01);
  angleSlider.position(20, 20);

  lengthSlider = createSlider(10, 200, 100, 1);
  lengthSlider.position(20, 50);

  circleRadiusSlider = createSlider(10, 200, 50, 1);
  circleRadiusSlider.position(20, 80);

  let button = createButton('Reiniciar');
  button.position(20, 110);
  button.mousePressed(resetSketch);

  drawBranch(width / 2, height, 100, 10);
}

function drawBranch(x, y, len, strokeWeightVal) {
  const angle = angleSlider.value();
  const branchLength = lengthSlider.value();
  const circleRadius = circleRadiusSlider.value();

  strokeWeight(strokeWeightVal);
  stroke(0);
  line(x, y, x, y - len);

  for (let i = -PI; i < PI; i += PI / 15) {
    const xOffset = cos(i) * circleRadius;
    const yOffset = sin(i) * circleRadius;

    line(x, y - len, x + xOffset, y - len + yOffset);
  }

  if (len > 4) {
    const windX = mouseX - pmouseX;
    const windY = mouseY - pmouseY;

    windDirection += (windX - windDirection) * 0.05;

    push();
    translate(x, y - len);
    rotate(angle + map(windDirection, -width, width, -windStrength, windStrength));
    drawBranch(0, 0, len * 0.67, strokeWeightVal * 0.67);
    pop();

    push();
    translate(x, y - len);
    rotate(-angle + map(windDirection, -height, height, -windStrength, windStrength));
    drawBranch(0, 0, len * 0.67, strokeWeightVal * 0.67);
    pop();
  }
}

function resetSketch() {
  background(240);
  drawBranch(width / 2, height, 100, 10);
}
