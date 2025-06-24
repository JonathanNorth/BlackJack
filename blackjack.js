class Player {
    constructor(type){
        this.sum = 0;
        this.type = type;
        this.sumId = type + "-sum";
        this.aceCount = 0;
        this.cardImgId = type + "-cards"; 
    }
    reduceAce(sum, aceCount){
        while(sum > 21 && aceCount > 0){
            sum -= 10;
            aceCount--;
        }
    }
}

class Dealer extends Player {
    hiddenCard;
    constructor(){
        super("dealer");

    }
    
}

class User extends Player {
    constructor(){
        super("your");
    }
}



const dealer = new Dealer();
const user = new User();


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
    
}

function startGame() {

    dealer.hiddenCard = deck.pop();
    dealer.sum += getValue(dealer.hiddenCard);
    dealer.aceCount += checkAce(dealer.hiddenCard);
    
    deal(dealer);
    document.getElementById(dealer.sumId).innerText = dealer.sum - getValue(dealer.hiddenCard);
    

    for(let i=0; i < 2; i++){
        deal(user);
    }

    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);

}

function getValue(card){
    let data = card.split("-");
    let value = data[0];

    // check for Ace or face
    if(isNaN(value)) {
        if(value === "A")
            return 11;
        return 10;
    }

    return parseInt(value);
}

function checkAce(card){
    let data = card.split("-");
    let value = data[0];

    if(value === "A")
        return 1;
    else    
        return 0;
}

function hit(){

    if(!canHit)
            return;

    
    deal(user);
  

    if( user.sum > 21) {
        user.reduceAce();
        if(user.sum > 21){
            canHit = false;
        }
    }
        
}



function stay(){
    dealer.reduceAce();
    user.reduceAce();

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + dealer.hiddenCard + ".png";

    document.getElementById(dealer.sumId).innerText = dealer.sum;
    document.getElementById(user.sumId).innerText = user.sum;

    let yourSum = user.sum;
    let dealerSum = dealer.sum; 
    
    let message = "";
    if(yourSum > 21)
        message = "Bust";
    else if (dealerSum > 21)
        message = "You Win";
    else if (dealerSum === 21 || dealerSum >= yourSum)
        message = "You Lose";
    else
        message = "You Win";

    document.getElementById("results").innerText = message;
    
}

function deal(player){
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png"
    player.sum += getValue(card);
    player.aceCount += checkAce(card);
    document.getElementById(player.cardImgId).append(cardImg);
    document.getElementById(player.sumId).innerText = player.sum;
}