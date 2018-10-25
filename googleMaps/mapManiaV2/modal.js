//Creates The Start Modal
var start = {
    open: function(){
        var help = document.getElementById('startModal');
        help.style.display = "block";
    },
    close: function(){ //Start Modal Can Only Close If Difficulty Is Set
        if(canStartGame()){
            var help = document.getElementById('startModal');
            help.style.display = "none";
            launchContinued();
        }else{
            document.getElementById("pleaseCheckDifficulty").innerHTML = "Please Check A Difficulty Before Continuing.";
        }
    }
}

//Creates The Help Modal
var help = {
    open: function(){
        var help = document.getElementById('helpModal');
        help.style.display = "block";
    },
    close: function(){
        var help = document.getElementById('helpModal');
        help.style.display = "none";
    }
}
