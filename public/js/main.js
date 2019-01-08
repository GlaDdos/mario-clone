import { createMario } from './entities.js';
import { loadLevel } from './loaders.js';
import Timer from './Timer.js';
import KeyboardState from './KeyboardState.js'

const canvas = document.getElementById("screen");
const context = canvas.getContext("2d");

Promise.all([
  createMario(),
  loadLevel('1-1')
])
.then(([mario, level] ) => {
  
    const gravity = 2000;
    mario.position.set(64, 180);

    level.entities.add(mario);
    
    const SPACE = 32;
    const input = new KeyboardState();
    input.addMapping(SPACE, keyState => { 
      if(keyState) {
        console.log(mario.jump)
        mario.jump.start();
      } else {
        mario.jump.cancel();
      }
    });

    input.listenTo(window);

    const timer = new Timer();
    timer.update = function update(deltaTime) {
      level.update(deltaTime);
      level.comp.draw(context);
      mario.velocity.y += gravity * deltaTime;
    }

      timer.start();
});