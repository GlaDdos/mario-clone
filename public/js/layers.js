

function createBackgroundLayer(level, sprites) {
  const buffer = document.createElement('canvas');
    buffer.width = 256;
    buffer.height = 240;

    const context = buffer.getContext('2d');

    level.tiles.grid.forEach( (col, x) => {
      col.forEach((tile, y) => {
        sprites.drawTile(tile.name, context, x, y)
      });
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

export { createBackgroundLayer, createSpriteLayer };