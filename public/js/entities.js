import Entity from './Entity.js';
import { loadMarioSprite } from './sprites.js';

export function createMario() {
  return loadMarioSprite()
    .then( sprite => {
      const mario = new Entity();
    
      mario.draw = function drawMario(context) {
        sprite.draw('idle', context, this.position.x, this.position.y);
      }
    
      mario.update = function updateMario(deltaTime) {
        this.position.x += (this.velocity.x * deltaTime);
        this.position.y += (this.velocity.y * deltaTime);
      }
    
      return mario;
    })

}