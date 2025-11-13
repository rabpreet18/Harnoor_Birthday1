// YT globals
let player = null;
let playerReady = false;
let startClicked = false;

// Called by YouTube IFrame API when ready
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    height: "0",
    width: "0",
    videoId: "B-2BCSxnyHA", // main video ID
    playerVars: {
      autoplay: 0,
      controls: 0,
      start: 84, // start at 84s
      rel: 0
    },
    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady() {
  playerReady = true;
  if (startClicked) {
    playSongFromStart();
  }
}

function playSongFromStart() {
  if (!playerReady || !player || !player.playVideo) return;
  try {
    player.seekTo(84, true);
    player.playVideo();
  } catch (e) {
    console.error("Error playing video:", e);
  }
}

// DOM logic
document.addEventListener("DOMContentLoaded", () => {
  const overlay = document.getElementById("overlay");
  const scene = document.getElementById("scene");
  const startBtn = document.getElementById("start-btn");
  const blowBtn = document.getElementById("blow-btn");
  const cutBtn = document.getElementById("cut-btn");
  const replayBtn = document.getElementById("replay-btn");
  const cake = document.getElementById("cake");

  // Photo slideshow
  const photos = Array.from(document.querySelectorAll(".photo-frame .photo"));
  const dots = Array.from(document.querySelectorAll(".photo-dots .dot"));
  let currentPhoto = 0;
  let slideshowInterval = null;

  function showPhoto(index) {
    photos.forEach((p, i) => {
      p.classList.toggle("active", i === index);
    });
    dots.forEach((d, i) => {
      d.classList.toggle("active", i === index);
    });
  }

  function startSlideshow() {
    if (photos.length <= 1) return;
    showPhoto(currentPhoto);
    slideshowInterval = setInterval(() => {
      currentPhoto = (currentPhoto + 1) % photos.length;
      showPhoto(currentPhoto);
    }, 3500);
  }

  // Confetti
  function createConfetti() {
    const container = document.getElementById("confetti-container");
    const count = 160;
    for (let i = 0; i < count; i++) {
      const piece = document.createElement("div");
      piece.className = "confetti";
      piece.style.left = Math.random() * 100 + "vw";
      piece.style.animationDuration = 4 + Math.random() * 3 + "s";
      piece.style.animationDelay = Math.random() * 4 + "s";
      container.appendChild(piece);
    }
  }

  // Start celebration
  startBtn.addEventListener("click", () => {
    startClicked = true;
    overlay.classList.add("hidden");
    scene.classList.remove("hidden");

    createConfetti();
    startSlideshow();
    playSongFromStart();
  });

  // Blow out candles
  blowBtn.addEventListener("click", () => {
    if (cake.classList.contains("blown")) return;
    cake.classList.add("blown");
    // Enable cake cutting after a small delay
    setTimeout(() => {
      cutBtn.disabled = false;
    }, 800);
  });

  // Cut the cake
  cutBtn.addEventListener("click", () => {
    if (cutBtn.disabled) return;
    if (!cake.classList.contains("cut")) {
      cake.classList.add("cut");
    }
  });

  // Replay song
  replayBtn.addEventListener("click", () => {
    playSongFromStart();
  });
});
