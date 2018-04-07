/*
 * Create list that holds all the cards
 */

// The list below holds all the class names for the card icons
var iconClassNames = ['balance-scale','fire','birthday-cake','bug',
                    'fighter-jet','gamepad','university','fire-extinguisher'];

// Create the deck and append it as a child to the container class
var deck = createDeck(iconClassNames);
var container = document.querySelector('.container');
container.appendChild(deck);

//Function to create the deck. Returns the ul element for the deck.
function createDeck(names){
    var array = [];
    var deck;
    deck = document.createElement('ul');
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
    return deck;
}

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
