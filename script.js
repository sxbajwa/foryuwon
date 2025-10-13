const openBtn = document.getElementById("openBtn");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");
const card = document.getElementById("card");
const inside = card.querySelector(".inside");
const front = card.querySelector(".front");
const cakeScene = document.getElementById("cakeScene");
const confettiCanvas = document.getElementById("confetti");
const ctx = confettiCanvas.getContext("2d");
const bgMusic = document.getElementById("bgMusic");
const birthdayBackground = document.getElementById("birthdayBackground");

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

// open card
openBtn.addEventListener("click", () => {
  front.classList.add("hidden");
  inside.classList.remove("hidden");
});

// go to cake scene
nextBtn.addEventListener("click", () => {
  inside.classList.add("hidden");
  card.classList.add("hidden");
  cakeScene.classList.remove("hidden");
  startConfetti();
  playMusic();
  createMovingText();
});

// go back
backBtn.addEventListener("click", () => {
  cakeScene.classList.add("hidden");
  card.classList.remove("hidden");
  front.classList.remove("hidden");
  inside.classList.add("hidden");
  confettis = [];
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  bgMusic.pause();
  bgMusic.currentTime = 0;
  birthdayBackground.innerHTML = "";
});

// music
function playMusic() {
  bgMusic.volume = 0.5;
  bgMusic.play().catch(() => {
    console.log("Music playback blocked until user interaction.");
  });
}

// confetti
let confettis = [];
function startConfetti() {
  for (let i = 0; i < 200; i++) {
    confettis.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      size: Math.random() * 10 + 6,
      speed: Math.random() * 3 + 1,
      emoji: Math.random() > 0.5 ? "💜" : "💖",
    });
  }
  drawConfetti();
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  ctx.font = "20px serif";
  for (let c of confettis) {
    ctx.fillText(c.emoji, c.x, c.y);
  }
  updateConfetti();
  requestAnimationFrame(drawConfetti);
}

function updateConfetti() {
  for (let c of confettis) {
    c.y += c.speed;
    if (c.y > confettiCanvas.height) {
      c.y = -10;
      c.x = Math.random() * confettiCanvas.width;
    }
  }
}

// moving text under cake
function createMovingText() {
  for (let i = 0; i < 10; i++) {
    const span = document.createElement("span");
    span.textContent = "Happy Birthday 💜";
    span.classList.add("hb-text");
    span.style.top = Math.random() * 80 + "%";
    span.style.animationDuration = 6 + Math.random() * 4 + "s";
    span.style.animationDelay = Math.random() * 2 + "s";
    // random direction
    if (Math.random() > 0.5) {
      span.style.left = "-150px";
    } else {
      span.style.right = "-150px";
      span.style.animationDirection = "reverse";
    }
    birthdayBackground.appendChild(span);
  }
}
