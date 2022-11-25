import setTileStyle from '../setTileStyle.js';
import { isThereCurrentArrowStep, isReach2048 } from '../checkValues.js';
import { tileLiveValues } from '../liveValues.js';
import randomTile from '../random.js';
import { currentScore, bestScore } from '../score.js';

function rightStepNull(){
    for(let i = 0; i < tileLiveValues.length; i++){
        for(let j = tileLiveValues[i].length-2; j >= 0; j--){ // tileLiveValues.length-2 -> exclude 4 -th column
            if(tileLiveValues[i][j] !== null && tileLiveValues[i][j+1] === null){
                let tileLive = document.getElementsByClassName(`tileLive${i}${j}`)[0];
                tileLive.classList.remove(`tileLive${i}${j}`);
                tileLive.classList.add(`tileLive${i}${j+1}`);
                tileLiveValues[i][j+1] = tileLiveValues[i][j];
                tileLiveValues[i][j] = null;
            } 
        }
    }
}

function rightStepSum(){
    for(let i = 0; i < tileLiveValues.length; i++){
        for(let j = tileLiveValues[i].length-2; j >= 0; j--){ // tileLiveValues.length-2 -> exclude 4 -th column

            let currentValue = tileLiveValues[i][j],
                nextValue = tileLiveValues[i][j+1];

            if(currentValue !== null && nextValue !== null && currentValue === nextValue){
                
                let currentTileLive = document.getElementsByClassName(`tileLive${i}${j}`)[0];
                currentTileLive.classList.remove(`tileLive${i}${j}`);
                currentTileLive.classList.add(`tileLive_${i}${j+1}`);
                currentTileLive.style.zIndex = '10';

                let nextTileLive = document.getElementsByClassName(`tileLive${i}${j+1}`)[0];
                nextTileLive.style.zIndex = '20';

                let value = tileLiveValues[i][j+1] * 2;
                currentScore['value'] += value;
                document.getElementById('current-score-value').textContent = currentScore['value'];
                bestScore(currentScore['value']);
                setTileStyle(nextTileLive, value);
                tileLiveValues[i][j] = null;
                tileLiveValues[i][j+1] = value;
                rightStepNull();

                setTimeout(()=>{
                    currentTileLive.remove();
                    nextTileLive.style.zIndex = '10';
                    nextTileLive.style.transform = 'scale(1.25)';
                    setTimeout(()=>{
                        nextTileLive.style.transform = 'scale(1)';
                    },100);
                },100)  ;                  
            } 
        }
    }    
}

/*  tile appearing is possible when available at least one step(neighbour value is equal to it or equal to null) 
    or after any step which already have been completed */

export default function arrowRight(){ 
    let firstTime = true;
    if(firstTime){
        if(isThereCurrentArrowStep('right')){
            firstTime = false;
            for(let i = 0; i < tileLiveValues.length-1; i++){
                rightStepNull();
            }
            rightStepSum() ; 
            if(isReach2048()){
                setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) ;
            }
            setTimeout(()=>randomTile(),200) ;
        }
    } 
    else{
        for(let i = 0; i < tileLiveValues.length-1; i++){
            rightStepNull();
        }
        rightStepSum() ;
        if(isReach2048()){
            setTimeout(()=>document.getElementById('game_win').style.display = 'flex',200) ;
        }
        if(isThereCurrentArrowStep('right')){
            setTimeout(()=>randomTile(),200) ;
        }        
    }
}