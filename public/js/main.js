import { loadLevel } from './loaders.js';
import { loadMarioSprite, loadBackgroundSprites} from './sprites.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

function drawBackground(background, context, sprites) {
  background.ranges.forEach( ([x1, x2, y1, y2]) => {
    for( let x = x1; x < x2; x++) {
      for( let y = y1; y < y2; y++) {
        sprites.drawTile(background.tile, context, x, y);
      }
    }
  });
}

Promise.all([
  loadMarioSprite(),
  loadBackgroundSprites(),
  loadLevel('1-1')
])
.then(([mario, sprites, level] ) => {
    level.backgrounds.forEach(background => {
      drawBackground(background, context, sprites);
    });

    mario.draw('idle', context, 64, 64);
})