var gMap;
var score = 0;
var loc1 = {lat:12.432,lng:43.234};

function launch() {
    document.getElementById('header').innerHTML = 'Welcome to Gabriels Map Mania!';
}
function initMap() {
    // Where the map initiates
    gMap = new google.maps.Map(document.getElementById('myMapID'), {
        center: {lat: 41.878, lng: 10}, zoom: 3});

    google.maps.event.addListener(gMap, 'idle', function() {
        updateGame()
    });

    SetHint("You're Close");
    SetScore(score);
}
function updateGame() {
    console.log('You have moved the map!!');
    var zoomLevel = gMap.getZoom()
    var inBounds = false;

    if (gMap.getBounds().contains(loc1)) {
        inBounds = true;
    }

    console.log("You are in bounds: " + inBounds+".");
    console.log("Your current zoom level is "+ zoomLevel+".");
}
function SetHint(hint) {
    document.getElementById("hint-id").value = hint;  
}
function SetScore() {
    document.getElementById("score-id").value = score; 
}


