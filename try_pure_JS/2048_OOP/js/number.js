import Common from './common.js';

class Number extends Common{

    numberElement = null;

    spawn(){
        // const emptyCellIndex = grid.randomEmptyCell();

        // if(emptyCellIndex === false) return false;

        const numberElement = document.createElement('div');
        const numberValues = [2,4,8,16];
        let value = numberValues[ Math.floor(Math.random() * numberValues.length)];
        numberElement.innerText = value;
        numberElement.dataset.value = value;

        numberElement.classList.add("number");
        this.numberElement = numberElement;
        return numberElement;

    }

    moveTo(fromCell, toCell) {
        // const number = fromCell.number;
        const field = document.querySelector('.field'); 
        if(toCell.number === null) {
            // target cell is empty fill with number
            fromCell.number.numberElement.style.top = `${toCell.top}px`;
            fromCell.number.numberElement.style.left = `${toCell.left}px`;
            
            toCell.number = fromCell.number;
            fromCell.number = null;
        } else if (fromCell.number.numberElement.dataset.value === toCell.number.numberElement.dataset.value) {
            // target cell has same fromCell
            // merge both cell
            fromCell.number.numberElement.style.top = `${toCell.top}px`;
            fromCell.number.numberElement.style.left = `${toCell.left}px`;
            fromCell.number.numberElement.style.opacity = '0';
            // remove number DOM element after transition
            field.removeChild(fromCell.number.numberElement);
            


            // double target cell's number
            const newNumberValue = toCell.number.numberElement.dataset.value * 2;
            toCell.number.numberElement.dataset.value = newNumberValue;

            toCell.number.numberElement.innerText = newNumberValue;

            this.setColor(toCell.number.numberElement); //extended
            fromCell.number = null;
        }
    }
}
export default Number;
