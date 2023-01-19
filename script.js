let cards = document.querySelectorAll('div.card');
const board = document.getElementById('board');
let firstSelection
let secondSelection
let preventSelection = false;
let pairsFound = 0;

cards.forEach(card => {
    let dupCard = card.cloneNode(true)
    board.appendChild(dupCard)
    cards = document.querySelectorAll('div.card')
});

shuffle();

function shuffle() {
    let taken = [];
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 11);
        if(taken.includes(randomPos)){
            do{
                if(randomPos <= 10){
                    randomPos++
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
        if(randomPos === 0 || randomPos === 4 || randomPos === 8 ){
            card.style.animationDuration = '2s';
        }else if(randomPos === 1 || randomPos === 5|| randomPos === 9){
            card.style.animationDuration = '4s';
        }else{
            card.style.animationDuration = '6s';
        }
        // APPLY ANIMATION BASIED ON LOCATION LEFT SIDE 0,4,8 LEFT MIDDLE 1,5,9 RIGHT MIDDLE 2,6,10 RIGHT SIDE 3,7,11
    });
};

function cardClickHandler(){
    if(preventSelection){
        return;
    }else{
        this.classList.add('flip');
        if(!firstSelection){
            firstSelection = this;
        }else {
            secondSelection = this;
            preventSelection = true;
            secondSelection.classList.add('flip');
            checkForMatch();
        };
    };
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
    preventSelection = false;
    pairsFound++;
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

cards.forEach(card => {
    card.addEventListener('click',cardClickHandler);
})