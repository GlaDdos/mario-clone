import {Trait} from './../Entity.js';

export class Velocity extends Trait {
  constructor() {
    super('vel');
  }

  update(entity, deltaTime) {
      entity.position.x += (entity.velocity.x * deltaTime);
      entity.position.y += (entity.velocity.y * deltaTime);
    }
}