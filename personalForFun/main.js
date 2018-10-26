var raffle = function(){
    var i = 0;
    var ran1, ran2, ran3, ran4;
    var index = 2;
    ran1 = Math.floor(Math.random()*10);
    ran2 = Math.floor(Math.random()*10);
    ran3 = Math.floor(Math.random()*10);
    ran4 = Math.floor(Math.random()*10);
    document.getElementById("result").innerHTML = "1. " + ran1 + " " + ran2 + " " + ran3 + " Fireball: " + ran4 + " <br>";
    while(i < 1000){
        i+=1;
        ran1 = Math.floor(Math.random()*10);
        ran2 = Math.floor(Math.random()*10);
        ran3 = Math.floor(Math.random()*10);
        ran4 = Math.floor(Math.random()*10);
        document.getElementById("result").innerHTML += index + ". " + ran1 + " " + ran2 + " " + ran3 + " Fireball: " + ran4 + " <br>";
        index += 1;
    }
}