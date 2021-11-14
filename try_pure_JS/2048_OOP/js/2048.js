import Grid from "./grid.js";

let grid;
document.querySelector('input').addEventListener('keydown',(e)=>{
    if(e.keyCode === 13){
        if(!isNaN(+document.querySelector('input').value)&&+document.querySelector('input').value>0&&+document.querySelector('input').value<15){
            document.querySelector('.modal').classList.add('hide');
            grid = new Grid(); 
            grid.setsize(+document.querySelector('input').value);

            grid.init();
            document.querySelector('input').remove();
        } else{
            document.querySelector('input').value = "Введите корректное значение";
        }
    }
});

window.addEventListener('resize',()=>{
    if(grid){
        let cellsForBalance = document.querySelectorAll('.cell');
        for(let i =0; i<grid.cells.length; i++){
            grid.cells[i].top = cellsForBalance[i].offsetTop;
            grid.cells[i].left = cellsForBalance[i].offsetLeft;
            if(grid.cells[i].number){
                    grid.cells[i].number.numberElement.style.top = `${grid.cells[i].top}px`;
                    grid.cells[i].number.numberElement.style.left = `${grid.cells[i].left}px`;
            }
        }
    }
});





 

document.addEventListener("keyup", function(e) {
    let direction = null;

    if(e.keyCode === 38) {
        direction = "UP";
    } else if(e.keyCode === 39) {
        direction = "RIGHT";
    } else if(e.keyCode === 40) {
        direction = "DOWN";
    } else if(e.keyCode === 37) {
        direction = "LEFT";
    }

    if(direction !== null) {
        grid.slide(direction);
    }

    return false;
});