import TileResolver from './TileResolver.js';

export default class TileCollider {
  constructor(tileMatrix) {
    this.tiles = new TileResolver(tileMatrix);
  }

  checkY(entity) {
    const match = this.tiles.matchByPosition(entity.position.x, entity.position.y);

    if(!match) {
      return;
    }

    if(match.tile.name !== 'ground') {
      return;
    }

    if(entity.velocity.y > 0) {
      if(entity.position.y > match.y1) {
        entity.position.y = match.y1;
        entity.velocity.y = 0;
      }
    }

  }

  test(entity) {
    
    const match = this.tiles.matchByPosition(entity.position.x, entity.position.y);
    this.checkY(entity);
    if(match){
      console.log('Matched tile', match, match.tile);
    }
  }
}