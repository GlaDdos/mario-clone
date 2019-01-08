import Entity from './Entity.js';
import { loadMarioSprite } from './sprites.js';
import { Velocity } from './traits/Velocity.js';
import Jump from './traits/Jump.js';

export function createMario() {
  return loadMarioSprite()
    .then( sprite => {
      const mario = new Entity();

      mario.addTrait(new Jump());
      mario.addTrait(new Velocity());
    
      mario.draw = function drawMario(context) {
        sprite.draw('idle', context, this.position.x, this.position.y);
      }
    
      return mario;
    })

}