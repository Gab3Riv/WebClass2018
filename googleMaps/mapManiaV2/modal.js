var start = {
    open: function(){
        var help = document.getElementById('startModal');
        help.style.display = "block";
    },
    close: function(){
        if(canStartGame()){
            var help = document.getElementById('startModal');
            help.style.display = "none";
            launchContinued();
        }else{
            document.getElementById("pleaseCheckDifficulty").innerHTML = "Please Check A Difficulty Before Continuing.";
        }
    }
}
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
