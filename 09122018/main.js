var rollDice = function(){
    console.log("this works");
    var randomNum = (Math.ceil(Math.random() * 6)).toString();
    document.getElementById('displayDice').innerHTML += "Current Roll: " + randomNum + "<br>";
}
var reset = function(){
    document.getElementById('displayDice').innerHTML = "Current Roll: 0<br>";
}