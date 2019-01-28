import { createMario } from './entities.js';
import { loadLevel } from './loaders.js';
import Timer from './Timer.js';
import {setupKeyboard} from './input.js';
import { createCollisionLayer } from './layers.js';

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([
  createMario(),
  loadLevel('1-1')
])
.then(([mario, level] ) => {
    mario.position.set(64, 180);

    level.entities.add(mario);

    //collision layer for debbuging only
    level.comp.layers.push(createCollisionLayer(level));
    
    const input = setupKeyboard(mario);

    input.listenTo(window);

    ['mousedown', 'mousemove'].forEach( eventName => {
      canvas.addEventListener(eventName, event => {
        if(event.buttons === 1) {
          mario.velocity.set(0,0);
          mario.position.set(event.offsetX, event.offsetY);
        }
      })
    })

    const timer = new Timer();
    timer.update = function update(deltaTime) {
      level.update(deltaTime);
      level.comp.draw(context);
    }

      timer.start();
});