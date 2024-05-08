D1 = [];
pan = 140;
x = 200;
y = 200;
popper = 2000;
let ii = 0,
  popupText = "",
  popupTime = 0;
foods = ["basil", "oregano", "ground beef", "garlic", "onion"];
let mic;

function setup() {
    let mycanvas = createCanvas(400, 400);
    mycanvas.parent("p5-canvas-container");
  sc = color(150, 50, 30)
  for (let i = 0; i < 500; i++) startdots()
  mic = new p5.AudioIn()
  mic.start();
}

function startdots() {
  let angle = random(2*PI)
  r = random(pan)
  D1.push(createDot(x + r * cos(angle),y + r * sin(angle),random(200, 255),random(50, 100),random(20, 50)))
}

function draw() {
  clear();
  ps();
  D1.forEach((dot) => dot.active && dotdrawer(dot));
  spoonStuff(mouseX, mouseY);
  soundMachine();
  displayPopup();
}

function displayPopup() {
  if (millis() - popupTime < popper) {
    fill(255, 255, 0);
    textSize(16);
    textAlign(CENTER, CENTER);
    text(popupText, width / 2, 30);
  } else popupText = "";
}

function ps() {
  fill(80)
  ellipse(x, y, 300, 300);
  fill(sc)
  ellipse(x, y, 280, 280)
}

function dotdrawer(dot) {
  dot.x = x + dot.r * cos(dot.angle)
  dot.y = y + dot.r * sin(dot.angle)
  dot.size += dot.sizeVel;
  if (dot.size > 6 || dot.size < 3) dot.sizeVel *= -1;
  fill(dot.col)
  noStroke()
  ellipse(dot.x, dot.y, dot.size, dot.size);
}

function spoon(x, y) {
  fill(190)
  ellipse(x, y, 30, 30)
  stroke(190)
  strokeWeight(6)
  line(x, y + 5, x, y + 75)
  fill(180, 60, 40)
  ellipse(x, y, 25, 25)
}

function spoonStuff(x, y) {
  spoon(x, y - 15)
  D1.forEach((dot) => {if (dot.active && dist(x, y, dot.x, dot.y) < 30) {dot.popping = true; dot.popSize = dot.size;tt = millis();}
  });
}


function soundMachine() {
  let vol = mic.getLevel()
  if (vol > 0.002) {ai(foods[ii]);
    ii = (ii + 1) % foods.length;
    ingredientAddedTime = millis();
  }
}

function ai(foods) {
  for (let i = 0; i < 10; i++) D1.push(idot(foods));
  popupText = `Adding ingredient: ${foods}`;
  popupTime = millis();
}

function idot(foods) {
  let angle = random(TWO_PI),
    r = random(pan);
  let [col, size] = ip(foods);
  return createDot(
    x + r * cos(angle),
    y + r * sin(angle),
    col[0],
    col[1],
    col[2],
    size
  );
}

function ip(foods) {
  const properties = {
    basil: [
      [82,197,82],
      [10, 5],
    ],
    oregano: [
      [41,150,41],
      [5, 3],
    ],
    "ground beef": [
      [134,44,44],
      [20, 20],
    ],
    garlic: [
      [134,44,44],
      [2, 5],
    ],
    onion: [
      [134,44,44],
      [3, 6],
    ],
  };
  return (
    properties[foods] || [
      [150, 50, 30],
      [3, 6],
    ]
  );
}

function createDot(x, y, red, green, blue, sizeRange = [3, 6]) {
  return {
    x,
    y,
    col: color(red, green, blue),
    angle: random(TWO_PI),
    r: random(pan),
    size: random(...sizeRange),
    sizeVel: random(0.05, 0.1),
    active: true,
    popping: false,
    popSize: 0,
  };
}
