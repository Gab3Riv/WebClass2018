var launch = function(){
    console.log("Poop.");
}
var openHelp = function(){
    var help = document.getElementById('helpID');
    help.style.display = "block";
}
var closeHelp = function(){
    var help = document.getElementById('helpID');
    help.style.display = "none";
}

var modal = {
    close: function(){
        var help = document.getElementById('helpID');
        help.style.display = "none";
    },
    open: function(){
        var help = document.getElementById('helpID');
        help.style.display = "block";
    }
}
