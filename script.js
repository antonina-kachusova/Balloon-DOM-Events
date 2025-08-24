const balloon = document.getElementById("balloon");
const btnInc = document.getElementById("increase");
const btnDec = document.getElementById("decrease");
const btnReset = document.getElementById("reset");
const counter = document.getElementById("explosionCounter");
const confettiBox = document.getElementById("confetti");

const initialSize = 56;
let size = initialSize; // px
const maxSize = 110;
const minSize = 16;
let exploded = false;
let explosionCount = 0;

const colors = [
  "#FF6F61",
  "#F9A602",
  "#29B6F6",
  "#81C784",
  "#AB47BC",
  "#FFB300",
  "#F06292",
  "#26A69A",
  "#EC407A",
  "#FFD54F",
  "#42A5F5",
  "#7E57C2",
  "#34A853",
  "#f44336",
];

function randomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function updateBalloonColor() {
  balloon.style.color = randomColor();
}

function playPopSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(80, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(250, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(1, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.16);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.2);
    osc.onended = () => ctx.close();
  } catch (e) {}
}

function updateSize(anim = true) {
  balloon.style.fontSize = size + "px";
  if (anim) {
    balloon.style.transform = "scale(1.08)";
    setTimeout(() => (balloon.style.transform = "scale(1)"), 180);
  }
  updateBalloonColor();
}

function explodeBalloon() {
  exploded = true;
  explosionCount++;
  counter.textContent = `Pops: ${explosionCount}`;
  balloon.classList.add("explode-anim");
  setTimeout(() => {
    balloon.textContent = "💥";
    balloon.style.fontSize = "64px";
    balloon.style.transform = "none";
    balloon.style.color = "#444";
  }, 400);
  playPopSound();
  btnInc.disabled = true;
  btnDec.disabled = true;
  btnInc.classList.remove("active");
  btnDec.classList.remove("active");
  window.removeEventListener("keydown", handleKey);
  // Confetti!
  setTimeout(() => showConfetti(), 250);
}

function grow() {
  if (exploded) return;
  size *= 1.1;
  if (size > maxSize) {
    explodeBalloon();
  } else {
    updateSize();
  }
}

function shrink() {
  if (exploded) return;
  size *= 0.9;
  if (size < minSize) size = minSize;
  updateSize();
}

function handleKey(e) {
  if (exploded) return;
  if (e.key === "ArrowUp" || e.key === "ArrowRight") {
    e.preventDefault();
    btnInc.classList.add("active");
    grow();
    setTimeout(() => btnInc.classList.remove("active"), 160);
  } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
    e.preventDefault();
    btnDec.classList.add("active");
    shrink();
    setTimeout(() => btnDec.classList.remove("active"), 160);
  }
}

btnInc.addEventListener("click", () => {
  btnInc.classList.add("active");
  grow();
  setTimeout(() => btnInc.classList.remove("active"), 160);
});

btnDec.addEventListener("click", () => {
  btnDec.classList.add("active");
  shrink();
  setTimeout(() => btnDec.classList.remove("active"), 160);
});

window.addEventListener("keydown", handleKey);

btnReset.addEventListener("click", () => {
  size = initialSize;
  exploded = false;
  balloon.classList.remove("explode-anim");
  balloon.textContent = "🎈";
  updateSize(false);
  btnInc.disabled = false;
  btnDec.disabled = false;
  window.addEventListener("keydown", handleKey);
  setTimeout(() => balloon.focus(), 250);
  clearConfetti();
});

function showConfetti() {
  clearConfetti();
  const num = 70 + Math.floor(Math.random() * 20);
  for (let i = 0; i < num; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.background = randomColor();
    piece.style.left = 10 + Math.random() * 80 + "vw";
    piece.style.top = "-30px";
    piece.style.width = 10 + Math.random() * 11 + "px";
    piece.style.height = 8 + Math.random() * 12 + "px";
    const duration = 1.6 + Math.random() * 1.4;
    const translateY = 60 + Math.random() * 38;
    piece.animate(
      [
        { transform: "translateY(0) rotate(0deg)", opacity: 1 },
        {
          transform: `translateY(${translateY}vh) rotate(${
            Math.random() * 360 - 180
          }deg)`,
          opacity: 0.2,
        },
      ],
      {
        duration: duration * 1000,
        easing: "ease-out",
        fill: "forwards",
      }
    );
    setTimeout(() => {
      if (piece.parentNode) piece.parentNode.removeChild(piece);
    }, duration * 1000 + 800);
    confettiBox.appendChild(piece);
  }
}
function clearConfetti() {
  confettiBox.innerHTML = "";
}

updateSize(false);
setTimeout(() => balloon.focus(), 300);
