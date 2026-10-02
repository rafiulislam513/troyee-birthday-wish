// =====================================================
// TROyee BIRTHDAY SITE — CINEMATIC MOBILE EXPERIENCE
// =====================================================

// ---------- Chapter navigation + cinematic transition ----------
const chapters = [...document.querySelectorAll('.chapter')];
const nextButtons = [...document.querySelectorAll('.next-btn')];
const transitionLayer = document.getElementById('cinematicTransition');
let chapterChanging = false;

function showChapter(number) {
  if (chapterChanging) return;
  const target = document.querySelector(`#chapter-${number}`);
  if (!target) return;

  chapterChanging = true;
  transitionLayer.classList.remove('play');
  void transitionLayer.offsetWidth;
  transitionLayer.classList.add('play');

  setTimeout(() => {
    chapters.forEach(ch => ch.classList.remove('chapter--active'));
    target.classList.add('chapter--active');
    window.scrollTo({ top: 0, behavior: 'auto' });
    activateVisibleReveals(target);

    if (number === 7) {
      setTimeout(() => {
        resizeGameCanvas();
        resetGame(false);
      }, 120);
    }
  }, 260);

  setTimeout(() => {
    transitionLayer.classList.remove('play');
    chapterChanging = false;
  }, 620);
}

nextButtons.forEach(btn => {
  btn.addEventListener('click', () => showChapter(Number(btn.dataset.next)));
});

// ---------- Scroll reveals ----------
const revealTargets = document.querySelectorAll('.story-scene, .photo-card, .trait-card');
revealTargets.forEach(el => el.classList.add('scroll-reveal'));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' });

revealTargets.forEach(el => revealObserver.observe(el));

function activateVisibleReveals(root) {
  root.querySelectorAll('.scroll-reveal').forEach(el => revealObserver.observe(el));
}

// ---------- Ambient particles ----------
const particles = document.getElementById('particles');
for (let i = 0; i < 34; i++) {
  const dot = document.createElement('span');
  dot.className = 'particle';
  const size = 2 + Math.random() * 3;
  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.left = `${Math.random() * 100}%`;
  dot.style.animationDuration = `${8 + Math.random() * 15}s`;
  dot.style.animationDelay = `${Math.random() * -16}s`;
  dot.style.opacity = `${0.18 + Math.random() * 0.55}`;
  particles.appendChild(dot);
}

function burstAtElement(el, count = 8) {
  const rect = el.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('i');
    s.className = 'tap-spark';
    s.style.left = `${x}px`;
    s.style.top = `${y}px`;
    s.style.setProperty('--tx', `${(Math.random() - .5) * 100}px`);
    s.style.setProperty('--ty', `${-30 - Math.random() * 85}px`);
    s.style.animationDelay = `${Math.random() * .08}s`;
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 800);
  }
}

// ---------- Music ----------
// ---------- Music ----------
const musicToggle = document.getElementById("musicToggle");
const bgMusic = document.getElementById("bgMusic");

bgMusic.volume = 0.5;

// Force browser to load the audio file
bgMusic.load();

musicToggle.addEventListener("click", async () => {
  try {
    if (bgMusic.paused) {
      await bgMusic.play();

      musicToggle.classList.add("playing");
      musicToggle.textContent = "♫";

      console.log("Music started successfully");
    } else {
      bgMusic.pause();

      musicToggle.classList.remove("playing");
      musicToggle.textContent = "♪";

      console.log("Music paused");
    }
  } catch (err) {
    console.error("Audio error:", err);

    alert(
      "The music file could not be played. Open the browser console for the exact error."
    );
  }
});

bgMusic.addEventListener("canplaythrough", () => {
  console.log("Background music loaded successfully");
});

bgMusic.addEventListener("error", () => {
  console.error("Failed to load background.mp3", bgMusic.error);
});

// ---------- Video & Background Music ----------
const birthdayVideo = document.getElementById("birthdayVideo");

let musicWasPlayingBeforeVideo = false;

