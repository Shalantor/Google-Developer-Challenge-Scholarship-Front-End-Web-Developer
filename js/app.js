//Array with acceptable start values for x coordinate
var startValuesForX = [60,140,220];

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // The x coordinate 505 is outs of bounds at the right
    this.x = -100;

    // The y coordinate. 60,140,220 are acceptable values
    this.y = startValuesForX[Math.floor(Math.random() * startValuesForX.length)];

    //Speed of the enemy
    this.speed = Math.floor(Math.random() * 500) + 200;

    /* Width of enemy, used for collision detection. Is 100 but we put lower
     * to make it more fair for the player, because setting it exactly 100 makes
     * the game too difficult
     */

    this.width = 80;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt ;

    //Moved out of screen
    if(this.x >= 505){
        this.x = -100;
        this.y = startValuesForX[Math.floor(Math.random() * startValuesForX.length)];
        this.speed = Math.floor(Math.random() * 500) + 200;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {

    //Possible player sprites
    this.possibleSprites = ['images/char-boy.png',
                            'images/char-cat-girl.png',
                            'images/char-horn-girl.png',
                            'images/char-pink-girl.png',
                            'images/char-princess-girl.png'];

    //The image/prite for the player
    this.sprite = 'images/char-boy.png';

    //Current position of this sprite in the array of possible sprites
    this.spritePosition = 0;

    // The starting x coordinate
    this.x = 200;

    // The starting y coordinate
    this.y = 400;

    //Speed of the player when moving horizontally
    this.speedX = 100;

    //Speed of player when moving vertically
    this.speedY = 90;
};

//Make player prototype same as enemy prototype
Player.prototype = Enemy.prototype;

//Implement player handleInput
Player.prototype.handleInput = function(key){
    if(key === 'left' && (this.x - this.speedX) >= 0 ){
        this.x -= this.speedX;
    }
    else if(key === 'right' && (this.x + this.speedX) <= 400 ){
        this.x += this.speedX;
    }
    else if(key === 'up' && (this.y - this.speedY) >= -50){
        this.y -= this.speedY;
    }
    else if(key === 'down' && (this.y + this.speedY) <= 400){
        this.y += this.speedY;
    }
    else if(key === 'enter' && (this.y === 400 && this.x === 0)){
        this.spritePosition = (this.spritePosition + 1) % this.possibleSprites.length;
        this.sprite = this.possibleSprites[this.spritePosition];
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
for(var i = 0 ; i <= 2 ; i++){
    allEnemies.push(new Enemy());
}

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
