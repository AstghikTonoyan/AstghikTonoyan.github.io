import setTileStyle from './setTileStyle.js';
import { tileLiveValues } from './liveValues.js';
import { isArrFull } from './checkValues.js';

function random2or4(){
    return Math.floor(Math.random() * 10) === 4 ? 4 : 2;
}

function random1to4(){
    return String(Math.floor(Math.random() * 4));
}

function randomCoordinates(){
    let x = random1to4(),
        y = random1to4();
    let bool = isArrFull();

    if(!bool){
        if(tileLiveValues[x][y] === null){
            return x + y;
        } else{
            return randomCoordinates();
        }
    } else{
        return undefined;
    }
}

export default function randomTile(){
    let boardLive = document.getElementById('boardLive'),
        tileLive = document.createElement('div');
        tileLive.classList.add('tileLive');
    let value = random2or4();

    setTileStyle(tileLive, value);

    let ranCoord = randomCoordinates();

    if(ranCoord !== undefined){
        tileLive.classList.add(`tileLive${ranCoord}`);
        tileLiveValues[ranCoord[0]][ranCoord[1]] = value;
        boardLive.append(tileLive);
    }
}