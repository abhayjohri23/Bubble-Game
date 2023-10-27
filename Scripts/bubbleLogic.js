let clutter = ``;

for(let i=1;i<=160;++i){
    clutter += `<div class="bubble">${Math.floor(Math.random()*10)}</div>`;
    document.querySelector('#bottomPart').innerHTML = clutter;
}