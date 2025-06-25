class Player {
    constructor(type){
        this.sum = 0;
        this.type = type;
        this.sumId = type + "-sum";
        this.aceCount = 0;
        this.cardImgId = type + "-cards"; 
    }
    reduceAce(){
        while(this.sum > 21 && this.aceCount > 0){
            this.sum -= 10;
            this.aceCount--;
        }
    }
    updateSum(){
        document.getElementById(this.sumId).innerText = this.sum;
        this.reduceAce();
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

    dealInitialHands();
   
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
    
    deal(user);
  
    if( user.sum > 21) {
        user.reduceAce();
        if(user.sum > 21){
            stay();
        }
    }
        
}


function stay(){

    dealOutDealer();
    dealer.reduceAce();
    user.reduceAce();

    //reveal hidden card
    document.getElementById("hidden").src = "./cards/" + dealer.hiddenCard + ".png";

    dealer.updateSum();
    user.updateSum();

    updateResultsMessage();    
    updateButtonsStay();
    
}

function deal(player){
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png"
    player.sum += getValue(card);
    player.aceCount += checkAce(card);
    document.getElementById(player.cardImgId).append(cardImg);
    player.updateSum();
}

function dealOutDealer(){
    while(dealer.sum < 17 && dealer.sum < user.sum && user.sum <= 21){
        deal(dealer);
    }
}


function dealInitialHands(){
    
    dealer.hiddenCard = deck.pop();
    dealer.sum += getValue(dealer.hiddenCard);
    dealer.aceCount += checkAce(dealer.hiddenCard);
    
    deal(dealer);
    document.getElementById(dealer.sumId).innerText = dealer.sum - getValue(dealer.hiddenCard);
    deal(user);
    deal(user);
}

function updateResultsMessage(){
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

function updateButtonsStay(){
    document.getElementById("hit").disabled = true;
    document.getElementById("stay").disabled = true;
    document.getElementById("try-again").style.display = "inline";
}