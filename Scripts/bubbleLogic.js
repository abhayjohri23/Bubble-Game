let initTime = 60;
let initScore = Number(document.querySelector('#scoreVal').innerHTML);
let levelOfDiff = 10;
let target = parseInt(document.querySelector('#target').innerHTML);

function makeBubbles(){
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
            document.querySelector('#bottomPart').innerHTML = '<h1 class="endOfGame">GAME OVER</h1>';
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
    initScore += 10;
    document.querySelector('#scoreVal').innerHTML = initScore;
    console.log(`newScore: ${initScore}`);
}


makeBubbles();
callTimer();

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

