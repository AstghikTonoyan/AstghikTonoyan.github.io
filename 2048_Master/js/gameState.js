import randomTile from './random.js';
import { tileLiveValues } from './liveValues.js';
import { currentScore, bestScore } from './score.js';

let gameState = {
    bool: true,
    boolContinue: true
}

function removeLiveTiles(){
    let liveTiles = document.getElementsByClassName('tileLive');
    for(let i = liveTiles.length-1; i >= 0; i--){
        liveTiles[i].remove();
    }    
}

function removeLiveValues(){
    for(let key in tileLiveValues){
        for(let nkey in tileLiveValues[key]){
            tileLiveValues[key][nkey] = null;
        }
    }    
}

function removeCurrentScore(){
    currentScore['value'] = 0;
    document.getElementById('current-score-value').textContent = currentScore['value'];
}

function hideGameMessages(){
    document.getElementById('game_over').style.display = 'none';
    gameState['bool'] = true;
    gameState['boolContinue'] = true;
    document.getElementById('game_win').style.display = 'none'    ;
}

function newGame(){
    removeLiveTiles();
    removeLiveValues();
    hideGameMessages();
    removeCurrentScore();
    bestScore(currentScore['value']);
    randomTile();
    randomTile();
}

function continueGame(){
    document.getElementById('game_win').style.display = 'none';
    gameState['bool'] = true;
}

export { gameState, newGame, continueGame };