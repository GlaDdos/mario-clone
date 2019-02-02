import Level from './Level.js';
import { createBackgroundLayer, createSpriteLayer } from './layers.js';
import SpriteSheet from './SpriteSheet.js';
import { createAnimation } from './animation.js';

function loadJSON(url) {
  return fetch(url)
  .then( r => r.json())
}


export function loadSpriteSheet(name) {
  return loadJSON(`./../sprites/${name}.json`)
    .then(sheetSpec => Promise.all([
      sheetSpec,
      loadImage(sheetSpec.imageUrl)
    ]))
    .then(([sheetSpec, image]) => {
      const sprites = new SpriteSheet(image, sheetSpec.tileWidth, sheetSpec.tileHeight);
      
      if(sheetSpec.tiles) {
        sheetSpec.tiles.forEach( tile => {
          sprites.defineTile(tile.name, ...tile.index)
        })
      }

      if(sheetSpec.frames) {
        sheetSpec.frames.forEach( frameSpec => {
          sprites.define( frameSpec.name, ...frameSpec.rect);
        })
      }

      if(sheetSpec.animations) {
        sheetSpec.animations.forEach( animationSpec => {
          const animation = createAnimation(animationSpec.frames, animationSpec.frameLength);
          sprites.defineAnimation(animationSpec.name, animation);
        })
      }

      return sprites;
    })
}

export function loadImage(url) {
  return new Promise(resolve => {
    const image = new Image();
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.src = url;
  });
}

export function loadLevel(name) {
  return loadJSON(`/levels/${name}.json`)
    .then(LevelSpec =>
      Promise.all([
        LevelSpec,
        loadSpriteSheet(LevelSpec.spriteSheet),
      ])
    )
  .then(([LevelSpec, backgroundSprites]) => {
    const level = new Level();

    createTiles(level, LevelSpec.backgrounds);

    const backgroundLayer = createBackgroundLayer(level, backgroundSprites);
    level.comp.layers.push(backgroundLayer);

    const spriteLayer = createSpriteLayer(level.entities);
    level.comp.layers.push(spriteLayer);

    return level;

  });
}

export function createTiles(level, backgrounds) {

  function applayRange(background, xStart, xLength, yStart, yLength) {
    const xEnd = xStart + xLength;
    const yEnd = yStart + yLength;

    for(let x = xStart; x < xEnd; x++) {
      for(let y = yStart; y < yEnd; y++) {
        level.tiles.set(x, y, {
          name: background.tile,
          type: background.type
        });
      }
    }
  }

  backgrounds.forEach( background => {
    background.ranges.forEach( range => {
      if( range.length === 4) {
        const [xStart, xLength, yStart, yLength] = range;
        applayRange(background, xStart, xLength, yStart, yLength);

      } else if( range.length === 3) {
        const [xStart, xLength, yStart] = range;
        applayRange(background, xStart, xLength, yStart, 1);

      } else if(range.length === 2) {
        const [xStart, yStart] = range;
        applayRange(background, xStart, 1, yStart, 1);

      }
    });
  });
}