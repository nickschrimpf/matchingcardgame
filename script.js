let cards = document.querySelectorAll('div.card');
const startGameBtn = document.getElementById('startGameBtn')
const board = document.getElementById('board');


let firstSelection
let secondSelection
let preventSelection = false;
let pairsFound = 0;
let gameStarted = false;
let gameTimer

const startGame = () => {
    if(gameStarted){
        console.log(gameStarted)
        return;
    }else{        
        gameStarted = true;
        setBoard();
        startGameTimer();
    };
}
const startGameTimer = ()=> {
    gameTimer = setTimeout(()=>{
        console.log('timer ended game')
        endGame();
    },40000);
}
const setBoard = () => {

    if(cards.length < 12){
        cards.forEach(card => {
            let dupCard = card.cloneNode(true)
            board.appendChild(dupCard)
            cards = document.querySelectorAll('div.card')
        });
    }

    cards.forEach(card => {
        console.log('setting click')
        card.addEventListener('click',cardClickHandler);
    })
    shuffle();
}
const shuffle = ()=> {
    let taken = [];
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 11);
        if(taken.includes(randomPos)){
            do{
                if(randomPos <= 10){
                    randomPos++;
                }else{
                    randomPos = 0;
                }
            }while(taken.includes(randomPos));
            card.style.order = randomPos;
        }
        if(!taken.includes(randomPos)){
            card.style.order = randomPos;
            taken.push(randomPos)
        };
        card.style.opacity = '1';
        card.style.animationDuration = `.${randomPos}s`;//individual animation duration based on position
    });
};
const checkForMatch = () =>{
   let match = firstSelection.dataset.nick === secondSelection.dataset.nick;
    match ? matchFound() : noMatchFound();
} 
const matchFound = () => {
    firstSelection.removeEventListener('click',cardClickHandler);
    secondSelection.removeEventListener('click',cardClickHandler);
    firstSelection = null;
    secondSelection = null;
    pairsFound++;
    if(pairsFound === cards.length/2){
        endGame();
    }else{
        preventSelection = false;
    }
}
const noMatchFound = () => {
    preventSelection = true;
    setTimeout(()=>{
        secondSelection.classList.remove('flip');
        firstSelection.classList.remove('flip');
        firstSelection = null;
        secondSelection = null;
        preventSelection = false;
     },1500);
};
const endGame = () => {
    clearTimeout(gameTimer);
    if(pairsFound === cards.length/2){
        alert('you won!')// ok for now but will want to animate confetti or something
    }else{
        alert('better luck next time!')
    }
    setTimeout(()=>{
        cards.forEach((card)=>{
            card.classList.remove('flip')
        })
    },2000)
    resetBoardForNextPlay();
};

const resetBoardForNextPlay = () => {
     pairsFound = 0;
     gameStarted = false;
     firstSelection = null;
    secondSelection = null;
}

function startGameBtnClickHandler(){
    startGame();
}
function cardClickHandler(){
    if(preventSelection){
        return;
    }else{
        if(!firstSelection){
            this.classList.add('flip');
            firstSelection = this;
        }else {
            secondSelection = this;
            preventSelection = true;
            secondSelection.classList.add('flip');
            checkForMatch();
        };
    };
};

startGameBtn.addEventListener('click',startGameBtnClickHandler);