birthdayVideo.addEventListener("play", () => {
  musicWasPlayingBeforeVideo = !bgMusic.paused;

  if (musicWasPlayingBeforeVideo) {
    bgMusic.pause();
  }

  musicToggle.classList.remove("playing");
  musicToggle.textContent = "♪";
});

birthdayVideo.addEventListener("pause", () => {
  // Don't restart music if the video has actually finished
  if (!birthdayVideo.ended && musicWasPlayingBeforeVideo) {
    bgMusic.play().then(() => {
      musicToggle.classList.add("playing");
      musicToggle.textContent = "♫";
    }).catch(() => {});
  }
});

birthdayVideo.addEventListener("ended", () => {
  if (musicWasPlayingBeforeVideo) {
    bgMusic.play().then(() => {
      musicToggle.classList.add("playing");
      musicToggle.textContent = "♫";
    }).catch(() => {});
  }
});

// ---------- Trait modal ----------
const traitModal = document.getElementById('traitModal');
const traitTitle = document.getElementById('traitTitle');
const traitText = document.getElementById('traitText');
const traitClose = document.getElementById('traitClose');

document.querySelectorAll('.trait-card').forEach(card => {
  card.addEventListener('click', () => {
    burstAtElement(card, 7);
    traitTitle.textContent = card.dataset.title;
    traitText.textContent = card.dataset.text;
    traitModal.classList.add('show');
    traitModal.setAttribute('aria-hidden', 'false');
  });
});

function closeTraitModal() {
  traitModal.classList.remove('show');
  traitModal.setAttribute('aria-hidden', 'true');
}
traitClose.addEventListener('click', closeTraitModal);
traitModal.addEventListener('click', e => {
  if (e.target === traitModal) closeTraitModal();
});

// ---------- Love hearts ----------
const loveLines = [
  'The way you make ordinary moments feel special.',
  'The way your smile stays in my mind long after I’ve seen it.',
  'How you can be cute and terrifying at the same time. 😭',
  'The way you care, even when you pretend not to.',
  'How your presence can make my whole day softer.',
  'The way I miss you even when we just talked.',
  'How beautiful you are without even trying.',
  'The way you make me want to be better.',
  'Your little moods, because somehow I even love those.',
  'The way your voice feels familiar to my heart.',
  'How deeply you make me feel loved.',
  'The fact that you are never replaceable to me.',
  'The way I can imagine a whole life with you.',
  'How one text from you can change my entire mood.',
  'The way you became my favourite person so naturally.',
  'How I find comfort in you, even from a distance.',
  'The way you stay on my mind without effort.',
  'Your softness.',
  'Your fire.',
  'Your heart.',
  'Your laugh.',
  'Your existence, honestly.',
  'And if I kept going, this page would never end. ❤️'
];

