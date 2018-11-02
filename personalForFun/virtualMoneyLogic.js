var balance = 0;
var combinations = 1;
var elementArray = ["drawingsDisplayOne","drawingsDisplayTwo","drawingsDisplayThree"];
var pickThreeID = ["pickThreeOne","pickThreeTwo","pickThreeThree"];
var straightID = ["straightOne","straightTwo","straightThree"];
var boxID = ["boxOne","boxTwo","boxThree"];
var straightboxID = ["straightBoxOne","straightBoxTwo","straightBoxThree"];
var comboID = ["comboOne","comboTwo","comboThree"];
var frontPairID = ["frontPairOne","frontPairTwo","frontPairThree"];
var backPairID = ["backPairOne","backPairTwo","backPairThree"];
var submitBalance = function(){
    balance += parseInt(document.getElementById("balance").value);
    document.getElementById("balance").value = 0;
    updateText(balance);
    console.log(balance);
}
var updateText = function(){
    document.getElementById("balanceText").innerHTML = "Your Balance: $" + balance + ".00";
}
var submitCombinations = function(){
    if(document.getElementById("inputDrawings").value == 1){
        combinations = 1;
    }else if(document.getElementById("inputDrawings").value == 2){
        combinations = 2;
    }else if(document.getElementById("inputDrawings").value == 3){
        combinations = 3;
    }else{combinations = 0;}
    for(var i=0; i < 3; i+=1){
        document.getElementById(elementArray[i]).innerHTML = "";
        for(var ii=0; ii < combinations; ii+=1){
            document.getElementById(elementArray[ii]).innerHTML = "<input id='" + pickThreeID[ii] +"'value='000'></input>" +
                '<input type="checkbox" name="fireball" value="fireball">Fireball<br>' +
                '<form action="/action_page.php">' +
                '<input type="checkbox" name="Straight" value="straight">Straight<br>' +
                '<input type="checkbox" name="Box" value="box">Box<br>' +
                '<input type="checkbox" name="StraightBox" value="straightBox">Straight/Box<br>' +
                '<input type="checkbox" name="Combo" value="combo">Combo<br>' +
                '<input type="checkbox" name="Front Pair" value="frontPair">Front Pair<br>' +
                '<input type="checkbox" name="Back Pair" value="backPair">Back Pair<br>' +
                //<input type="submit" value="Submit">
                '</form>';
        }
    }
}