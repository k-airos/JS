let addBtn = document.querySelector('.addTask__plus');
let mainBlockWrapper = document.querySelector('.mainBlock__wrapper');
let find = document.querySelector('#find');

function checkOverflow(){
    if (document.querySelector('.mainBlock').offsetHeight < document.querySelector('.mainBlock__wrapper').offsetHeight){
        btn = document.createElement('div');
        btn.classList.add('.further');
        document.querySelector('.field').append(btn);
        document.querySelector('.further').style.opacity = "1";
    }
    else{
        if(document.querySelector('.further')) document.querySelector('.further').style.opacity = "0";
    }
}

document.querySelector('.further').addEventListener('click',()=>{
    document.querySelector('.mainBlock').classList.toggle('showAll');
    if(document.querySelector('.further').innerText ==="Скрыть") document.querySelector('.further').innerText = 'Далее';
    else document.querySelector('.further').innerText = 'Скрыть';

});

function addTask(i){
    let block = document.createElement('div');
    block.classList.add('block');
    if(typeof i === "function"){
        block.innerHTML = `
            <i class="block__text">${i()}</i>
            <div class="block__minus"></div>
        `;
    } else{
        block.innerHTML = `
        <i class="block__text">${i}</i>
        <div class="block__minus"></div>
    `;
    }
    mainBlockWrapper.append(block);
    setTimeout(fade,500);
    checkOverflow();

}


document.addEventListener('DOMContentLoaded',()=>{
    if(localStorage.getItem('blocks')){
        arr = localStorage.getItem('blocks').split(',');
        arr.forEach(i=>{
            addTask(i);
        });

    }
});

function checkInputText(){
    let value = document.querySelector('.addTask__input').value;
    if(value){
        document.querySelector('.addTask__input').style.border = 'none';
        return value;
    }
    else {
        input = document.querySelector('.addTask__input');
        input.style.border = "1px solid red";
        input.placeholder = "Введите что-нибудь";
    }
    document.querySelector('.addTask__input').value = '';
}
find.addEventListener('input',()=>{
    let blocks = document.querySelectorAll('.block');
    if(find.value){
        blocks.forEach(item=>{
            if(!item.innerText.toLowerCase().startsWith(find.value.toLowerCase())&&!item.classList.contains('addTask')){
                item.style.display = 'none';
            }
            else{
                item.style.display = 'flex';
            }
        })
    } else{
        blocks.forEach(item=>{
            item.style.display = 'flex';
        });
    }
})



function fade(){
    document.querySelectorAll('.block').forEach(item=>{
        item.style.opacity = "1";
    })
}

function saveChanges(blocks){
    let blocksArr = [];
    blocks.forEach(i=>blocksArr.push(i.innerText));
    try {
        localStorage.setItem('blocks',blocksArr);
    } catch (e) {
        document.querySelector('.for_exception').innerText = 'Хранилище переполнено';
        document.querySelector('.for_exception').color = 'red';
    }
    
}

addBtn.addEventListener('click',() =>{
    let block = document.createElement('div');
    if(checkInputText()){
        addTask(checkInputText);
        let blocks = document.querySelectorAll('.block:not(.addTask)');
        saveChanges(blocks);
    }
});

document.querySelector('.addTask__input').addEventListener('keyup',(e)=>{
    if(e.keyCode === 13&&checkInputText()){
        addTask(checkInputText);
        let blocks = document.querySelectorAll('.block:not(.addTask)');
        saveChanges(blocks);
    };
})

mainBlockWrapper.addEventListener('click',(e)=>{
    if(e.target.classList.contains('block__minus')){
        e.target.parentNode.style.opacity = '0';
        setTimeout(()=>{
            mainBlockWrapper.removeChild(e.target.parentNode);
            
            let blocks = document.querySelectorAll('.block:not(.addTask)');
            if(blocks){
                saveChanges(blocks);
            } else{
                localStorage.removeItem('blocks')
            }
        },500);
    }
});