const loveGrid = document.getElementById('loveGrid');
const loveMessage = document.getElementById('loveMessage');
loveLines.forEach((line, index) => {
  const btn = document.createElement('button');
  btn.className = 'love-heart';
  btn.textContent = '♥';
  btn.setAttribute('aria-label', `Love note ${index + 1}`);
  btn.addEventListener('click', () => {
    btn.classList.add('seen');
    burstAtElement(btn, 6);
    loveMessage.animate(
      [{ opacity: .25, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
      { duration: 350, easing: 'ease-out' }
    );
    loveMessage.textContent = `${index + 1}. ${line}`;
  });
  loveGrid.appendChild(btn);
});

// ---------- Fake ending ----------
const fakeFinish = document.getElementById('fakeFinish');
const surpriseLock = document.getElementById('surpriseLock');
fakeFinish.addEventListener('click', () => {
  fakeFinish.disabled = true;
  fakeFinish.textContent = '…';
  setTimeout(() => {
    fakeFinish.classList.add('hidden');
    surpriseLock.classList.remove('hidden');
  }, 1050);
});

// =====================================================
// GAME — FIND YOUR WAY TO ME: MOBILE BALANCED EDITION
// =====================================================
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const heartCountEl = document.getElementById('heartCount');
const gameStatusEl = document.getElementById('gameStatus');
const gameWin = document.getElementById('gameWin');

const VIEW_W = 360;
const VIEW_H = 560;
let animationFrame = 0;
let keys = { left: false, right: false };
let frame = 0;
let gameWon = false;
let lives = 4;
let checkpoint = 0;
let collectedHearts = 0;
let messageTimer = 0;
let shake = 0;
let bridgeSequence = false;
let bridgeProgress = 0;
let coyoteFrames = 0;
let jumpBuffer = 0;

const world = {
  width: 2380,
  height: 560,
  gravity: 0.56,
  cameraX: 0,
  wind: 0
};

const spawnPoints = [
  { x: 32, y: 430 },
  { x: 690, y: 420 },
  { x: 1350, y: 420 },
  { x: 1775, y: 420 }
];

const player = {
  x: 32, y: 430, w: 28, h: 38,
  vx: 0, vy: 0,
  speed: 3.35,
  jump: -10.65,
  grounded: false,
  invincible: 0,
  standingOn: null
};

// Shorter, phone-friendly level with safer landing widths.
const platforms = [
  { x: 0, y: 510, w: 310, h: 50, label: '' },
  { x: 350, y: 466, w: 130, h: 18, label: 'TIME' },
  { x: 520, y: 420, w: 120, h: 18, label: '' },
  { x: 675, y: 510, w: 285, h: 50, label: '' },

  { x: 1010, y: 458, w: 125, h: 18, label: 'BAD DAYS' },
  { x: 1180, y: 405, w: 120, h: 18, label: '' },
  { x: 1340, y: 510, w: 300, h: 50, label: '' },

  { x: 1685, y: 455, w: 125, h: 18, label: 'MISSING YOU' },
  { x: 1845, y: 510, w: 145, h: 50, label: '' },

  { x: 2180, y: 510, w: 200, h: 50, label: '' }
];

const movingPlatforms = [
  { baseX: 860, baseY: 390, x: 860, y: 390, w: 92, h: 17, ampX: 0, ampY: 46, speed: .019, phase: .2, dx: 0, dy: 0 },
  { baseX: 1510, baseY: 392, x: 1510, y: 392, w: 96, h: 17, ampX: 48, ampY: 0, speed: .018, phase: 1.1, dx: 0, dy: 0 }
];

const spikes = [
  { x: 226, y: 490, w: 48, h: 20 },
  { x: 735, y: 490, w: 54, h: 20 },
  { x: 890, y: 490, w: 48, h: 20 },
  { x: 1395, y: 490, w: 54, h: 20 },
  { x: 1560, y: 490, w: 46, h: 20 },
  { x: 1880, y: 490, w: 48, h: 20 }
];

// Fewer enemies, slower movement, still enough to require timing.
const enemies = [
  { baseX: 580, baseY: 350, x: 580, y: 350, r: 11, ampX: 0, ampY: 44, speed: .024, phase: 0 },
  { baseX: 1110, baseY: 350, x: 1110, y: 350, r: 12, ampX: 50, ampY: 0, speed: .022, phase: 1.4 },
  { baseX: 1735, baseY: 355, x: 1735, y: 355, r: 11, ampX: 42, ampY: 36, speed: .021, phase: .7 }
];

const hearts = [
  { x: 145, y: 454, taken: false, text: '+1 hug owed' },
  { x: 420, y: 414, taken: false, text: '+1 kiss owed' },
  { x: 905, y: 340, taken: false, text: '+1 memory kept' },
  { x: 1238, y: 354, taken: false, text: '+1 reason to love you more' },
  { x: 1540, y: 345, taken: false, text: '+1 future memory' },
  { x: 1750, y: 405, taken: false, text: '+1 birthday magic' }
];

const checkpoints = [
  { x: 675, activated: false, label: 'SAFE PLACE I' },
  { x: 1340, activated: false, label: 'SAFE PLACE II' },
  { x: 1775, activated: false, label: 'SAFE PLACE III' }
];

const finalGate = { x: 2005, y: 230, w: 42, h: 280, active: true, alpha: 1 };
const bridge = { startX: 2028, endX: 2180, y: 492, tileW: 25 };
const goal = { x: 2270, y: 448, w: 40, h: 62 };

function resizeGameCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = VIEW_W * dpr;
  canvas.height = VIEW_H * dpr;
  canvas.style.aspectRatio = `${VIEW_W} / ${VIEW_H}`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resizeGameCanvas);
resizeGameCanvas();

function setStatus(text, duration = 110) {
  gameStatusEl.textContent = text;
  messageTimer = duration;
}

function updateHUD() {
  heartCountEl.textContent = `💗 ${collectedHearts}/${hearts.length}   •   ✦ ${lives} ${lives === 1 ? 'life' : 'lives'}`;
}

function resetGame() {
  cancelAnimationFrame(animationFrame);
  frame = 0;
  gameWon = false;
  keys.left = keys.right = false;
  bridgeSequence = false;
  bridgeProgress = 0;
  finalGate.active = true;
  finalGate.alpha = 1;
  world.cameraX = 0;
  checkpoint = 0;
  lives = 4;
  collectedHearts = 0;
  hearts.forEach(h => h.taken = false);
  checkpoints.forEach(c => c.activated = false);
  player.x = spawnPoints[0].x;
  player.y = spawnPoints[0].y;
  player.vx = player.vy = 0;
  player.invincible = 0;
  player.standingOn = null;
  gameWin.classList.add('hidden');
  setStatus('Troyee, collect all 6 hearts and find Rafi. ❤️', 180);
  updateHUD();
  gameLoop();
}

document.getElementById('restartGame').addEventListener('click', resetGame);

function setHeld(button, direction) {
  const start = e => { e.preventDefault(); keys[direction] = true; };
  const end = e => { e.preventDefault(); keys[direction] = false; };
  button.addEventListener('pointerdown', start);
  button.addEventListener('pointerup', end);
  button.addEventListener('pointercancel', end);
  button.addEventListener('pointerleave', end);
}
setHeld(document.getElementById('moveLeft'), 'left');
setHeld(document.getElementById('moveRight'), 'right');

function requestJump(e) {
  if (e) e.preventDefault();
  jumpBuffer = 8;
}
document.getElementById('jumpBtn').addEventListener('pointerdown', requestJump);

window.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = true;
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = true;
  if (e.key === 'ArrowUp' || e.key === ' ' || e.key.toLowerCase() === 'w') requestJump();
});
window.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.left = false;
  if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.right = false;
});

