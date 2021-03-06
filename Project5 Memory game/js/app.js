/*
 * Create list that holds all the cards
 */

// The list below holds all the class names for the card icons
const ICON_CLASS_NAMES = [
    'balance-scale',
    'fire',
    'birthday-cake',
    'bug',
    'fighter-jet',
    'gamepad',
    'university',
    'fire-extinguisher'
];

//How many moves to remove star
const HOW_MANY_MOVES = 10;

//How long to show two pairs that do not match (in milliseconds)
const SHOW_PAIR = 1000;

//Id for the timer
let timer = null;

// Create the deck and append it as a child to the container class
const deck = createDeck(ICON_CLASS_NAMES);
const container = document.querySelector('.container');
container.appendChild(deck);

//Listener to reset game
const restart = document.querySelector('.restart');
restart.addEventListener('click',function(){
    //Deck cleanup
    let container = document.querySelector('.container');
    let deck = document.querySelector('.deck');
    container.removeChild(deck);
    deck = createDeck(ICON_CLASS_NAMES);
    container.appendChild(deck);

    resetScorePanel();
    clearInterval(timer);
    timer = null;
});

//Increment the displayed timer by one
function updateTimer(){

    // Get minutes and seconds
    let timerDisplay = document.querySelector('.time');
    let time = timerDisplay.textContent;
    let minutes = parseInt(time.substring(0,time.indexOf(":")));
    let seconds = parseInt(time.substring(time.indexOf(":") + 1,time.length));

    //Increment both
    minutes = (seconds === 59) ? ++minutes : minutes;
    seconds = ++seconds % 60;
    if(seconds <= 9){
        seconds = '0' + seconds;
    }

    //Display new time
    timerDisplay.textContent = minutes + ':' + seconds;
}

//Remove a star from the rating
function removeStar(){
    let rating = document.querySelector('.star-rating');
    let stars = rating.getElementsByTagName('li');
    if(stars.length > 1){
        stars[0].remove();
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
        if(event.target.className === 'card' && document.getElementsByClassName('open').length !== 2){

            //Is this the first card?
            if(timer === null){
                timer = setInterval(function(){
                    updateTimer();
                },1000);
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
                        timer = null;
                    }
                }
                else{
                    setTimeout(function(){
                        event.target.className = 'card';
                        openCard.className = 'card';
                    },SHOW_PAIR);
                }
                //Get displayed moves
                let moveDisplay = document.querySelector('.moves');
                let moves = parseInt(moveDisplay.textContent);

                //Count Moves
                if(++moves % HOW_MANY_MOVES === 0){
                    removeStar();
                }

                //Update displayed moves
                moveDisplay.textContent = moves + ' ';
            }

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
    let deck = document.querySelector('.deck');
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
        seconds = seconds.charAt(1);
    }
    infoTime.textContent = 'It took you only ' + minutes + ' minutes and ' + seconds + ' seconds.';

    //Add listener to button
    let playAgain = document.querySelector('.play-again');
    playAgain.addEventListener('click',function(){

        //Create deck
        let deck = createDeck(ICON_CLASS_NAMES);
        let container = document.querySelector('.container');
        container.appendChild(deck);

        //Show score panel and name of game
        scorePanel.style.display = 'initial';
        gameName.style.display = 'initial';

        //Hide winning message
        message.style.display = 'none';

        //Set stars to 3, time to 0:00 and moves to 0
        resetScorePanel();
    });
}

//Reset the score panel. Time to 0:00, moves to 0, stars to 3
function resetScorePanel(){
    //Star reset
    let rating = document.querySelector('.star-rating');
    while(rating.getElementsByTagName('li').length < 3){
        let star = document.createElement('li');
        star.innerHTML = '<i class="fa fa-star"></i>';
        rating.appendChild(star);
    }

    //Move reset
    let moveDisplay = document.querySelector('.moves');
    moveDisplay.textContent = '0 ';

    //Time reset
    let timerDisplay = document.querySelector('.time');
    timerDisplay.textContent = '0:00';
}
