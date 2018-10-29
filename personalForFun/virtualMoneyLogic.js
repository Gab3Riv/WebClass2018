var balance = 0;
var submitBalance = function(){
    balance += parseInt(document.getElementById("balance").value);
    document.getElementById("balance").value = 0;
    console.log(balance);
}