function rectsOverlap(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}
function playerHitsCircle(c) {
  const cx = Math.max(player.x, Math.min(c.x, player.x + player.w));
  const cy = Math.max(player.y, Math.min(c.y, player.y + player.h));
  const dx = c.x - cx, dy = c.y - cy;
  return dx * dx + dy * dy < c.r * c.r;
}

function loseLife(reason) {
  if (player.invincible > 0 || gameWon || bridgeSequence) return;
  lives--;
  shake = 10;

  // Crucial mobile fairness: collected hearts stay collected.
  if (lives <= 0) {
    lives = 4;
    setStatus('Four fresh tries — your hearts are still safe. ❤️', 140);
  } else {
    setStatus(reason || 'Almost. Try that part again. ❤️', 105);
  }

  const sp = spawnPoints[checkpoint];
  player.x = sp.x;
  player.y = sp.y;
  player.vx = 0;
  player.vy = 0;
  player.invincible = 95;
  player.standingOn = null;
  world.cameraX = Math.max(0, sp.x - 80);
  updateHUD();
}

function updateMovingObjects() {
  movingPlatforms.forEach(m => {
    const oldX = m.x, oldY = m.y;
    const t = frame * m.speed + m.phase;
    m.x = m.baseX + Math.sin(t) * m.ampX;
    m.y = m.baseY + Math.sin(t) * m.ampY;
    m.dx = m.x - oldX;
    m.dy = m.y - oldY;
  });
  enemies.forEach(e => {
    const t = frame * e.speed + e.phase;
    e.x = e.baseX + Math.sin(t) * e.ampX;
    e.y = e.baseY + Math.cos(t * 1.15) * e.ampY;
  });
}

