

function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    const context = buffer.getContext('2d');

    level.tiles.forEach((tile, x, y) => {
      sprites.drawTile(tile.name, context, x, y);
    });


    return function drawBackgroundLayer(context) {
      context.drawImage(buffer, 0, 0);
    }
}

function createSpriteLayer(entities) {
  return function drawSpriteLayer(context) {
    entities.forEach( entity => {
      entity.draw(context)
    })
  };
}

function createCollisionLayer(level) {
  const resolvedTiles = [];

  const tileResolver = level.tileCollider.tiles;
  const tileSize = tileResolver.tileSize;

  const getByIndexOriginal = tileResolver.getByIndex;
  
  tileResolver.getByIndex = function getByIndexFake(x, y) {
    resolvedTiles.push({x,y});
    return getByIndexOriginal.call(tileResolver, x, y);
  }

  return function drawCollision(context) {
    context.strokeStyle = 'blue';

    resolvedTiles.forEach(({x, y}) => {
      context.beginPath();
      context.rect(x * tileSize, y * tileSize, tileSize, tileSize);
      context.stroke();
      //console.log('draw ' + x + y);
    });

    context.strokeStyle = 'red';
    level.entities.forEach( entity => {
      context.beginPath();
      context.rect(entity.position.x, entity.position.y, entity.size.x, entity.size.y);
      context.stroke();
    })

    resolvedTiles.length = 0;
  }
}

export { createBackgroundLayer, createSpriteLayer, createCollisionLayer };