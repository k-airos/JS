const container = document.querySelector('.container');
const colors = ['#7E07A9','#67237F','#52026E','#AC3BD4','#B764D4',
'#D50065','#A02860','#8A0041','#EA3A8D','#EA69A6',
'#4212AF','#462B83','#270672','#7247D7','#8D6DD7'];
const SQUARES_NUMBER = 1200;

for(let i = 0; i<SQUARES_NUMBER;i++){
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover',()=> setColor(square));
    square.addEventListener('mouseleave',()=>removeColor(square));

    container.append(square);
}
function removeColor(element){
    element.style.background = "#1d1d1d";
    element.style.boxShadow = `0 0 2px black`;

}
function setColor(element){
    color = getRandomColor();
    element.style.background = color;
    element.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;
}
function getRandomColor(){
    let index = Math.floor(Math.random()*colors.length);
    return colors[index];
}