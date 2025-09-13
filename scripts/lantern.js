const canvas = document.getElementById("lanternCanvas");
const ctx = canvas.getContext("2d"); // the tool needed to draw our shapes

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// It listens for when the browser window is resized, and then resizes the <canvas> element to match the new width and height of the window.
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// this is the blueprint for our lantern
class Lantern {
  constructor() {
    this.reset(); // every time a new lantern is created, the reset() method will set up all its starting properties
  }

  // sets random properties to make each lantern unique and reusable:
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + Math.random() * 200;
    this.size = 20 + Math.random() * 20;
    this.speed = 0.3 + Math.random() * 1;
    this.opacity = 0.7 + Math.random() * 0.3;
    this.flicker = Math.random() * 0.05;
    this.colorHue = 20 + Math.random() * 40; // warm hues from 20 to 60

    // sway feature
    this.swayAmplitude = 10 + Math.random() * 10; // how wide it sways
    this.swaySpeed = 0.002 + Math.random() * 0.002; // how fast it sways
    this.swayOffset = Math.random() * 1000; // random phase offset
  }

  // responsible for controlling how each lantern moves and flickers in your animation loop.
  update() {
    this.y -= this.speed;
    this.opacity += (Math.random() - 0.5) * this.flicker;
    if (this.y < -50) this.reset();
  }

  // decides the shape of our lantern
  draw() {
    const width = this.size;
    const height = this.size * 1.4;

    // sway for lantern
    const swayX =
      this.x +
      Math.sin((this.y + this.swayOffset) * this.swaySpeed) *
        this.swayAmplitude;

    ctx.beginPath(); // start drawing new independent shapes

    // body of the lantern
    ctx.fillStyle = `hsla(${this.colorHue}, 100%, 50%, ${this.opacity})`;
    ctx.fillRect(swayX - width / 2, this.y - height / 2, width, height);

    // the glow of the lantern
    ctx.fillStyle = `hsla(${this.colorHue}, 100%, 70%, ${this.opacity * 0.15})`;
    ctx.fillRect(
      swayX - width * 0.7,
      this.y - height * 1.2,
      width * 1.4,
      height * 2
    );
  }
}

// create our lanterns
const lanternCount = 30;
const lanterns = [];

for (let i = 0; i < lanternCount; i++) {
  lanterns.push(new Lantern());
}

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // It clears the entire canvas before drawing the next frame.

  for (let lantern of lanterns) {
    lantern.update();
    lantern.draw();
  }
  // special function to keep looping
  requestAnimationFrame(animate);
}

animate();
