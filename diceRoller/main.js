
//This function changes what is in the <div id='diceDisplay'></div> tag
var rollDice = function(){
    document.getElementById('diceDisplay').innerHTML = 'Dice 1: ' + randomNumber() + '<br>';
    document.getElementById('diceDisplay').innerHTML += 'Dice 2: ' + randomNumber() + '<br>';
    document.getElementById('diceDisplay').innerHTML += 'Dice 3: ' + randomNumber() + '<br>';
    document.getElementById('diceDisplay').innerHTML += 'Dice 4: ' + randomNumber() + '<br>';
    document.getElementById('diceDisplay').innerHTML += 'Dice 5: ' + randomNumber() + '<br>';
    document.getElementById('diceDisplay').innerHTML += 'Dice 6: ' + randomNumber() + '<br>';

}
//This function creates a random number and can be returned anywhere
var randomNumber = function(){
    var ranNum = Math.ceil(Math.random()*6);
    return ranNum;
}