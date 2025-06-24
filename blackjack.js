
let dealerSum = 0;
let yourSum = 0;

let dealerAceCount = 0;
let yourAceCount = 0;

let hiddenCard;
let deck;

let canHit = true;

window.onload = function (){
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3","4","5","6","7","8","9","10","J","Q","K"];
    let types = ["C","D","H","S"];
    deck = [];

    for(let i = 0; i < types.length; i++){
        for(let j = 0; j < values.length; j++){
            deck.push(values[j] + "-" + types[i]);
        }
    }
    
    
}

function shuffleDeck(){
    for(let i = deck.length -1; i > 0; i--){
        let j = Math.floor(Math.random() * (i+1));
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck)
}

function startGame() {
    hiddenCard = deck.pop();
    dealerSSum += getValue(hiddenCard);
}

function getValue(card){
    let data = card.split("-");
    let value = data[0];

    // check for A or face
    if(isNaN(value)) {
        if(value === "A")
            return 11;
        return 10;
    }
    return parseInt(value);
}