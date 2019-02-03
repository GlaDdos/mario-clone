    import KeyboardState from './KeyboardState.js';

    export function setupKeyboard(mario) {

      const input = new KeyboardState();
      
      input.addMapping('KeyM', keyState => { 
        if(keyState) {
          mario.jump.start();
          console.dir(mario);
        } else {
          mario.jump.cancel();
        }
      });
      
      input.addMapping('KeyN', keyState => { 
       mario.turbo(keyState);
      });

      input.addMapping('KeyD', keyState => { 
        mario.go.direction += keyState ? 1 : -1;
      });
      
      input.addMapping('KeyA', keyState => { 
        mario.go.direction += keyState ? -1 : 1;
      });


    return input;
}