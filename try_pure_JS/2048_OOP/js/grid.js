import number from './number.js';
import Common from './common.js';

class Grid extends Common {
    #size;
    field = document.querySelector('.field');
    cells = [];
    #play = false;
    directionRoots = {
        'UP': [],
        'RIGHT': [],
        'DOWN': [],
        'LEFT': []
    }
    getSize() {
        return this.#size;
    }
    setsize(value){
        if (value > 0) this.#size = value;
    }
    get playable(){
        return this.#play;
    }
    set playable(e){
        this.#play = e;
    }

    restart(){
        this.cells = [];
        this.directionRoots = {
            'UP': [],
            'RIGHT': [],
            'DOWN': [],
            'LEFT': []
        }
        document.querySelector('.game').style.backgroundColor = '#AAACA8';
        let numbers = document.getElementsByClassName('number');
        let cells = document.getElementsByClassName('cell');
        while(cells[0]) {
            cells[0].parentNode.removeChild(cells[0]);
        };
        while(numbers[0]) {
            numbers[0].parentNode.removeChild(numbers[0]);
        };
        this.init();
    }

    setDirectionRoots(){
        for(let i = 0; i<this.getSize()**2;i++){
            if(i<this.getSize()) this.directionRoots['UP'].push(i);
            if(i%this.getSize()===this.getSize()-1) this.directionRoots['RIGHT'].push(i);
            if(i>=this.getSize()*(this.getSize() - 1 )) this.directionRoots['DOWN'].push(i);
            if(i%this.getSize()===0) this.directionRoots['LEFT'].push(i);
        }
    }

    init() {
        this.playable = true;

        let element = document.createElement('div');
        element.classList.add('cell');

        this.setDirectionRoots();
        if(localStorage.getItem('best')) document.querySelector('#best').innerHTML = localStorage.getItem('best'); 
        for(let i = 0; i<this.getSize()**2; i++){
            let element = document.createElement('div');
            element.style.width = `calc(100%/${this.getSize()} - 1.5vmin)`;
            element.style.height = `calc(100%/${this.getSize()} - 1.5vmin)`;
            element.classList.add('cell');
            this.field.append(element);
            this.cells[i] ={
                element: element,
                number: null
            }
        }
        let cellsForBalance = document.querySelectorAll('.cell');
        let size = this.getSize();
        for(let i = 0; i< size**2;i++){
            this.cells[i].top = cellsForBalance[i].offsetTop;
            this.cells[i].left = cellsForBalance[i].offsetLeft;
        }
        this.gridTakePlace();

    }

    gridTakePlace(){
        const emptyCellIndex = this.randomEmptyCell();

        if(emptyCellIndex === false||this.playable===false) return false;

        let test = new number();

        let numberElement =  test.spawn();
        
        
        numberElement.style.top = `${this.cells[emptyCellIndex].top}px`;
        numberElement.style.left = `${this.cells[emptyCellIndex].left}px`;
        numberElement.style.width = `calc(100%/${this.getSize()} - 1.5vmin)`;
        numberElement.style.height = `calc(100%/${this.getSize()} - 1.5vmin)`;

        this.setColor(numberElement);

        

        this.cells[emptyCellIndex].number = test;
        this.field.append(numberElement);
        this.score();
        return true;
    }

    score(){
        let nums = document.querySelectorAll('.number');
        let sum = 0;
        nums.forEach(item=>{
            sum += +item.innerText;
        });
        let id = document.querySelector('#score');
        id.innerText = sum;
        if(sum>200){
            this.setColor(sum);
        }
    }


    randomEmptyCell(){
        let emptyCells = [];

        for(let i = 0; i< this.cells.length; i++){
            if( this.cells[i].number === null) emptyCells.push(i);
        }
        if (emptyCells.length===0) return false;
        return emptyCells[ Math.floor(Math.random() * emptyCells.length) ];
    }
    slide(direction) {
        if(!this.playable) return false;
        
        const roots = this.directionRoots[direction];

        let increment;
        if(direction==="DOWN") increment = -this.getSize();
        if(direction==="UP") increment = this.getSize();
        if(direction ==="RIGHT") increment = -1;
        if(direction ==="LEFT") increment = 1;

        for(let i = 0; i <this.getSize(); i++){// в каждой линии корня
            const root = roots[i];
            
            for(let j = 1; j<this.getSize(); j++){ // в каждой ячейке линии корня выше самого корня
                const cellIndex = root + (j*increment); 
                const cell = this.cells[cellIndex];

                if(cell.number !== null){
                    let moveToCell = null;

                    for (let k = j-1; k >= 0; k--) {
                        const foreCellIndex = root + (k * increment);
                        const foreCell = this.cells[foreCellIndex];

                        if(foreCell.number === null) {
                            // the cell is empty, move to and check next cell
                            moveToCell = foreCell;
                        } else if (cell.number.numberElement.dataset.value === foreCell.number.numberElement.dataset.value) {
                            // the cell has same number, move, merge and stop
                            moveToCell = foreCell;
                            break;
                        } else {
                            // next cell is not empty and not same with moving number(number is moving cell is not)
                            // number can't go further
                            break;
                        }
                    }

                    if(moveToCell !== null) {
                        cell.number.moveTo(cell, moveToCell);
                    }
                }
            }

        }
        this.playable = false;
        setTimeout(()=>{
            this.playable = true;
            if(this.gridTakePlace()) {
                this.playable = true;
            } else{
                this.playable = false;
                if(!localStorage.getItem('best')||localStorage.getItem('best')<document.querySelector('#score')){
                    localStorage.setItem('best', document.querySelector('#score').innerText);
                    document.querySelector('#best').innerText = localStorage.getItem('best');
                } 
                alert("GAME OVER!");
                this.restart();
                
            }
        }, 200)
    }
}


export default Grid;