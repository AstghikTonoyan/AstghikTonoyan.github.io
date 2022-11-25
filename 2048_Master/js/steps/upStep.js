import setTileStyle from '../setTileStyle.js';
import { isThereCurrentArrowStep, isReach2048 } from '../checkValues.js';
import { tileLiveValues } from '../liveValues.js';
import randomTile from '../random.js';
import { currentScore, bestScore } from '../score.js';

function upStepNull(){
    for(let j = 0; j < tileLiveValues.length; j++){
        for(let i = 1; i < tileLiveValues.length; i++){ // i = 1 -> exclude 1st row
            if(tileLiveValues[i][j] !== null && tileLiveValues[i-1][j] === null){
                let tileLive = document.getElementsByClassName(`tileLive${i}${j}`)[0];
                tileLive.classList.remove(`tileLive${i}${j}`);
                tileLive.classList.add(`tileLive${i-1}${j}`);
                tileLiveValues[i-1][j] = tileLiveValues[i][j];
                tileLiveValues[i][j] = null;
            } 
        }
    }
}

function upStepSum(){
    for(let j = 0; j < tileLiveValues.length; j++){
        for(let i = 1; i < tileLiveValues.length; i++){ // i = 1 -> exclude 1st row
            
            let currentValue = tileLiveValues[i][j],
                nextValue = tileLiveValues[i-1][j];

            if(currentValue !== null && nextValue !== null && currentValue === nextValue){
                
                let currentTileLive = document.getElementsByClassName(`tileLive${i}${j}`)[0];
                currentTileLive.classList.remove(`tileLive${i}${j}`);
                currentTileLive.classList.add(`tileLive_${i-1}${j}`);
                currentTileLive.style.zIndex = '10';

                let nextTileLive = document.getElementsByClassName(`tileLive${i-1}${j}`)[0];
                nextTileLive.style.zIndex = '20';

                let value = tileLiveValues[i-1][j] * 2;
                currentScore['value'] += value;
                document.getElementById('current-score-value').textContent = currentScore['value'];
                bestScore(currentScore['value']);
                setTileStyle(nextTileLive, value);
                tileLiveValues[i][j] = null;
                tileLiveValues[i-1][j] = value;
                upStepNull();

                setTimeout(()=>{
                    currentTileLive.remove();
                    nextTileLive.style.zIndex = '10';
                    nextTileLive.style.transform = 'scale(1.25)';
                    setTimeout(()=>{
                        nextTileLive.style.transform = 'scale(1)';
                    },100);
                },100);                    
            } 
        }
    }    
}

/*  tile appearing is possible when available at least one step(neighbour value is equal to it or equal to null) 
    or after any step which already have been completed */
    
export default function arrowUp(){
    let firstTime = true;
    if(firstTime){
        if(isThereCurrentArrowStep('up')){
            firstTime = false;
            for(let i = 0; i < tileLiveValues.length-1; i++){
                upStepNull();
            }
            upStepSum() ; 
            if(isReach2048()){
                setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) ;
            }
            setTimeout(()=>randomTile(),200) ;
        }
    } 
    else{
        for(let i = 0; i < tileLiveValues.length-1; i++){
            upStepNull();
        }
        upStepSum()  ;
        if(isReach2048()){
            setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) ;
        }
        if(isThereCurrentArrowStep('up')){
            setTimeout(()=>randomTile(),200) ;
        }        
    }
}