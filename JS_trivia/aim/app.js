let startBtn = document.querySelector('#start');

const screens = document.querySelectorAll('.screen');

const timeList = document.querySelector('#time-list');
const board = document.querySelector('#board');
const colors = ['#7E07A9','#67237F','#52026E','#AC3BD4','#B764D4',
'#D50065','#A02860','#8A0041','#EA3A8D','#EA69A6',
'#4212AF','#462B83','#270672','#7247D7','#8D6DD7'];

let time = 0;
let score = 0;

const timeEl = document.querySelector('#time');

startBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click',event=>{
    if (event.target.classList.contains('time-btn')){
        time = +event.target.getAttribute('data-time');
        screens[1].classList.add('up');

        startGame();
    }
})


function startGame(){
    setInterval(dectreaseTime,1000);
    createRandomCircle();
    setTime(time);
}

function dectreaseTime(){
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10){
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`;
}

function finishGame(){
    timeEl.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Счет: <span class ="primary">${score}</span></h1>`
}

function createRandomCircle(){
    const circle = document.createElement('div');
    circle.classList.add('circle');
    const size = getRandomNum(10,60);
    const {width,height} = board.getBoundingClientRect();
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    let x = getRandomNum(0,width-size);
    let y = getRandomNum(0,height-size);
    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;
    circle.style.backgroundColor = `${colors[Math.round(Math.random()*colors.length)]}`;
    board.append(circle);
}

function getRandomNum(min,max){
    return Math.round((Math.random()*(max-min)+min));
}

board.addEventListener('click',e=>{
    if(e.target.classList.contains('circle')){
        score++;
        e.target.remove();
        createRandomCircle();
    }
})