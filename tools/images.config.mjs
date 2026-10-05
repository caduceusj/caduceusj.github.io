// Source images (in assets/) -> optimized WebP set in assets/img/.
//   id      project id used in data.js
//   src     cover image file inside assets/
//   shots   extra screenshots for the project's gallery
//   pixel   true = tiny native pixel-art: kept lossless, never resampled, shown with
//           image-rendering: pixelated
//   compose transparent logos are centered on a solid canvas ({ bg, pad })
// After editing, run `npm run build:images` (needs `npm i` once).
export const projects = [
  { id: 'almas', src: 'As_almas_da_floresta.png', compose: { bg: '#f4edd8', pad: 0.1 } },
  { id: 'gargantua', src: 'Gargantua2.png', shots: ['Gargantua.png'] },
  { id: 'dodgeboy', src: 'DodgeBoy.png', pixel: true },
  { id: 'fofoca', src: 'fofocaLogo.png' },
  { id: 'elph', src: 'elph.png' },
  { id: 'malleusgame', src: 'malleusmale.png' },
  { id: 'baroneza', src: 'Baroneza_arte_grande_01.png', shots: ['Arte_grande_02.png'], pixel: true },
  { id: 'bastille', src: 'Breaking Bastille.png', compose: { bg: '#f4edd8', pad: 0.08 } },
  { id: 'cropfi', src: 'Cropfi.png', pixel: true },
  { id: 'jamsession', src: 'JamSession.png' },
  { id: 'awa', src: 'AwA Banner.png', compose: { bg: '#e9dfc4', pad: 0.04 } },
  { id: 'conserto', src: 'Ar condicionado timido.jpg', pixel: true },
  { id: 'quentura', src: 'QuenturaMenu2.png' },
  { id: 'nolegs', src: 'I have no legs.png' },
  { id: 'supervisor', src: 'Supervisor2.png', shots: ['FreeFishScreenShot.png', 'Tutorial ScreenShot.png', 'SelectStolenAsstes.png'] },
  { id: 'picc', src: 'piccBaby.jpg' },
  { id: 'separatio', src: 'VRGameGodot.png', shots: ['Separatio.png'] },
  { id: 'handtracking', src: 'FingerCounting.png' },
  { id: 'songs', src: 'MySongs(hobby).png' },
];

export const sizes = { thumb: 400, large: 1100, shotThumb: 200 };

// Portrait used by the Welcome / Resume windows + pixel portraits for login / desktop icon.
export const portrait = {
  src: 'Eu.jpg',
  crop: { left: 20, top: 40, width: 2000, height: 2000 }, // square around the face (upright image)
};
export const pixelPortraits = [
  { out: 'me-24.png', src: 'Eu.jpg', crop: portrait.crop, size: 24, colors: 32, brightness: 1.15 },
  { out: 'me-32.png', src: 'Eu.jpg', crop: portrait.crop, size: 32, colors: 40, brightness: 1.15 },
  { out: 'malleus-24.png', src: 'malleusmale.png', crop: { left: 521, top: 60, width: 430, height: 430 }, size: 24, colors: 24, bg: '#6d0d2a' },
];
