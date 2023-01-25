let cards = document.querySelectorAll('div.card');
const startGameBtn = document.getElementById('startGameBtn');
const board = document.getElementById('board');
const intro = document.getElementById('intro');
const nickFactsList = document.getElementById('nickFactsList');
const scoreBoard = document.getElementById('scoreBoard');
const pairsFoundEl = document.getElementById('pairsFound');
const gameWonPanel =  document.getElementById('gameWonPanel');
const backDrop = document.getElementById('backDrop');

let firstSelection
let secondSelection
let preventSelection = false;
let pairsFound = 0;
let gameStarted = false;
let gameTimer

const startGame = () => {
    if(gameStarted){
        return;
    }else{        
        gameStarted = true;
        setBoard();
        startGameTimer();
        scoreBoard.style.display = 'flex'
        intro.style.display = 'none';
        startGameBtn.style.display = 'none';
    };
};
const startGameTimer = ()=> {
    // gameTimer = setTimeout(()=>{
    //     console.log('timer ended game')
    //     endGame();
    // },40000);
};
const setBoard = () => {
    if(cards.length < 12){
        cards.forEach(card => {
            let dupCard = card.cloneNode(true)
            board.appendChild(dupCard)
            cards = document.querySelectorAll('div.card')
        });
    }
    cards.forEach(card => {
        card.addEventListener('click',cardClickHandler);
    })
    shuffle();
};
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
   let match = firstSelection.dataset.nick === secondSelection.dataset.nick && firstSelection.style.order !== secondSelection.style.order;
    match ? matchFound() : noMatchFound();
}; 
const matchFound = () => {
    firstSelection.removeEventListener('click',cardClickHandler);
    secondSelection.removeEventListener('click',cardClickHandler);
    let pairValue = firstSelection.dataset.nick;
    showNickFact(pairValue);
    firstSelection = null;
    secondSelection = null;
    pairsFound++;
    pairsFoundEl.innerHTML = pairsFound
    if(pairsFound === cards.length/2){
        endGame();
    }else{
        preventSelection = false;
    };
};
const showNickFact = (fact) => {
    const factLi = document.getElementById(fact);
    factLi.style.display = 'flex';
    setTimeout(()=>{
        factLi.style.display = 'none';
    },2600);
};
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
        gameWonPanel.style.display = 'flex';
        backDrop.style.display = 'flex';
    }else{
        alert('better luck next time!')
    };
    setTimeout(()=>{
        cards.forEach((card)=>{
            card.classList.remove('flip');
            card.style.opacity = '0';
        });
    },1600);
};
const resetBoardForNextPlay = () => {
    clearTimeout(gameTimer)
    pairsFound = 0;
    gameStarted = false;
    firstSelection = null;
    secondSelection = null;
    startGameBtn.style.display = 'flex';
    intro.style.display = 'flex';
};
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
        }else if(this.style.order != firstSelection.style.order){
            secondSelection = this;
            preventSelection = true;
            secondSelection.classList.add('flip');
            checkForMatch();
        }else{
            return;
        }
    };
};

startGameBtn.addEventListener('click',startGameBtnClickHandler);
