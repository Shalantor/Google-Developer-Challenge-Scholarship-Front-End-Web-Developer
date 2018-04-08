/*
 * Create list that holds all the cards
 */

// The list below holds all the class names for the card icons
var iconClassNames = ['balance-scale','fire','birthday-cake','bug',
                    'fighter-jet','gamepad','university','fire-extinguisher'];

//How many moves to remove star
const howManyMoves = 10;

//How long to show two pairs that do not match (in milliseconds)
const showPair = 1000;

// Create the deck and append it as a child to the container class
var deck = createDeck(iconClassNames);
var container = document.querySelector('.container');
container.appendChild(deck);

//Listener to reset game
var restart = document.querySelector('.restart');
restart.addEventListener('click',function(){
    //Deck cleanup
    let container = document.querySelector('.container');
    container.removeChild(deck);
    let deck = createDeck(iconClassNames);
    container.appendChild(deck);

    //timer reset
    clearInterval(timer);
    let timerDisplay = document.querySelector('.time');
    timerDisplay.textContent = '0:00';
    timer = setInterval(function(){
        updateTimer();
    },1000);

    //Star reset
    let rating = document.querySelector('.star-rating');
    while(rating.getElementsByTagName('li').length < 3){
        let star = document.createElement('li');
        star.innerHTML = '<i class="fa fa-star"></i>';
        rating.appendChild(star);
    }
});

//Set interval to update timer every 1 second
var timer = setInterval(function(){
    updateTimer();
},1000);

//Increment the displayed timer by one
function updateTimer(){

    // Get minutes and seconds
    let timerDisplay = document.querySelector('.time');
    let time = timerDisplay.textContent;
    let minutes = parseInt(time.substring(0,time.indexOf(":")));
    let seconds = parseInt(time.substring(time.indexOf(":") + 1,time.length));

    //Increment both
    minutes = (seconds === 59) ? ++minutes : minutes;
    seconds = (++seconds) % 60;
    if(seconds <= 9){
        seconds = '0' + seconds;
    }

    //Display new time
    timerDisplay.textContent = minutes + ':' + seconds;
}

//Remove a star from the rating
function removeStar(){
    let star = document.querySelector('.star-rating li');
    if(star !== null){
        star.remove();
    }
}

//Function to create the deck. Returns the ul element for the deck.
function createDeck(names){
    let array = [];
    let deck = document.createElement('ul');
    deck.className = 'deck';
    for(const name of names){
        // Two cards per icon/name
        for (let i = 0; i < 2; i++) {
            const card = document.createElement('li');
            const icon = document.createElement('i');
            card.className = 'card';
            icon.className = 'fa fa-' + name;
            card.appendChild(icon);
            array.push(card);
        }
    }

    //Shuffle cards before adding to deck
    array = shuffle(array);
    for (let i = 0; i < array.length; i++) {
        deck.appendChild(array[i]);
    }

    //Listener for a card
    deck.addEventListener('click',function(event){
        if(event.target.className === 'card'){

            //If there are already two open cards dont let user click on third card
            if(document.getElementsByClassName('open').length === 2){
                return;
            }

            let openCard = document.querySelector('.open');
            event.target.className = 'card open show';
            //Check if there is previous open card
            if(openCard !== null ){
                if(openCard.innerHTML === event.target.innerHTML){
                    event.target.className = 'card match';
                    openCard.className = 'card match';

                    //Check if player has won
                    if(document.getElementsByClassName('match').length === 16){
                        showWinMessage();
                        clearInterval(timer);
                    }
                }
                else{
                    setTimeout(function(){
                        event.target.className = 'card';
                        openCard.className = 'card';
                    },showPair);
                }
            }

            //Get displayed moves
            let moveDisplay = document.querySelector('.moves');
            let moves = parseInt(moveDisplay.textContent);

            //Count Moves
            if((++moves % howManyMoves) === 0){
                removeStar();
            }

            //Update displayed moves
            moveDisplay.textContent = moves + ' ';

        }
    });
    return deck;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Show end screen message
function showWinMessage(){

    //Remove deck
    deck.remove();

    //hide scorepanel
    let scorePanel = document.querySelector('.score-panel');
    scorePanel.style.display = 'none';

    //hide game name
    let gameName = document.querySelector('.game-name');
    gameName.style.display = 'none';

    //show message
    let message = document.querySelector('.win-message');
    message.style.display = 'initial';

    //Show info
    let infoMessage = document.querySelector('.info-message');
    let moveInfo = document.querySelector('.moves').textContent;
    let stars = document.getElementsByClassName('fa-star');
    infoMessage.textContent = 'With ' + moveInfo + ' moves and ' + stars.length + ' stars.'

    //Show how much time it took
    let timerDisplay = document.querySelector('.time');
    let time = timerDisplay.textContent;
    let minutes = time.substring(0,time.indexOf(":"));
    let seconds = time.substring(time.indexOf(":") + 1,time.length);

    let infoTime = document.querySelector('.info-time');
    if(seconds.charAt(0) === '0'){
        console.log(seconds)
        seconds = seconds.charAt(1);
    }
    infoTime.textContent = 'It took you only ' + minutes + ' minutes and ' + seconds + ' seconds.';

    //Add listener to button
    let playAgain = document.querySelector('.play-again');
    playAgain.addEventListener('click',function(){
        let deck = createDeck(iconClassNames);
        let container = document.querySelector('.container');
        container.appendChild(deck);
        scorePanel.style.display = 'initial';
        gameName.style.display = 'initial';
        message.style.display = 'none';
        timer = setInterval(function(){
            updateTimer();
        },1000);
    });
}
