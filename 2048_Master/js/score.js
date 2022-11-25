let currentScore = {
    value:0
}

function bestScore(currentScore){
    let bestElement = document.getElementById('best-score-value');
    let firstTime = true;
    if(typeof(Storage) !== "undefined"){
        if(localStorage.bestScoreValue){
            if(localStorage.bestScoreValue < currentScore){
                localStorage.bestScoreValue = currentScore;
                bestElement.textContent = localStorage.bestScoreValue;
            } else{
                bestElement.textContent = localStorage.bestScoreValue;
            }
        } else{
            localStorage.bestScoreValue = currentScore
            bestElement.textContent = localStorage.bestScoreValue;
        }
    } else{
        if(firstTime){
            firstTime = false;
            alert("Sorry, your browser does not support web storage and your best score is not saved after page refresh")
        }
        bestElement.textContent = currentScore;
    }
}

export { currentScore, bestScore };