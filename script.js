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
            console.log(taken)
            console.log(randomPos)
            
            do{
                if(randomPos <= 10){
                    randomPos++
                }else{
                    randomPos = 0;
                }
            }while(taken.includes(randomPos));
            card.style.order = randomPos;
            taken.push(randomPos)
            console.log(`new pos ${randomPos}`)
            console.log(taken)
        }
        if(!taken.includes(randomPos)){
            card.style.order = randomPos;
            taken.push(randomPos)
        };
    });
};

function cardClickHandler(){
    if(preventSelection){
        return;
    };
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