const upBtn = document.querySelector('.up-button');
const downBtn = document.querySelector('.down-button');
const sideBar = document.querySelector('.sidebar');
const mainSlide = document.querySelector('.main-slide');
const container = document.querySelector('.container');
let slidesCount = mainSlide.querySelectorAll('div').length;
console.log(slidesCount);
sideBar.style.top = `-${(slidesCount-1) * 100}vh`;

let slideIndex = 0;

upBtn.addEventListener('click', ()=>{
    changeSlide('up');
});

downBtn.addEventListener('click', ()=>{
    changeSlide('down');
});

function changeSlide(direction){
    if (direction === 'up'){
        slideIndex++;
        if(slideIndex===slidesCount){
            slideIndex = 0;
        }
    }
    else if (direction === 'down') {
        slideIndex--;
        if(slideIndex<0){
            slideIndex = slidesCount - 1;
        }
    }

    const height = container.clientHeight;

    mainSlide.style.transform = `translateY(-${slideIndex*height}px)`;
    sideBar.style.transform = `translateY(${slideIndex*height}px)`;
}

window.addEventListener('resize',()=>{
    changeSlide('just_a_str');
});