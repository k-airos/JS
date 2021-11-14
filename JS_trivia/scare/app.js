const levelOne = document.querySelector('.level-one');
const levelTwo = document.querySelector('.level-two');
const nextButton = document.querySelector('.next-button');
const uiLevel = document.querySelector('.ui-level'); 
const spookyPicture = document.querySelector('.spooky-picture');
const scream = document.querySelector('.scream');


let startFlag = false;
let pathFlag = false;
window.addEventListener("mousemove", (e) =>{
    let check = e.target.classList.value;
    console.log(check);
    // collisionCheck(check);
    if (check === "start") startFlag = true;
    if ( startFlag ){
        if (check === "path") pathFlag = true;
        if (pathFlag && check ==="start") pathFlag = false;
        if (check === "border" && pathFlag) alert("Проиграл, попробуй пожалуйста снова)))");
        if (!(check==="start" || check ==="path" || check ==="finish")) startFlag = false;
        if (pathFlag && check ==="finish") {
            nextButton.style.opacity =  1;
            nextButton.style.visibility = "visible";
        }
        if(pathFlag && check ==="end-game"){
            scream.play();
            scream.volume = 0.1;
            spookyPicture.style.display = 'block';
            document.body.style.background = "black";
        }
    }
});

nextButton.addEventListener('click', ()=>{
    levelOne.style.display = "none";
    levelTwo.style.display = "block";
    nextButton.style.visibility = "hidden";
    uiLevel.textContent = "Уровень 2";
 });
