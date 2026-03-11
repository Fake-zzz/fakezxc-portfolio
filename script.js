// ===== HERO BG VIDEO (YouTube) =====
// ▼ Troque pelo ID do seu vídeo do YouTube ▼
const HERO_BG_VIDEO_ID = 'klBS2gSbKws';

window.onYouTubeIframeAPIReady = function () {
  new YT.Player('heroBgVideo', {
    videoId: HERO_BG_VIDEO_ID,
    playerVars: {
      autoplay: 1, mute: 1, loop: 1,
      playlist: HERO_BG_VIDEO_ID,
      controls: 0, showinfo: 0, rel: 0,
      modestbranding: 1, iv_load_policy: 3,
      disablekb: 1, fs: 0, playsinline: 1,
    },
    events: { onReady: e => e.target.playVideo() }
  });
};
(function () {
  const s = document.createElement('script');
  s.src = 'https://www.youtube.com/iframe_api';
  document.head.appendChild(s);
})();

// ===== STATE =====
let lang = 'en';
let carouselIndex = 0;

let portfolioVideos = [
  {type:  'youtube', url: 'https://youtu.be/Um4WwpMpDdE', thumb: 'images/thumb3.png', section: 'portfolio'},
  { type: 'youtube', url: 'https://youtu.be/tYbc-T-UYng', section: 'portfolio' },
  { type: 'youtube', url: 'https://youtu.be/klBS2gSbKws', section: 'portfolio' },
  { type: 'youtube', url: "https://youtu.be/a-l-3gzOOFc", section: 'portfolio' },
  { type: 'youtube', url: "https://youtu.be/FA0yUfGr1do", thumb: "images/thumb4.png", section: 'portfolio' },
  { type: 'youtube', url: "https://youtu.be/x0dybZ18iuk", section: 'portfolio' },
];

let shortsVideos = [
  { type: 'youtube', url:"https://youtu.be/aa7j5OHIT1g", thumb: "images/srhthumb1.png", section: 'shorts' },
  { type: 'youtube', url: "https://youtu.be/8KG_obanoro", section: 'shorts' },
];

let channels = [
  { name: 'Delayed MC', url: 'https://www.youtube.com/@delayedmc', img: 'images/4SCbBkZ.png' },
  { name: 'SONBLACKS', url: 'https://www.youtube.com/@sonblacks', img: 'images/son.jpg' },
];

// ===== CURSOR =====
// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

