class Common{

    setColor(e){
        // if(typeof e)
        if(typeof e === "object"){
            if(e.dataset.value%128 === 2) e.style.backgroundColor = '#F44336';
            if(e.dataset.value%128 === 4) e.style.backgroundColor = '#7E07A9';
            if(e.dataset.value%128 === 8) e.style.backgroundColor = 'yellow';
            if(e.dataset.value%128 === 16) e.style.backgroundColor = '#67237F';
            if(e.dataset.value%128 === 32) e.style.backgroundColor = '#EA69A6';
            if(e.dataset.value%128 === 64) e.style.backgroundColor = '#270672';
            if(e.dataset.value%128 === 0) e.style.backgroundColor = '#8D6DD7';
        } else{
            document.querySelector('.game').style.backgroundColor = "black";
            document.querySelector('.header').style.color = "white";
        }

    }
}

export default Common;
