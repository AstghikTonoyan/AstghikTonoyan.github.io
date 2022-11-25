import { tileLiveValues } from './liveValues.js';
import { gameState } from './gameState.js';

function isArrFull(){
    let arr = tileLiveValues;
    let counter = 0;
    for(let key in arr){
        for(let val of arr[key]){
            if(val !== null ){
                counter++;
            }
        }
    }
    if(counter === 16){
        return true;
    } else{
        return false;
    }
}

function fillArrWithCurrentValues(arr){
    for(let key in tileLiveValues){
        for(let nkey in tileLiveValues[key]){
            arr[key][nkey] = tileLiveValues[key][nkey];
        }
    }
    return arr;
}
function addFrameWithUndefinedValues(arr){
    arr.unshift([undefined,undefined,undefined,undefined]);
    arr.push([undefined,undefined,undefined,undefined]);
    for(let key in arr){
        arr[key].unshift(undefined);
        arr[key].push(undefined);
    }
    return arr  ; 
}

function isThereCurrentArrowStep(arrowType){
    let arrEmpty = [[],[],[],[]];
    let arr = addFrameWithUndefinedValues(fillArrWithCurrentValues(arrEmpty));
    let counterValues = 0,
        checkForStep = 0;

    for(let i = 1; i < arr.length-1; i++){
        for(let j = 1; j < arr.length-1; j++){
            if(arr[i][j] >= 2){
                counterValues++;
                if(arrowType === 'right'){
                    if(arr[i][j+1] !== undefined && arr[i][j+1] !== null && arr[i][j] !== arr[i][j+1]){
                        checkForStep++;
                    } 
                    if(arr[i][j+1] === undefined){
                        checkForStep++;
                    }
                }
                else if(arrowType === 'left'){
                    if(arr[i][j-1] !== undefined && arr[i][j-1] !== null && arr[i][j] !== arr[i][j-1]){
                        checkForStep++;
                    } 
                    if(arr[i][j-1] === undefined){
                        checkForStep++;
                    }
                }
                else if(arrowType === 'up'){
                    if(arr[i-1][j] !== undefined && arr[i-1][j] !== null && arr[i][j] !== arr[i-1][j]){
                        checkForStep++;
                    } 
                    if(arr[i-1][j] === undefined){
                        checkForStep++;
                    }
                }
                else if(arrowType === 'down'){
                    if(arr[i+1][j] !== undefined && arr[i+1][j] !== null && arr[i][j] !== arr[i+1][j]){
                        checkForStep++;
                    } 
                    if(arr[i+1][j] === undefined){
                        checkForStep++;
                    }
                }
            }
        }
    }
    if(checkForStep === counterValues){
        return false;
    } else{
        return true;
    }
}


function isThereAnyStep(){

    let arrEmpty = [[],[],[],[]];
    let arr = addFrameWithUndefinedValues(fillArrWithCurrentValues(arrEmpty));
    let counter = 0;

    for(let i = 1; i < arr.length-1; i++){
        for(let j = 1; j < arr.length-1; j++){
            if(
                arr[i][j] !== arr[i][j+1] &&
                arr[i][j] !== arr[i][j-1] &&
                arr[i][j] !== arr[i+1][j] &&
                arr[i][j] !== arr[i-1][j]
            ){
                counter++  ; 
            }
        }
    }
    if(counter !== 16){
        return true;
    } else{
        return false;
    }
}

function isReach2048(){
    if(gameState['boolContinue']){
        for(let key in tileLiveValues){
            for(let val of tileLiveValues[key]){
                if(val === 2048){
                    gameState['boolContinue'] = false;
                    gameState['bool'] = false;
                    return true;
                }
            }
        }
        return false;
    }
    return false;
}

export { isArrFull, isThereCurrentArrowStep, isThereAnyStep, isReach2048 };