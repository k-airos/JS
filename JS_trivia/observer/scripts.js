
const getId = (link) => link.getAttribute('href').replace('#','');//Возвращает id секции/ссылку без решетки

const observer = new IntersectionObserver((entries) =>{
    entries.forEach((entry)=>{
        if (entry.isIntersecting){
            document.querySelectorAll('.nav-list__item-link').forEach((link) =>{
                link.classList.toggle('nav-list__item-link--active',
                getId(link) === entry.target.id); //У тогла 2 аргумент если true добавляет иначе убирает
            });
        }
    });
},
{
    threshold: 0.7,
});

document.querySelectorAll('.section').forEach(section => observer.observe(section));

document.querySelector('.nav-list').addEventListener("click", (event) =>{
    if (event.target.classList.contains('nav-list__item-link')){
        event.preventDefault();

        window.scrollTo({
            top: document.getElementById(getId(event.target)).offsetTop,
            behavior: 'smooth',
        });
    }
});