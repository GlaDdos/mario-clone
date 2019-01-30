import { createMario } from './entities.js';
import { loadLevel } from './loaders.js';
import Timer from './Timer.js';
import {setupKeyboard} from './input.js';
import { createCollisionLayer, createCameraLayer } from './layers.js';
import Camera from './Camera.js';
import {setupMouseControl} from './debug.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([
  createMario(),
  loadLevel('1-1')
])
.then(([mario, level] ) => {
    const camera = new Camera();

    mario.position.set(64, 180);

    level.entities.add(mario);

    //collision layer for debbuging only
    level.comp.layers.push(
      createCollisionLayer(level),
      createCameraLayer(camera)
    );
    
    const input = setupKeyboard(mario);

    input.listenTo(window);

    setupMouseControl(canvas, mario, camera);

    const timer = new Timer();
    timer.update = function update(deltaTime) {
      level.update(deltaTime);
      level.comp.draw(context, camera);
    }

      timer.start();
});