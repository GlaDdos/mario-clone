import {Trait} from './../Entity.js';

export default class Go extends Trait {
  constructor() {
    super('go');

    this.direction = 0;
    this.speed = 3000;
    
  }

  update(entity, deltaTime) {
    entity.velocity.x = this.speed * this.direction * deltaTime;    
  }
}