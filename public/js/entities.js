import Entity from './Entity.js';
import { loadSpriteSheet } from './loaders.js';
import Jump from './traits/Jump.js';
import Go from './traits/Go.js';
import { createAnimation } from './animation.js';

const SLOW_DRAG = 1/1000;
const FAST_DRAG = 1/5000;

export function createMario() {
  return loadSpriteSheet('mario')
    .then( sprite => {
      const mario = new Entity();
      mario.size.set(14,16);

      mario.addTrait(new Go());
      mario.go.dragFactor = SLOW_DRAG;

      mario.addTrait(new Jump());

      mario.turbo = function setTurboState(turboOn) {
        this.go.dragFactor = turboOn ? FAST_DRAG : SLOW_DRAG;
      }

      const animation = createAnimation(['run-1', 'run-2', 'run-3'], 7);

      function routeFrame(mario) {
        if(mario.jump.falling) {
          return 'jump';
        }

        if(mario.go.distance > 0) {
          if(mario.velocity.x > 0 && mario.go.direction < 0 || mario.velocity.x < 0 && mario.go.direction > 0) {
            return 'break';
          }

          return animation(mario.go.distance);
        }

        return 'idle';
      }
    
      mario.draw = function drawMario(context) {
        sprite.draw(routeFrame(this), context, 0,0, mario.go.heading < 0);
      }
    
      return mario;
    })

}