function observeReveals() {
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

// ===== LANGUAGE =====
function toggleLang() {
  lang = lang === 'en' ? 'pt' : 'en';
  document.getElementById('langSwitch').classList.toggle('ptbr', lang === 'pt');
  document.getElementById('lang-label-en').style.color = lang === 'en' ? 'rgba(231,216,217,0.9)' : 'rgba(231,216,217,0.35)';
  document.getElementById('lang-label-pt').style.color = lang === 'pt' ? 'rgba(231,216,217,0.9)' : 'rgba(231,216,217,0.35)';
  applyLang();
}

function applyLang() {
  document.querySelectorAll('[data-en]').forEach(el => {
    el.textContent = lang === 'en' ? el.dataset.en : el.dataset.pt;
  });
}

// ===== VIDEO CARDS =====
function ytThumb(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : null;
}

function ytEmbedUrl(url) {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
}

function buildVideoCard(video, index, isShort) {
  const card = document.createElement('div');
  card.className = (isShort ? 'short-card' : 'video-card') + ' reveal';

  if (video.type === 'placeholder') {
    card.innerHTML = `
      <div class="video-placeholder">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="rgba(192,15,39,0.4)" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="4"/><polygon points="10 8 16 12 10 16 10 8" fill="rgba(192,15,39,0.4)" stroke="none"/></svg>
        <span style="font-size:11px;letter-spacing:0.15em;">YOUR VIDEO</span>
      </div>`;
  } else if (video.type === 'youtube') {
    const thumb = video.thumb || ytThumb(video.url);
    const embedUrl = ytEmbedUrl(video.url);
    card.innerHTML = `
      <img src="${thumb}" alt="video" loading="lazy">
      <div class="play-btn"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>`;
    card.addEventListener('click', () => openVideoModal(embedUrl, 'iframe'));
  } else if (video.type === 'mp4') {
    card.innerHTML = `
      <img src="${video.thumb}" alt="video" loading="lazy">
      <div class="play-btn"><svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg></div>`;
    card.addEventListener('click', () => openVideoModal(video.url, 'video'));
  }

  return card;
}

function renderMainGrid() {
  const grid = document.getElementById('mainGrid');
  grid.innerHTML = '';
  const items = portfolioVideos.slice(0, 6);
  items.forEach((v, i) => {
    const card = buildVideoCard(v, i, false);
    card.classList.add(`reveal-delay-${Math.min(i+1, 6)}`);
    grid.appendChild(card);
  });
  observeReveals();
}

function renderShortsGrid() {
  const grid = document.getElementById('shortsGrid');
  grid.innerHTML = '';
  const items = shortsVideos.slice(0, 3);
  items.forEach((v, i) => {
    const card = buildVideoCard(v, i, true);
    card.classList.add(`reveal-delay-${i+1}`);
    grid.appendChild(card);
  });
  observeReveals();
}

function renderModalGrid() {
  const grid = document.getElementById('modalGrid');
  grid.innerHTML = '';
  [...portfolioVideos, ...shortsVideos].forEach((v, i) => {
    if (v.type === 'placeholder') return;
    const card = buildVideoCard(v, i, v.section === 'shorts');
    card.style.aspectRatio = v.section === 'shorts' ? '9/16' : '16/9';
    grid.appendChild(card);
  });
  observeReveals();
}

// ===== CHANNELS =====
function renderChannels() {
  const track = document.getElementById('channelsTrack');
  track.innerHTML = '';
  channels.forEach(ch => {
    const a = document.createElement('a');
    a.className = 'channel-card';
    a.href = ch.url;
    a.target = '_blank';
    a.innerHTML = `
      <div class="channel-avatar">
        ${ch.img ? `<img src="${ch.img}" alt="${ch.name}">` : `<span>${ch.emoji}</span>`}
      </div>
      <span class="channel-name">${ch.name}</span>`;
    track.appendChild(a);
  });
}

let carouselOffset = 0;
function slideNext() {
  const wrap = document.querySelector('.channels-track-wrap');
  wrap.scrollBy({ left: 240, behavior: 'smooth' });
}
function slidePrev() {
  const wrap = document.querySelector('.channels-track-wrap');
  wrap.scrollBy({ left: -240, behavior: 'smooth' });
}

// ===== MODALS =====
function openModal() {
  renderModalGrid();
  document.getElementById('allProjectsModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('allProjectsModal').classList.remove('open');
  document.body.style.overflow = '';
}

function openVideoModal(src, type) {
  const frame = document.getElementById('videoModalFrame');
  if (type === 'iframe') {
    frame.innerHTML = `<iframe src="${src}" frameborder="0" allowfullscreen allow="autoplay"></iframe>`;
  } else {
    // Custom player — no download button, no right-click save
    frame.innerHTML = `
      <div id="customPlayer" style="position:relative;width:100%;height:100%;background:#000;border-radius:12px;overflow:hidden;user-select:none;">
        <video id="customVideo" src="${src}" style="width:100%;height:100%;display:block;" preload="metadata" oncontextmenu="return false;"></video>
        <div id="playerOverlay" style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;">
          <!-- click area to play/pause -->
          <div onclick="togglePlay()" style="position:absolute;inset:0;cursor:pointer;"></div>
          <!-- center play icon -->
          <div id="playPulse" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:64px;height:64px;background:rgba(192,15,39,0.85);border-radius:50%;display:flex;align-items:center;justify-content:center;pointer-events:none;opacity:0;transition:opacity 0.3s;">
            <svg id="playPulseIcon" width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21"/></svg>
          </div>
          <!-- controls bar -->
          <div style="position:relative;z-index:2;padding:12px 16px 16px;background:linear-gradient(to top,rgba(0,0,0,0.85),transparent);display:flex;flex-direction:column;gap:8px;">
            <!-- progress bar -->
            <div id="progressWrap" onclick="seekVideo(event)" style="height:4px;background:rgba(255,255,255,0.2);border-radius:4px;cursor:pointer;position:relative;">
              <div id="progressBar" style="height:100%;width:0%;background:var(--red);border-radius:4px;pointer-events:none;transition:width 0.1s linear;"></div>
            </div>
            <div style="display:flex;align-items:center;gap:12px;">
              <button onclick="togglePlay()" style="background:none;border:none;color:white;cursor:pointer;padding:4px;display:flex;align-items:center;">
                <svg id="playBtnIcon" width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21"/></svg>
              </button>
              <button onclick="toggleMute()" style="background:none;border:none;color:white;cursor:pointer;padding:4px;display:flex;align-items:center;">
                <svg id="muteIcon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>
              </button>
              <span id="timeDisplay" style="font-size:12px;color:rgba(255,255,255,0.7);font-family:Space Mono,monospace;margin-right:auto;">0:00 / 0:00</span>
              <button onclick="toggleFullscreen()" style="background:none;border:none;color:white;cursor:pointer;padding:4px;display:flex;align-items:center;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/><line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>`;

    const vid = document.getElementById('customVideo');
    vid.play();

    vid.addEventListener('timeupdate', () => {
      if (!vid.duration) return;
      const pct = (vid.currentTime / vid.duration) * 100;
      document.getElementById('progressBar').style.width = pct + '%';
      document.getElementById('timeDisplay').textContent = fmtTime(vid.currentTime) + ' / ' + fmtTime(vid.duration);
    });
    vid.addEventListener('play', () => {
      document.getElementById('playBtnIcon').innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
    });
    vid.addEventListener('pause', () => {
      document.getElementById('playBtnIcon').innerHTML = '<polygon points="5 3 19 12 5 21"/>';
    });
  }
  document.getElementById('videoModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function fmtTime(s) {
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return m + ':' + String(sec).padStart(2, '0');
}
function togglePlay() {
  const v = document.getElementById('customVideo'); if (!v) return;
  const pulse = document.getElementById('playPulse');
  const icon = document.getElementById('playPulseIcon');
  if (v.paused) {
    v.play();
    icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
  } else {
    v.pause();
    icon.innerHTML = '<polygon points="5 3 19 12 5 21"/>';
  }
  pulse.style.opacity = '1';
  setTimeout(() => { pulse.style.opacity = '0'; }, 500);
}
function toggleMute() {
  const v = document.getElementById('customVideo'); if (!v) return;
  v.muted = !v.muted;
  document.getElementById('muteIcon').style.opacity = v.muted ? '0.4' : '1';
}
function seekVideo(e) {
  const v = document.getElementById('customVideo'); if (!v) return;
  const wrap = document.getElementById('progressWrap');
  const rect = wrap.getBoundingClientRect();
  v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
}
function toggleFullscreen() {
  const p = document.getElementById('customPlayer'); if (!p) return;
  if (!document.fullscreenElement) p.requestFullscreen();
  else document.exitFullscreen();
}
function closeVideoModal() {
  document.getElementById('videoModal').classList.remove('open');
  document.getElementById('videoModalFrame').innerHTML = '';
  document.body.style.overflow = '';
}

document.getElementById('allProjectsModal').addEventListener('click', e => {
  if (e.target === document.getElementById('allProjectsModal')) closeModal();
});
document.getElementById('videoModal').addEventListener('click', e => {
  if (e.target === document.getElementById('videoModal')) closeVideoModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') { closeModal(); closeVideoModal(); }
});

// ===== ADD VIDEO FORM =====
function toggleAddForm() {
  document.getElementById('addVideoForm').classList.toggle('open');
}

function toggleVideoInputs() {
  const type = document.getElementById('videoType').value;
  document.getElementById('ytInputs').style.display = type === 'youtube' ? 'block' : 'none';
  document.getElementById('mp4Inputs').style.display = type === 'mp4' ? 'flex' : 'none';
}

async function addVideo() {
  const type = document.getElementById('videoType').value;
  const section = document.getElementById('videoSection').value;
  let video = { type, section };

  if (type === 'youtube') {
    const url = document.getElementById('ytUrl').value.trim();
    if (!url) return alert('Please enter a YouTube URL.');
    video.url = url;
  } else {
    const fileInput = document.getElementById('mp4File');
    const thumbInput = document.getElementById('mp4Thumb');
    if (!fileInput.files[0]) return alert('Please select a video file.');
    video.url = URL.createObjectURL(fileInput.files[0]);
    video.thumb = thumbInput.files[0] ? URL.createObjectURL(thumbInput.files[0]) : '';
  }

  if (section === 'portfolio') {
    const empty = portfolioVideos.findIndex(v => v.type === 'placeholder');
    if (empty !== -1) portfolioVideos[empty] = video;
    else portfolioVideos.push(video);
    renderMainGrid();
  } else {
    const empty = shortsVideos.findIndex(v => v.type === 'placeholder');
    if (empty !== -1) shortsVideos[empty] = video;
    else shortsVideos.push(video);
    renderShortsGrid();
  }

  document.getElementById('addVideoForm').classList.remove('open');
  document.getElementById('ytUrl').value = '';
}

// ===== AVATAR UPLOAD =====
// Avatar loaded from images/avatar.jpg

// ===== SCROLL ORBS =====
const orbs = document.querySelectorAll('.orb');
let scrollTimer = null;
let lastScrollY = window.scrollY;
let scrollVelocity = 0;

// Baseline opacity so orbs are always subtly visible
orbs.forEach((o, i) => { o.style.opacity = [0.45, 0.35, 0.3, 0.25][i]; });

window.addEventListener('scroll', () => {
  const currentY = window.scrollY;
  scrollVelocity = Math.abs(currentY - lastScrollY);
  lastScrollY = currentY;

  // Intensity based on scroll speed (capped)
  const intensity = Math.min(scrollVelocity / 30, 1);

  orbs.forEach((o, i) => {
    const baseOpacity = [0.45, 0.35, 0.3, 0.25][i];
    const boost = intensity * [0.5, 0.45, 0.4, 0.55][i];
    o.style.opacity = baseOpacity + boost;
    o.style.filter = `blur(${Math.max(40, 90 - intensity * 40)}px)`;
    o.style.transform = `translate(${Math.sin(currentY * 0.002 + i) * 20}px, ${Math.cos(currentY * 0.0015 + i) * 16}px) scale(${1 + intensity * 0.08})`;
  });

  // Fade back to baseline after scrolling stops
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    orbs.forEach((o, i) => {
      o.style.transition = 'opacity 1.4s ease, filter 1.4s ease, transform 1.8s ease';
      o.style.opacity = [0.45, 0.35, 0.3, 0.25][i];
      o.style.filter = 'blur(90px)';
    });
  }, 120);

  // ===== SCROLL BACKGROUND DARKENING =====
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = Math.min(currentY / maxScroll, 1);
  // Interpolate from #1C1B1B (28,27,27) to #000000 (0,0,0)
  const r = Math.round(28 * (1 - progress));
  const g = Math.round(27 * (1 - progress));
  const b = Math.round(27 * (1 - progress));
  document.body.style.backgroundColor = `rgb(${r},${g},${b})`;

  // ===== FOOTER GLOW — appears as user approaches bottom =====
  const glowThreshold = 0.72; // start appearing at 72% scroll
  const glowProgress = Math.max(0, (progress - glowThreshold) / (1 - glowThreshold));
  const glow = document.getElementById('footerGlow');
  glow.style.opacity = glowProgress;
  if (glowProgress > 0) glow.classList.add('visible');
  else glow.classList.remove('visible');

}, { passive: true });

// ===== INIT =====
renderMainGrid();
renderShortsGrid();
renderChannels();
observeReveals();
applyLang();

// Observe hero content too
setTimeout(() => {
  document.querySelectorAll('.hero-content > *').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.9s ease ${i * 0.18}s, transform 0.9s ease ${i * 0.18}s`;
    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 100 + i * 180);
  });
}, 200);
