import { newGame, continueGame } from './gameState.js';
import arrow from './keyboardEvent.js';

window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
});
document.querySelector('body').addEventListener('keydown',()=>arrow(event));
document.querySelector('#new-game').addEventListener('click',newGame);
document.querySelector('#game_over > div').addEventListener('click',newGame);
document.querySelector('#game_win_buttons > div:last-child').addEventListener('click',newGame);
document.querySelector('#game_win_buttons > div:first-child').addEventListener('click',continueGame);

setTimeout(()=>newGame());