import Entity from './Entity.js';
import { loadMarioSprite } from './sprites.js';

export function createMario() {
  return loadMarioSprite()
    .then( sprite => {
      const mario = new Entity();

      mario.position.set(64, 180);
      mario.velocity.set(2, -10)
    
      mario.draw = function drawMario(context) {
        sprite.draw('idle', context, this.position.x, this.position.y);
      }
    
      mario.update = function updateMario() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
      }
    
      return mario;
    })

}