import { loadLevel } from './loaders.js';
import { loadBackgroundSprites} from './sprites.js';
import Compositor  from './Compositor.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { createMario } from './entities.js';
import Timer from './Timer.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");



Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1')
])
.then(([mario, backgroundSprites, level] ) => {
    const comp = new Compositor();
    
    const gravity = 30;

    const timer = new Timer();

    mario.position.set(64, 180);
    mario.velocity.set(200, -600)

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    timer.update = function update(deltaTime) {
        comp.draw(context);
        mario.velocity.y += gravity;
        mario.update(deltaTime);
      }

      timer.start();
    }
);