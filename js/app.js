/*
 * Create a list that holds all of your cards
 */

const icons = [
    "diamond",
    "paper-plane-o",
    "anchor",
    "bolt",
    "cube",
    "leaf",
    "bicycle",
    "bomb"
]

const symbols = [...icons, ...icons];
const deck = document.querySelector(".deck");
const cardDeck = [];
let twoCards = [];
let moves = 0;
const movesCount = document.querySelector(".moves");
const starOne = document.getElementById("star-one");
const starTwo = document.getElementById("star-two");
const starThree = document.getElementById("star-three");
let sec = 0;
let winArray = [];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function createCard() {
	for (let i = 0; i < symbols.length; i ++) {
		const newCard = document.createElement("li");
		newCard.classList.add("card");
		newCard.innerHTML = `<i class="fa fa-${symbols[i]}"></i>`;
        clickCard(newCard);
		deck.appendChild(newCard);
		cardDeck.push(newCard);
	}
}

function clickCard(chosenCard) {
    chosenCard.addEventListener('click', turnCard);
    chosenCard.addEventListener('click', pushCards);
}

function turnCard() {
    this.classList.toggle("open");
    this.classList.toggle("show");
}

function dontClick() {
    for (let i = 0; i < cardDeck.length; i++) {
        if (cardDeck[i].classList.contains("match") === true) {
            // do nothing
        }
        else {
            cardDeck[i].classList.add("noclick");
        }
    }
}

function allowClick() {
    for (let i = 0; i < cardDeck.length; i++) {
        if (cardDeck[i].classList.contains("match") === true) {
            // do nothing
        }
        else {
            cardDeck[i].classList.remove("noclick");
        }
    }
}

function matchCards() {
    let cardOne = twoCards[0];
    let cardTwo = twoCards[1];
    if (cardOne.innerHTML === cardTwo.innerHTML) {
        cardOne.classList.add("match", "noclick");
        cardTwo.classList.add("match", "noclick");
        winArray.push(cardOne);
        winArray.push(cardTwo);
        twoCards = [];
    }
    else {
        dontClick();
        setTimeout(function() {
            cardOne.classList.remove("open", "show");
            cardTwo.classList.remove("open", "show");
            allowClick();
            twoCards = [];
        }, 2000);
    }
}

function countMoves() {
    moves++;
    movesCount.innerHTML = moves;
}

function colourStars() {
    if (moves < 13) {
        starOne.classList.add("stars-colour");
        starTwo.classList.add("stars-colour");
        starThree.classList.add("stars-colour");
    }
    if (moves >= 13 && moves < 20) {
        starThree.classList.remove("stars-colour");
    }
    if (moves >= 20) {
        starTwo.classList.remove("stars-colour");
    }
}

function pushCards() {
    if (twoCards.length < 2) {
        this.classList.add("noclick");
        twoCards.push(this);
    } if (twoCards.length === 2) {
        matchCards();
        countMoves();
        colourStars();
        winGame();
    } else {
        return;
    }
}

/* The code for the timer is from https://stackoverflow.com/questions/5517597/plain-count-up-timer-in-javascript and adjusted to this project */

function pad(val) { 
    return val > 9 ? val : "0" + val;
}

let timer = setInterval(function() {
    document.getElementById("seconds").innerHTML=pad(++sec%60);
    document.getElementById("minutes").innerHTML=pad(parseInt(sec/60,10));
}, 1000);

function startTimer() {
    pad();
    timer;
}

// To stop the timer: clearInterval(timer);

function winGame() {
    if (winArray.length === 16) {
        console.log("You win!");
        clearInterval(timer);
    }
    else {
        // do nothing
    }
}

function createDeck() {
	shuffle(symbols);
	createCard();
    startTimer();
}

createDeck();

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
