const slides = document.querySelectorAll('.slide');

function clearActiveClasses(){
    slides.forEach(item=>{
        item.classList.remove('active');
    });
}

slides.forEach((slide)=>{
    slide.addEventListener('click',()=>{
        clearActiveClasses();
        slide.classList.add('active');
    });
});