function landOnPlatform(p) {
  const prevBottom = player.y + player.h - player.vy;
  const currBottom = player.y + player.h;
  if (
    player.x + player.w > p.x - 2 &&
    player.x < p.x + p.w + 2 &&
    prevBottom <= p.y + 9 &&
    currBottom >= p.y &&
    player.vy >= 0
  ) {
    player.y = p.y - player.h;
    player.vy = 0;
    player.grounded = true;
    player.standingOn = p;
    return true;
  }
  return false;
}

function updateGame() {
  if (gameWon) return;
  frame++;
  if (player.invincible > 0) player.invincible--;
  if (jumpBuffer > 0) jumpBuffer--;
  if (messageTimer > 0) {
    messageTimer--;
    if (messageTimer === 0 && !bridgeSequence) gameStatusEl.textContent = 'Keep going, Troyee. Rafi is getting closer. ❤️';
  }
  if (shake > 0) shake *= .84;
  updateMovingObjects();

  if (bridgeSequence) {
    bridgeProgress = Math.min(1, bridgeProgress + .011);
    finalGate.alpha = Math.max(0, 1 - bridgeProgress * 1.2);
    if (bridgeProgress < .25) setStatus('You brought every little heart this far…', 3);
    else if (bridgeProgress < .78) setStatus('Now they are building a way through the distance.', 3);
    else setStatus('Distance did not disappear — you built a way through it. ❤️', 3);
    if (bridgeProgress >= 1) {
      bridgeSequence = false;
      finalGate.active = false;
      setStatus('Cross it, Troyee. Rafi is waiting. ❤️', 190);
    }
    return;
  }

  if (player.standingOn && movingPlatforms.includes(player.standingOn)) {
    player.x += player.standingOn.dx;
    player.y += player.standingOn.dy;
  }

  player.vx = 0;
  if (keys.left) player.vx = -player.speed;
  if (keys.right) player.vx = player.speed;

  // Mild final wind: noticeable, not brutal.
  world.wind = (player.x > 1660 && player.x < 1975) ? -0.26 : 0;
  player.vx += world.wind;
  player.x += player.vx;
  player.vy += world.gravity;
  player.y += player.vy;

  const wasGrounded = player.grounded;
  player.grounded = false;
  player.standingOn = null;
  [...platforms, ...movingPlatforms].forEach(landOnPlatform);

  if (player.grounded) coyoteFrames = 7;
  else if (wasGrounded || coyoteFrames > 0) coyoteFrames = Math.max(0, coyoteFrames - 1);

  // Buffered/coyote jump makes thumb timing much fairer on phones.
  if (jumpBuffer > 0 && coyoteFrames > 0) {
    player.vy = player.jump;
    player.grounded = false;
    coyoteFrames = 0;
    jumpBuffer = 0;
  }

  if (bridgeProgress >= 1) {
    landOnPlatform({ x: bridge.startX, y: bridge.y, w: bridge.endX - bridge.startX, h: 18 });
  }

  player.x = Math.max(0, Math.min(world.width - player.w, player.x));

  for (const s of spikes) {
    // slightly smaller hitbox than visual spike shape = fair on touch screens
    const hitbox = { x: s.x + 5, y: s.y + 7, w: s.w - 10, h: s.h - 7 };
    if (rectsOverlap(player, hitbox)) { loseLife('Ouch. Back to your last safe place.'); break; }
  }
  for (const e of enemies) {
    if (playerHitsCircle({ ...e, r: e.r - 2 })) { loseLife('That bad thought caught you. Try the section again.'); break; }
  }
  if (player.y > world.height + 75) loseLife('You fell — but you only restart from the last safe place. ❤️');

  hearts.forEach(h => {
    if (!h.taken && rectsOverlap(player, { x: h.x - 18, y: h.y - 18, w: 36, h: 36 })) {
      h.taken = true;
      collectedHearts++;
      updateHUD();
      setStatus(h.text, 115);
      shake = 2.8;
    }
  });

  checkpoints.forEach((c, idx) => {
    if (!c.activated && player.x > c.x) {
      c.activated = true;
      checkpoint = idx + 1;
      setStatus(`${c.label} — progress saved. ❤️`, 130);
    }
  });

  if (finalGate.active && rectsOverlap(player, finalGate)) {
    player.x = finalGate.x - player.w - 3;
    player.vx = 0;
    if (collectedHearts < hearts.length) {
      setStatus(`DISTANCE is locked. You still need ${hearts.length - collectedHearts} heart${hearts.length - collectedHearts === 1 ? '' : 's'}.`, 135);
    } else if (!bridgeSequence) {
      bridgeSequence = true;
      player.x = finalGate.x - player.w - 15;
      player.y = 510 - player.h;
      player.vx = player.vy = 0;
      setStatus('All 6 hearts are here. ❤️', 75);
    }
  }

  if (!finalGate.active && rectsOverlap(player, goal)) {
    gameWon = true;
    setStatus('Troyee found Rafi. ❤️', 9999);
    gameWin.classList.remove('hidden');
    setTimeout(() => gameWin.scrollIntoView({ behavior: 'smooth', block: 'center' }), 350);
  }

  const targetCamera = player.x - VIEW_W * .34;
  world.cameraX += (targetCamera - world.cameraX) * .09;
  world.cameraX = Math.max(0, Math.min(world.width - VIEW_W, world.cameraX));
}

