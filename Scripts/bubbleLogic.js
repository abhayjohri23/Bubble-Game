let initTime = 120, levelOfDiff = 10, negatives = 0;
let initScore = parseInt(document.querySelector('#scoreVal').innerHTML);
let target = parseInt(document.querySelector('#target').innerHTML);
let lastScore = parseInt(document.querySelector('#scoreVal').innerHTML);
const immedParent = document.querySelector('#bottomPart');

String.prototype.equals = function(text){
    const myText = this;
    console.log(myText);
    if(myText.length != text.length)            return false;
    for(let i=0;i<myText.length;++i){
        if(myText.charAt(i) != text.charAt(i))  return false;
    }

    return true;
}

function makeBubbles(){
    getNewTarget();
    let clutter = ``;
    for(let i=1;i<=160;++i){
        clutter += `<div class="bubble">${Math.floor(Math.random()*10)}</div>`;
    }

    document.querySelector('#bottomPart').innerHTML = clutter;
}

function callTimer(){
    const timerPlace = document.querySelector('#timer');
    var timerID = setInterval(function(){
        if(initTime > 0){
            --initTime;
            timerPlace.innerHTML = initTime;
        }
        else{
            let currentScore = parseInt(document.querySelector('#scoreVal').innerHTML);
            document.querySelector('#bottomPart').innerHTML =`<div class="gameOptions">
            <h1 class="endOfGame">GAME OVER</h1>
            <h2>You scored ${lastScore > currentScore ? "great" : "less"} this time!</h2>
            <button class="again" onclick="">Play Again</button>
            </div>`;
            clearInterval(timerID);
            lastScore = currentScore;
        }
    },1000);
}

function getNewTarget(){
    target = Math.floor(Math.random()*levelOfDiff);
    document.querySelector('#target').innerHTML = target;
    console.log(`new target: ${target}`);
}

function increaseScore(){
    initScore += 10;
    document.querySelector('#scoreVal').innerHTML = initScore;
}

function decreaseScore(){
    initScore -= negatives;
    document.querySelector('#scoreVal').innerHTML = initScore;
}


/*Event Bubbling used. Event triggered on pressing the bubble on the screen triggers the event listener of the parent 
if the venet listener for the component is not available.
*/

immedParent.addEventListener('click',function(event){
    if(event.target.className === 'bubble'){
        if(parseInt(event.target.textContent) === target){
            increaseScore();
            getNewTarget();
            makeBubbles();
        }
        else{
            decreaseScore();
        }
    }
});

function startGame(levelOfDifficulty){
    console.log(levelOfDifficulty.equals('Hard'))
    if(levelOfDifficulty.equals('Hard')){
        levelOfDiff = 20;
        initTime = 60;
        negatives = -5;
    }
    else if(levelOfDifficulty.equals('Medium')){        
        levelOfDiff = 15;
        initTime = 90;
    }
    else{
        levelOfDiff = 10;
        initTime = 120;
    }                                    
    document.querySelector('#timer').innerHTML = initTime;
    document.querySelector('#startPanel').style.visibility = 'hidden';
    document.querySelector('#gamePanel').style.visibility = 'visible';
    document.querySelector('#topImage').style.visibility = 'visible';
    makeBubbles();
    callTimer();
}

