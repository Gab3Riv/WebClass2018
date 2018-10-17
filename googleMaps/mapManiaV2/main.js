var gMap, currentPlace;
var gameStarted = false;
var score = 0;
var loc1 = {lat:12.432,lng:43.234};

//These will only be places in United States
var easyPlaces = [
    {
        "name": "A Random Chick Fil A",
        "info": "Oh how I love Chick Fil A, One of my favorite fast food places to eat at.",
        "coordinates": {
            "lat": 41.718333,
            "lng": -88.126764
        },
        "image": "something.png",
        "chosen": false
    },
    {
        "name": "Dave & Busters",
        "info": "Whats a Round1?",
        "coordinates": {
            "lat": 32.680811,
            "lng": -97.104504
        },
        "chosen": false
    },
    {
        "name": "",
        "info": "",
        "coordinates": {
            "lat": 0,
            "lng": 0
        },
        "chosen": false
    },
    {
        "name": "",
        "info": "",
        "coordinates": {
            "lat": 0,
            "lng": 0
        },
        "chosen": false
    },
    {
        "name": "",
        "info": "",
        "coordinates": {
            "lat": 0,
            "lng": 0
        },
        "chosen": false
    },
    {
        "name": "",
        "info": "",
        "coordinates": {
            "lat": 0,
            "lng": 0
        },
        "chosen": false
    },
    {
        "name": "",
        "info": "",
        "coordinates": {
            "lat": 0,
            "lng": 0
        },
        "chosen": false
    },
    {
        "name": "",
        "info": "",
        "coordinates": {
            "lat": 0,
            "lng": 0
        },
        "chosen": false
    },
    {
        "name": "",
        "info": "",
        "coordinates": {
            "lat": 0,
            "lng": 0
        },
        "chosen": false
    },
    {
        "name": "",
        "info": "",
        "coordinates": {
            "lat": 0,
            "lng": 0
        },
        "chosen": false
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
    document.getElementById("header").innerHTML = "Welcome to Gabriel's Map Mania!";
    //CHANGE THIS LATER
    currentPlace = getRandomPlace("Easy");
    console.log(currentPlace);
    gameStarted = true;
}
function initMap() {
    // Where the map initiates
    gMap = new google.maps.Map(document.getElementById("myMapID"), {
        center: {lat: 41.878, lng: 10}, zoom: 3});

    google.maps.event.addListener(gMap, "idle", function() {
        updateGame()
    });

    SetHint("You're Close");
    SetScore(score);
}
function updateGame() {
    console.log("You have moved the map!!");
    var zoomLevel = gMap.getZoom()
    var inBounds = false;

    if(gameStarted){
        if(gMap.getBounds().contains(currentPlace.coordinates)){
            inBounds = true;
            if(zoomLevel === 8){
                console.log("You would spawn flag here");
            }   
        }
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
    var randomNum, length, objectArr, randomLat, randomLng;
    var validPlace = false;
    for(var i = 0; i < 200; i+=1){
        randomLat = (Math.random() * 180) - 90;
        console.log(randomLat);
    }
    if(difficulty === "Easy"){
        objectArr = easyPlaces;
        length = easyPlaces.length;  
    }else if(difficulty === "Medium"){
        objectArr = mediumPlaces;
        length = mediumPlaces.length;  
    }else if(difficulty === "Hard"){
        objectArr = hardPlaces;
        length = hardPlaces.length;    
    }else if(difficulty === "Extreme"){
        for(var i = 0; i < 100; i+=1){
            randomLat = Math.floor(Math.random() * 180) - 90;
            console.log(randomLat);
        }
    }else{
        console.log("Difficulty Invalid.");
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


