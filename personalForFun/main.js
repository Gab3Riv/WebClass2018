var raffle = function(){
    var i = 0;
    var ran1, ran2, ran3, ran4;
    var index = 2;
    ran1 = Math.floor(Math.random()*10);
    ran2 = Math.floor(Math.random()*10);
    ran3 = Math.floor(Math.random()*10);
    ran4 = Math.floor(Math.random()*10);
    document.getElementById("result").innerHTML = "1. " + ran1 + " " + ran2 + " " + ran3 + " Fireball: " + ran4 + " <br>";
    while(i < 100){
        i+=1;
        ran1 = Math.floor(Math.random()*10);
        ran2 = Math.floor(Math.random()*10);
        ran3 = Math.floor(Math.random()*10);
        ran4 = Math.floor(Math.random()*10);
        if(checkValues(ran1, ran2, ran3, ran4)){
            document.getElementById("result").innerHTML += "<div style='color: red;'>" + index + ". " + ran1 + " " + ran2 + " " + ran3 + " Fireball: " + ran4 + "</div>";
        }else{
            document.getElementById("result").innerHTML += index + ". " + ran1 + " " + ran2 + " " + ran3 + " Fireball: " + ran4 + " <br>";
        }
        index += 1;
    }
}

var checkValues = function(ran1, ran2, ran3, ran4){
    var firstValueMatch, secondValueMatch, thirdValueMatch;
    firstValueMatch = secondValueMatch = thirdValueMatch = false;
    var rndArray = [ran1,ran2,ran3,ran4];
    for(var i = 0; i < 4; i+=1){
        if(rndArray[i] == document.getElementById("firstNum").value && firstValueMatch === false){
            firstValueMatch = true;
        }else if(rndArray[i] == document.getElementById("secondNum").value && secondValueMatch === false){
            secondValueMatch = true;
        }else if(rndArray[i] == document.getElementById("thirdNum").value && thirdValueMatch === false){
            thirdValueMatch = true;
        }else{}
    }
    if(firstValueMatch === true && secondValueMatch === true && thirdValueMatch === true){
        return true;
    }else{
        return false;
    }
}