function roundedRect(x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}
function drawHeart(x, y, size, color = '#f5a0b8') {
  ctx.save(); ctx.translate(x, y); ctx.scale(size / 32, size / 32);
  ctx.beginPath(); ctx.moveTo(0, 8);
  ctx.bezierCurveTo(-18, -7, -28, 13, 0, 30);
  ctx.bezierCurveTo(28, 13, 18, -7, 0, 8);
  ctx.fillStyle = color; ctx.fill(); ctx.restore();
}
function drawMountainLayer(offset, baseY, amplitude, alpha, speedFactor) {
  ctx.save(); ctx.globalAlpha = alpha; ctx.beginPath(); ctx.moveTo(0, VIEW_H);
  for (let x = 0; x <= VIEW_W + 60; x += 50) {
    const wx = x + world.cameraX * speedFactor + offset;
    const y = baseY + Math.sin(wx * .009) * amplitude + Math.sin(wx * .021) * amplitude * .35;
    ctx.lineTo(x, y);
  }
  ctx.lineTo(VIEW_W, VIEW_H); ctx.closePath(); ctx.fillStyle = '#6c4568'; ctx.fill(); ctx.restore();
}
function drawBackground() {
  const grad = ctx.createLinearGradient(0, 0, 0, VIEW_H);
  grad.addColorStop(0, '#151021'); grad.addColorStop(.54, '#0c0912'); grad.addColorStop(1, '#08060b');
  ctx.fillStyle = grad; ctx.fillRect(0, 0, VIEW_W, VIEW_H);
  const moonX = 290 - world.cameraX * .018;
  const moonGrad = ctx.createRadialGradient(moonX, 84, 2, moonX, 84, 68);
  moonGrad.addColorStop(0, 'rgba(255,235,220,.42)'); moonGrad.addColorStop(.25, 'rgba(242,155,178,.14)'); moonGrad.addColorStop(1, 'rgba(242,155,178,0)');
  ctx.fillStyle = moonGrad; ctx.beginPath(); ctx.arc(moonX, 84, 68, 0, Math.PI * 2); ctx.fill();
  for (let i = 0; i < 54; i++) {
    const x = ((i * 79 - world.cameraX * .07) % 430 + 430) % 430 - 35;
    const y = 28 + ((i * 137) % 330);
    const twinkle = .25 + .45 * (1 + Math.sin(frame * .025 + i)) / 2;
    ctx.fillStyle = `rgba(255,255,255,${twinkle})`; ctx.fillRect(x, y, i % 7 === 0 ? 2 : 1, i % 7 === 0 ? 2 : 1);
  }
  drawMountainLayer(0, 410, 35, .10, .10); drawMountainLayer(130, 455, 28, .08, .18);
}
function drawPlatforms() {
  platforms.forEach(p => {
    const g = ctx.createLinearGradient(0, p.y, 0, p.y + p.h);
    g.addColorStop(0, 'rgba(255,255,255,.18)'); g.addColorStop(1, 'rgba(92,58,83,.35)');
    ctx.fillStyle = g; roundedRect(p.x, p.y, p.w, p.h, 9); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.11)'; ctx.stroke();
    if (p.label) { ctx.fillStyle = '#e9c37d'; ctx.font = '700 10px Inter'; ctx.fillText(p.label, p.x + 8, p.y - 10); }
  });
  movingPlatforms.forEach(m => {
    ctx.save(); ctx.shadowColor = 'rgba(242,155,178,.5)'; ctx.shadowBlur = 12;
    const g = ctx.createLinearGradient(m.x, m.y, m.x + m.w, m.y);
    g.addColorStop(0, '#8c5578'); g.addColorStop(.5, '#d88aa5'); g.addColorStop(1, '#6c4568');
    ctx.fillStyle = g; roundedRect(m.x, m.y, m.w, m.h, 8); ctx.fill(); ctx.restore();
  });
}
function drawSpikes() {
  spikes.forEach(s => {
    ctx.fillStyle = '#a55c75'; const count = Math.max(2, Math.floor(s.w / 14)); const sw = s.w / count;
    for (let i = 0; i < count; i++) { ctx.beginPath(); ctx.moveTo(s.x + i * sw, s.y + s.h); ctx.lineTo(s.x + i * sw + sw / 2, s.y); ctx.lineTo(s.x + (i + 1) * sw, s.y + s.h); ctx.closePath(); ctx.fill(); }
  });
}
function drawEnemies() {
  enemies.forEach((e, idx) => {
    ctx.save(); ctx.shadowColor = '#d85f82'; ctx.shadowBlur = 18;
    const pulse = 1 + Math.sin(frame * .08 + idx) * .12;
    ctx.fillStyle = 'rgba(215,84,122,.92)'; ctx.beginPath(); ctx.arc(e.x, e.y, e.r * pulse, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(255,230,238,.8)'; ctx.beginPath(); ctx.arc(e.x - 3, e.y - 3, 3, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  });
}
function drawHeartShards() {
  hearts.forEach((h, i) => { if (h.taken) return; const bob = Math.sin(frame * .045 + i) * 5; ctx.save(); ctx.shadowColor = '#f29bb2'; ctx.shadowBlur = 15; drawHeart(h.x, h.y + bob, 18, '#ffadc4'); ctx.restore(); });
}
function drawCheckpoints() {
  checkpoints.forEach(c => {
    ctx.save(); ctx.globalAlpha = c.activated ? .95 : .38; ctx.strokeStyle = c.activated ? '#e9c37d' : '#a58a91'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(c.x, 452); ctx.lineTo(c.x, 510); ctx.stroke();
    ctx.fillStyle = c.activated ? '#e9c37d' : '#7b6570'; ctx.beginPath(); ctx.moveTo(c.x, 452); ctx.lineTo(c.x + 28, 462); ctx.lineTo(c.x, 472); ctx.closePath(); ctx.fill(); ctx.restore();
  });
}
function drawFinalGateAndBridge() {
  if (finalGate.alpha > 0) {
    ctx.save(); ctx.globalAlpha = finalGate.alpha; ctx.shadowColor = '#e9c37d'; ctx.shadowBlur = 18;
    const g = ctx.createLinearGradient(finalGate.x, finalGate.y, finalGate.x + finalGate.w, finalGate.y);
    g.addColorStop(0, '#7d5b39'); g.addColorStop(.5, '#e9c37d'); g.addColorStop(1, '#7d5b39');
    ctx.fillStyle = g; roundedRect(finalGate.x, finalGate.y, finalGate.w, finalGate.h, 10); ctx.fill();
    ctx.fillStyle = '#fff4d6'; ctx.font = '700 11px Inter'; ctx.save(); ctx.translate(finalGate.x + 22, finalGate.y + 160); ctx.rotate(-Math.PI / 2); ctx.fillText('DISTANCE', -34, 0); ctx.restore(); ctx.restore();
  }
  const totalTiles = Math.ceil((bridge.endX - bridge.startX) / bridge.tileW);
  const visibleTiles = Math.floor(totalTiles * bridgeProgress + .001);
  for (let i = 0; i < visibleTiles; i++) {
    const x = bridge.startX + i * bridge.tileW; const appear = Math.min(1, bridgeProgress * totalTiles - i);
    ctx.save(); ctx.globalAlpha = Math.max(.15, appear); ctx.shadowColor = '#f29bb2'; ctx.shadowBlur = 16;
    ctx.fillStyle = i % 2 ? '#b96c8d' : '#d88da9'; roundedRect(x, bridge.y, bridge.tileW - 3, 18, 6); ctx.fill();
    drawHeart(x + (bridge.tileW - 3) / 2, bridge.y - 13, 8, '#ffd3df'); ctx.restore();
  }
}
function drawGoal() {
  ctx.save(); ctx.shadowColor = '#e9c37d'; ctx.shadowBlur = 20; ctx.fillStyle = '#e9c37d';
  ctx.beginPath(); ctx.arc(goal.x + 20, goal.y + 11, 10, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#f4ece5'; roundedRect(goal.x + 8, goal.y + 22, 24, 38, 8); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#fff8f4'; ctx.font = '700 11px Inter'; ctx.fillText('RAFI', goal.x + 3, goal.y - 8);
}
function drawPlayer() {
  if (player.invincible > 0 && Math.floor(player.invincible / 5) % 2 === 0) return;
  const bob = player.grounded ? Math.sin(frame * .09) * .6 : 0;
  ctx.save(); ctx.translate(0, bob); ctx.shadowColor = '#f29bb2'; ctx.shadowBlur = 12;
  ctx.fillStyle = '#f29bb2'; ctx.beginPath(); ctx.arc(player.x + player.w / 2, player.y + 9, 9, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#fff8f4'; roundedRect(player.x + 5, player.y + 18, player.w - 10, player.h - 18, 7); ctx.fill(); ctx.restore();
  ctx.fillStyle = '#f7c1d0'; ctx.font = '700 9px Inter'; ctx.fillText('TROYEE', player.x - 5, player.y - 8);
}
function drawGame() {
  ctx.save(); ctx.clearRect(0, 0, VIEW_W, VIEW_H); drawBackground();
  const shakeX = shake > .3 ? (Math.random() - .5) * shake : 0; const shakeY = shake > .3 ? (Math.random() - .5) * shake * .45 : 0;
  ctx.translate(-world.cameraX + shakeX, shakeY);
  ctx.fillStyle = 'rgba(255,255,255,.05)'; ctx.font = '700 34px Cormorant Garamond';
  ctx.fillText('TIME', 350, 250); ctx.fillText('BAD DAYS', 1010, 260); ctx.fillText('MISSING YOU', 1660, 260); ctx.fillText('DISTANCE', 1950, 205);
  drawPlatforms(); drawSpikes(); drawEnemies(); drawHeartShards(); drawCheckpoints(); drawFinalGateAndBridge(); drawGoal(); drawPlayer();
  if (world.wind !== 0) {
    ctx.strokeStyle = 'rgba(230,212,225,.14)'; ctx.lineWidth = 1;
    for (let i = 0; i < 6; i++) { const y = 300 + i * 27 + Math.sin(frame * .05 + i) * 5; const x = 1690 + ((frame * 4 + i * 75) % 260); ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 34, y + 4); ctx.stroke(); }
  }
  ctx.restore();
}
function gameLoop() { updateGame(); drawGame(); animationFrame = requestAnimationFrame(gameLoop); }
resetGame();

// ---------- Cake candles ----------
const candles = [...document.querySelectorAll('.candle')];
const finalMessage = document.getElementById('finalMessage');
candles.forEach(candle => {
  candle.addEventListener('click', () => {
    candle.classList.add('out');
    burstAtElement(candle, 10);
    const allOut = candles.every(c => c.classList.contains('out'));
    if (allOut) {
      setTimeout(() => {
        finalMessage.classList.remove('hidden');
        finalMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 700);
    }
  });
});
