import { loadLevel } from './loaders.js';
import { loadBackgroundSprites} from './sprites.js';
import Compositor  from './Compositor.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { createMario } from './entities.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");



Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1')
])
.then(([mario, backgroundSprites, level] ) => {
    const comp = new Compositor();
    const gravity = 0.5;

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    //comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    function update() {
      comp.draw(context);
      mario.velocity.y += gravity;
      mario.update();

      requestAnimationFrame(update);
    }

    update();
});