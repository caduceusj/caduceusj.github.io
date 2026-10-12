/* JoãoOS XP — procedural pixel-art wallpapers (day / sunset / night / plain).
   Rendered once into a low-resolution canvas (scaled up with image-rendering:pixelated),
   so it costs no image bytes. Clouds drift on a separate stepped layer. */
(function () {
  'use strict';
  const JOS = (window.JOS = window.JOS || {});

  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
  const pack = (hex) => { const n = parseInt(hex.slice(1), 16); return (0xff000000 | ((n & 255) << 16) | (n & 0xff00) | ((n >> 16) & 255)) >>> 0; };
  function rng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

  const SCENES = {
    day: {
      sky: ['#1b5bd0', '#2a72e0', '#3b89ea', '#58a1f1', '#79b7f5', '#9acaf8', '#bcdcfa', '#d8ecfc', '#eef7fe'],
      far: ['#a9c9e6', '#98bcdf'], mid: ['#7ec36f', '#6fb862', '#62ab57', '#589d4f', '#4d9046'], near: ['#a6e36e', '#8ad45e', '#6fbf4d', '#5aa840', '#488e35', '#397430'],
      tuft: ['#c6f08c', '#3d7d31'], flowers: ['#ffffff', '#ffe36a', '#ff9ad0'], sun: null,
    },
    sunset: {
      sky: ['#241553', '#3d1f6d', '#6a2a84', '#9a3689', '#c8467f', '#e8625f', '#f78858', '#fdb15e', '#ffd985'],
      far: ['#8a4f8c', '#7b4585'], mid: ['#5c3d86', '#523580', '#48307a', '#3f2a70', '#372464'], near: ['#47507a', '#3b4670', '#303c63', '#273455', '#1f2b49', '#192340'],
      tuft: ['#6c78a8', '#1d2849'], flowers: ['#ffd36a', '#ff9b6a', '#ffffff'], sun: { color: '#fff1b0', ring: '#ffd36a', glow: '#ffb35e' },
    },
    night: {
      sky: ['#02050f', '#050b1f', '#0a1634', '#102248', '#182f5b', '#213d6c', '#2c4c7c', '#3a5c8b', '#4b6e98'],
      far: ['#183259', '#122a4d'], mid: ['#0f3a45', '#0d3541', '#0b303b', '#092b35', '#07262f'], near: ['#0e3d3a', '#0b3433', '#092c2c', '#072525', '#061f1f', '#041919'],
      tuft: ['#2b7d6e', '#04201f'], flowers: ['#c9d7ff', '#ffe9a0', '#ffffff'], moon: true, stars: true,
    },
  };

  function pickAuto() {
    const h = new Date().getHours();
    return h >= 6 && h < 17 ? 'day' : h < 19 && h >= 17 ? 'sunset' : 'night';
  }

  // Renders a scene into `canvas` at logical size w x h.
  function draw(canvas, kind, w, h) {
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (kind === 'plain') { ctx.fillStyle = '#3a6ea5'; ctx.fillRect(0, 0, w, h); return; }
    const S = SCENES[kind] || SCENES.day;
    const img = ctx.createImageData(w, h);
    const px = new Uint32Array(img.data.buffer);
    const rand = rng(kind === 'night' ? 7 : kind === 'sunset' ? 13 : 42);
    const sky = S.sky.map(pack), set = (x, y, c) => { if (x >= 0 && y >= 0 && x < w && y < h) px[y * w + x] = c; };
    const H0 = 0.56;

    // sky: banded gradient, ordered-dithered between bands
    const horizon = Math.round(h * (H0 + 0.02));
    for (let y = 0; y < h; y++) {
      const v = Math.min(1, y / horizon) * (sky.length - 1), i = Math.floor(v), f = v - i;
      for (let x = 0; x < w; x++) px[y * w + x] = f > BAYER[(y & 3) * 4 + (x & 3)] && i + 1 < sky.length ? sky[i + 1] : sky[Math.min(i, sky.length - 1)];
    }

    // stars / moon / sun
    if (S.stars) {
      const n = Math.round((w * h) / 220);
      for (let k = 0; k < n; k++) {
        const x = Math.floor(rand() * w), y = Math.floor(rand() * h * 0.5), c = pack(rand() > 0.82 ? '#ffffff' : '#9fb4e8');
        set(x, y, c);
        if (rand() > 0.93) { set(x - 1, y, c); set(x + 1, y, c); set(x, y - 1, c); set(x, y + 1, c); }
      }
    }
    if (S.moon) {
      const cx = Math.round(w * 0.8), cy = Math.round(h * 0.17), r = Math.max(8, Math.round(h * 0.07));
      for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
        if (x * x + y * y <= r * r && (x + r * 0.38) * (x + r * 0.38) + (y + r * 0.1) * (y + r * 0.1) > r * r * 0.78) set(cx + x, cy + y, pack('#f4f1d8'));
      }
    }
    if (S.sun) {
      const cx = Math.round(w * 0.62), cy = Math.round(h * 0.5), r = Math.max(8, Math.round(h * 0.075));
      for (let y = -r * 3; y <= 2; y++) for (let x = -r * 3; x <= r * 3; x++) {
        const d = Math.sqrt(x * x + y * y);
        if (d <= r) set(cx + x, cy + y, pack(d > r - 2 ? S.sun.ring : S.sun.color));
        else if (d <= r * 2.2 && BAYER[((cy + y) & 3) * 4 + ((cx + x) & 3)] > (d - r) / (r * 1.2)) set(cx + x, cy + y, pack(S.sun.glow));
      }
    }

    // hills: normalized curves so the composition holds on any size
    const layer = (fn, pal, band, dither) => {
      const colors = pal.map(pack);
      for (let x = 0; x < w; x++) {
        const top = Math.round(fn(x / w) * h);
        for (let y = Math.max(0, top); y < h; y++) {
          const d = (y - top) / band, i = Math.min(colors.length - 1, Math.floor(d)), f = d - Math.floor(d);
          px[y * w + x] = dither && i + 1 < colors.length && f > BAYER[(y & 3) * 4 + (x & 3)] ? colors[i + 1] : colors[i];
        }
      }
      return (u) => Math.round(fn(u) * h);
    };
    layer((u) => H0 - 0.02 - 0.012 * Math.sin(u * 9 + 1.3) - 0.008 * Math.sin(u * 21), S.far, h * 0.05, true);
    const midTop = layer((u) => H0 + 0.03 - 0.05 * Math.sin(3.2 * u - 0.3) - 0.014 * Math.sin(u * 13 + 2), S.mid, h * 0.07, true);
    const nearTop = layer((u) => H0 + 0.2 - 0.15 * Math.sin(3.0 * u + 0.671) - 0.02 * Math.sin(u * 10), S.near, h * 0.07, true);

    // grass tufts + flowers
    const tuft = S.tuft.map(pack), fl = S.flowers.map(pack);
    const tufts = Math.round(w * h / 90);
    for (let k = 0; k < tufts; k++) {
      const x = Math.floor(rand() * w), u = x / w, near = rand() > 0.35;
      const top = near ? nearTop(u) : midTop(u), y = top + 1 + Math.floor(rand() * (near ? h * 0.3 : h * 0.08));
      if (y >= h) continue;
      set(x, y, tuft[rand() > 0.5 ? 0 : 1]); if (rand() > 0.6) set(x + 1, y, tuft[0]);
    }
    const flowers = Math.round(w / 6);
    for (let k = 0; k < flowers; k++) {
      const x = 2 + Math.floor(rand() * (w - 4)), y = nearTop(x / w) + 3 + Math.floor(rand() * h * 0.22);
      if (y >= h - 1) continue;
      const c = fl[Math.floor(rand() * fl.length)]; set(x, y, c); if (rand() > 0.5) set(x + 1, y, c);
    }
    ctx.putImageData(img, 0, 0);
  }

  // Pixel clouds (drawn twice side by side so the CSS drift loops seamlessly)
  function drawClouds(canvas, kind, w, h) {
    canvas.width = w * 2; canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, h);
    if (kind === 'plain') return;
    const tint = { day: ['#ffffff', '#dcebfb'], sunset: ['#ffd6b0', '#e9a3a0'], night: ['#34497d', '#22345f'] }[kind] || ['#fff', '#dcebfb'];
    const rand = rng(99);
    const count = 6;
    for (let k = 0; k < count; k++) {
      const cw = Math.round(w * (0.1 + rand() * 0.1)), ch = Math.max(4, Math.round(cw * 0.22)), x = Math.round((k / count) * w + rand() * (w / count) * 0.5), y = Math.round(h * (0.06 + rand() * 0.28));
      for (const off of [0, w]) {
        // body: stacked rounded bars (pixel-art cloud silhouette), light top / shaded bottom
        const rows = [[0.22, 0.78], [0.1, 0.92], [0, 1], [0.05, 0.97]];
        rows.forEach((r, i) => {
          ctx.fillStyle = i === rows.length - 1 ? tint[1] : tint[0];
          const bx = x + off + Math.round(cw * r[0]), bw = Math.round(cw * (r[1] - r[0]));
          ctx.fillRect(bx, y + i * Math.round(ch / 3), bw, Math.max(1, Math.round(ch / 3)));
        });
        ctx.fillStyle = tint[0];
        ctx.fillRect(x + off + Math.round(cw * 0.3), y - Math.round(ch / 3), Math.round(cw * 0.3), Math.round(ch / 3));
      }
    }
  }

  const wp = {
    kinds: ['auto', 'day', 'sunset', 'night', 'plain'],
    current: () => JOS.store.get('wall', 'auto'),
    resolve: (k) => (k === 'auto' ? pickAuto() : k),
    draw, drawClouds,
    apply() {
      const cv = document.getElementById('wallpaper'), desk = document.getElementById('desktop');
      if (!cv || !desk) return;
      const W = desk.clientWidth, H = desk.clientHeight;
      const scale = JOS.clamp(Math.round(W / 340), 2, 6);
      const w = Math.ceil(W / scale), h = Math.ceil(H / scale);
      const kind = wp.resolve(wp.current());
      draw(cv, kind, w, h);
      cv.style.width = w * scale + 'px'; cv.style.height = h * scale + 'px';
      let cl = document.getElementById('clouds');
      if (!cl) { cl = document.createElement('canvas'); cl.id = 'clouds'; cl.setAttribute('aria-hidden', 'true'); cv.after(cl); }
      drawClouds(cl, kind, w, h);
      cl.style.width = (2 * w * scale) + 'px'; cl.style.height = (h * scale) + 'px';
      cl.style.animationDuration = Math.round(w * 0.55) + 's';
      cl.style.animationTimingFunction = 'steps(' + w + ')';
      cl.dataset.kind = kind;
      desk.dataset.wall = kind;
    },
  };
  JOS.wallpaper = wp;

  let rz = 0;
  window.addEventListener('resize', () => { clearTimeout(rz); rz = setTimeout(() => wp.apply(), 150); });
})();
