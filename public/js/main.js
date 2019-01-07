import Compositor from './Compositor.js';
import { createMario } from './entities.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import { loadLevel } from './loaders.js';
import { loadBackgroundSprites } from './sprites.js';
import Timer from './Timer.js';
import KeyboardState from './KeyboardState.js'

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

const input = new KeyboardState();
input.addMapping(32, keyState => {
  console.log(keyState);
});

input.listenTo(window);

Promise.all([
  createMario(),
  loadBackgroundSprites(),
  loadLevel('1-1')
])
.then(([mario, backgroundSprites, level] ) => {
    const comp = new Compositor();
    
    const gravity = 2000;

    const timer = new Timer();

    mario.position.set(64, 180);
    mario.velocity.set(200, -600)

    const backgroundLayer = createBackgroundLayer(level.backgrounds, backgroundSprites);
    comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(mario);
    comp.layers.push(spriteLayer);

    timer.update = function update(deltaTime) {
      mario.velocity.y += gravity * deltaTime;
      mario.update(deltaTime);
      comp.draw(context);
    }

      timer.start();
});