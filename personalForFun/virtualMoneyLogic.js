var balance = 0;
var combinations = 1;
var elementArray = ["drawingsDisplayOne","drawingsDisplayTwo","drawingsDisplayThree"];
var pickThreeID = ["pickThreeOne","pickThreeTwo","pickThreeThree"];
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
            document.getElementById(elementArray[ii]).innerHTML = "<input id='" + pickThreeID[ii] +"'value='000'></input>";
        }
    }
}