let initTime = 120;
let initScore = Number(document.querySelector('#scoreVal').innerHTML);
let levelOfDiff = 10;
let target = parseInt(document.querySelector('#target').innerHTML);
let negatives = 0;

String.prototype.equals = function(text){
    const myText = this.toString;
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
            document.querySelector('#bottomPart').innerHTML =`<div class="gameOptions">
            <h1 class="endOfGame">GAME OVER</h1>
            <button class="again" onclick="">Play Again</button>
            </div>`;
            clearInterval(timerID);
        }
    },1000);
}

function getNewTarget(){
    target = Math.floor(Math.random()*levelOfDiff);
    document.querySelector('#target').innerHTML = target;
    console.log(`new target: ${target}`);
}

function increaseScore(){
    initScore += (10 - negatives);
    document.querySelector('#scoreVal').innerHTML = initScore;
    console.log(`newScore: ${initScore}`);
}


/*Event Bubbling used. Event triggered on pressing the bubble on the screen triggers the event listener of the parent 
if the venet listener for the component is not available.
*/
const immedParent = document.querySelector('#bottomPart');
immedParent.addEventListener('click',function(event){
    if(event.target.className === 'bubble'){
        if(parseInt(event.target.textContent) === target){
            increaseScore();
            getNewTarget();
            makeBubbles();
        }
    }
});

function startGame(levelOfDifficulty){
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

    document.querySelector('#startPanel').style.visibility = 'hidden';
    document.querySelector('#gamePanel').style.visibility = 'visible';

    makeBubbles();
    callTimer();
}

