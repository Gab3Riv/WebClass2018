var gMap, currentPlace;
var score = 0;
var loc1 = {lat:12.432,lng:43.234};

var easyPlaces = [
    //These will only be places in United States
    {
        'name': 'A Random Chick Fil A',
        'info': 'Oh how I love Chick Fil A, One of my favorite fast food places to eat at.',
        'coordinates': {
            'lat': 41.718333,
            'lon': -88.126764,
        },
        'image': 'something.png',
        'chosen': false
    },
    {
        'name': 'Dave & Busters',
        'info': 'Whats a Round1?',
        'coordinates': {
            'lat': 32.680811,
            'lon': -97.104504,
        },
        'chosen': false
    },
    {
        'name': '',
        'lat': 0,
        'lon': 0
    },
    {
        'name': '',
        'lat': 0,
        'lon': 0
    },
    {
        'name': '',
        'lat': 0,
        'lon': 0
    },
    {
        'name': 'it should also choose this one',
        'lat': 0,
        'lon': 0,
        'chosen': false
    },
    {
        'name': '',
        'lat': 0,
        'lon': 0
    },
    {
        'name': '',
        'lat': 0,
        'lon': 0
    },
    {
        'name': '',
        'lat': 0,
        'lon': 0
    },
    {
        'name': '',
        'lat': 0,
        'lon': 0
    }
];
var mediumPlaces = [
    //These will only be places in North America
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
];
var hardPlaces = [
    //These places can be anywhere in the World
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {},
    {}
];

function launch() {
    document.getElementById('header').innerHTML = 'Welcome to Gabriels Map Mania!';
    //CHANGE THIS LATER
    currentPlace = getRandomPlace('Easy');
    console.log(currentPlace);
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
var getRandomPlace = function(difficulty){
    var randomNum, length, objectArr;
    var validPlace = false;
    if(difficulty === 'Easy'){
        objectArr = easyPlaces;
        length = easyPlaces.length;  
    }else if(difficulty === 'Medium'){
        objectArr = mediumPlaces;
        length = mediumPlaces.length;  
    }else if(difficult === 'Hard'){
        objectArr = hardPlaces;
        length = hardPlaces.length;    
    }else{
        console.log('Difficulty Invalid.');
    }
    while(validPlace === false){
        randomNum = Math.floor(Math.random() * length);
        if(objectArr[randomNum].chosen === false){
            objectArr[randomNum].chosen = true;
            validPlace = true;
        }
    }
    return objectArr[randomNum];
}


