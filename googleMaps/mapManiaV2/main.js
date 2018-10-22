var gMap, currentPlace, markLocation, infoWindow, inBounds, zoomLevel;
var difficulty = "";
var gameStarted, gameWon, cheat = false;
var score = 0;
var placesChecked = 0;
var loc1 = {lat:12.432,lng:43.234};
themeSong = new Audio('theme.mp3'); 
themeSong.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
themeSong.play();
themeSong.volume = 0.01;

var enableCheat = function(){
    if(!gameWon){
        cheat = true;
        updateGame();
        console.log("You cheated");
        cheat = false;
    }
}


//Game has been programmed to work with each difficulty.
//These will only be places in United States
var easyPlaces = [
    {
        "name": "A Random Chick Fil A",
        "info": "Oh how I love Chick Fil A, One of my favorite fast food places to eat at.",
        "coordinates": {
            "lat": 41.718333,
            "lng": -88.126764
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Dave & Busters",
        "info": "Whats a Round1?",
        "coordinates": {
            "lat": 32.680811,
            "lng": -97.104504
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "McDonalds",
        "info": "Everyone knows a McDonalds.",
        "coordinates": {
            "lat": 47.060829,
            "lng": -109.432538
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "The Crawfish Pot & Oyster Bar",
        "info": "This is where I tried Crawfish for the first time.",
        "coordinates": {
            "lat": 29.651531,
            "lng": -95.251680
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Whataburger",
        "info": "The McDonalds of Texas.",
        "coordinates": {
            "lat": 29.491216,
            "lng": -98.704880
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Franklin, Tennessee",
        "info": "Where I might live in the future.",
        "coordinates": {
            "lat": 35.917390,
            "lng": -86.868190
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "In-N-Out Burger",
        "info": "I Still need to try this Place.",
        "coordinates": {
            "lat": 34.067790,
            "lng": -117.973513
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Hilton Head Island South Carolina",
        "info": "A great Island to take a vacation on in South Carolina.",
        "coordinates": {
            "lat": 32.206675,
            "lng": -80.732926
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Lewis University",
        "info": "Where I attend College.",
        "coordinates": {
            "lat": 41.604803,
            "lng": -88.080467
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Marco Island, Florida",
        "info": "Last beach vacation I had.",
        "coordinates": {
            "lat": 25.936186,
            "lng": -81.731030
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Disney World",
        "info": "Who doesn't love this place?",
        "coordinates": {
            "lat": 28.385311,
            "lng": -81.564022
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    }
];
var mediumPlaces = [
    //These will only be places in North America
    {
        "name": "A Random Chick Fil A",
        "info": "Oh how I love Chick Fil A, One of my favorite fast food places to eat at.",
        "coordinates": {
            "lat": 41.718333,
            "lng": -88.126764
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Dave & Busters",
        "info": "Whats a Round1?",
        "coordinates": {
            "lat": 32.680811,
            "lng": -97.104504
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "McDonalds",
        "info": "Everyone knows a McDonalds.",
        "coordinates": {
            "lat": 47.060829,
            "lng": -109.432538
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "The Crawfish Pot & Oyster Bar",
        "info": "This is where I tried Crawfish for the first time.",
        "coordinates": {
            "lat": 29.651531,
            "lng": -95.251680
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Whataburger",
        "info": "The McDonalds of Texas.",
        "coordinates": {
            "lat": 29.491216,
            "lng": -98.704880
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Franklin, Tennessee",
        "info": "Where I might live in the future.",
        "coordinates": {
            "lat": 35.917390,
            "lng": -86.868190
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "In-N-Out Burger",
        "info": "I Still need to try this Place.",
        "coordinates": {
            "lat": 34.067790,
            "lng": -117.973513
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Hilton Head Island South Carolina",
        "info": "A great Island to take a vacation on in South Carolina.",
        "coordinates": {
            "lat": 32.206675,
            "lng": -80.732926
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Lewis University",
        "info": "Where I attend College.",
        "coordinates": {
            "lat": 41.604803,
            "lng": -88.080467
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Marco Island, Florida",
        "info": "Last beach vacation I had.",
        "coordinates": {
            "lat": 25.936186,
            "lng": -81.731030
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    }
];
var hardPlaces = [
    //These places can be anywhere in the World
    {
        "name": "A Random Chick Fil A",
        "info": "Oh how I love Chick Fil A, One of my favorite fast food places to eat at.",
        "coordinates": {
            "lat": 41.718333,
            "lng": -88.126764
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Dave & Busters",
        "info": "Whats a Round1?",
        "coordinates": {
            "lat": 32.680811,
            "lng": -97.104504
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "McDonalds",
        "info": "Everyone knows a McDonalds.",
        "coordinates": {
            "lat": 47.060829,
            "lng": -109.432538
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "The Crawfish Pot & Oyster Bar",
        "info": "This is where I tried Crawfish for the first time.",
        "coordinates": {
            "lat": 29.651531,
            "lng": -95.251680
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Whataburger",
        "info": "The McDonalds of Texas.",
        "coordinates": {
            "lat": 29.491216,
            "lng": -98.704880
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Franklin, Tennessee",
        "info": "Where I might live in the future.",
        "coordinates": {
            "lat": 35.917390,
            "lng": -86.868190
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "In-N-Out Burger",
        "info": "I Still need to try this Place.",
        "coordinates": {
            "lat": 34.067790,
            "lng": -117.973513
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Hilton Head Island South Carolina",
        "info": "A great Island to take a vacation on in South Carolina.",
        "coordinates": {
            "lat": 32.206675,
            "lng": -80.732926
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Lewis University",
        "info": "Where I attend College.",
        "coordinates": {
            "lat": 41.604803,
            "lng": -88.080467
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    },
    {
        "name": "Marco Island, Florida",
        "info": "Last beach vacation I had.",
        "coordinates": {
            "lat": 25.936186,
            "lng": -81.731030
        },
        "image": "something.png", //Images are for future use, if someone ever wants to use a custom image
        "chosen": false
    }
];


//This is where the Logic Starts
var checkIfWon = function(){ //Game Stops Once 10 Places Are Found
    placesChecked += 1;
    if(placesChecked >= 10){
        gameWon = true;
        console.log('Game Won!');
    }
}
var launch = function() {
    document.getElementById("header").innerHTML = "Welcome to Gabe's Map Mania!";
    start.open();
}
var canStartGame = function(){
    if(!document.getElementById("easyButton").checked && !document.getElementById("mediumButton").checked && 
    !document.getElementById("hardButton").checked && !document.getElementById("extremeButton").checked){
        console.log("none checked!!");
        return false;
    }else{
        if(document.getElementById("easyButton").checked){difficulty = "Easy"}
        if(document.getElementById("mediumButton").checked){difficulty = "Medium"}
        if(document.getElementById("hardButton").checked){difficulty = "Hard"}
        if(document.getElementById("extremeButton").checked){difficulty = "Extreme"}
        console.log(difficulty);
        return true;
    }
}
var launchContinued = function(){
    currentPlace = getRandomPlace(difficulty);
    gameStarted = true; 
    startClock();
}

function initMap() {
    // Where the map initiates
    gMap = new google.maps.Map(document.getElementById("myMapID"), {
        center:{lat: 41.878, lng: 10}, zoom: 3});
    
    google.maps.event.addListener(gMap, "idle", function() {
        updateGame();
    });
    SetScore(score);
}
function updateGame() {
    zoomLevel = gMap.getZoom();
    console.log("You have moved the map!!");
    inBounds = false;

    //Checks if your in bounds
    if(gameStarted){
        if(gMap.getBounds().contains(currentPlace.coordinates) || cheat === true){
            inBounds = true;
            if(zoomLevel === 8 || cheat === true){
                //Your Flag Will Spawn here -- For future reference
                markLocation = new google.maps.Marker({position:{lat:currentPlace.coordinates.lat,lng:currentPlace.coordinates.lng}, map:gMap});
                console.log(currentPlace.info);
                infoWindow = new google.maps.InfoWindow({content:currentPlace.info});
                markLocation.addListener('click', function(){
                    infoWindow.open(gMap, markLocation);
                });
                currentPlace = getRandomPlace(difficulty);
                checkIfWon();
            }   
        }
    }

    console.log("You are in bounds: " + inBounds+".");
    console.log("Your current zoom level is "+ zoomLevel+".");
    updateVolume();
}
function SetScore() {
    document.getElementById("score-id").value = score; 
}
var getRandomPlace = function(difficulty){
    var randomNum, length, objectArr, randomLat, randomLng, info;
    var validPlace = false;
    var objectArr = {
        "name": "",
        "info": "",
        "coordinates": {
            "lat": 0,
            "lng": 0
        },
        "image": "something.png"
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
        objectArr.name = "No Name";
        objectArr.info = "Sorry But Extreme Difficulty Does Not Give Any Info.";
        objectArr.coordinates.lat = (Math.random() * 180) - 90;
        objectArr.coordinates.lng = (Math.random() * 360) - 180;
        //console.log(objectArr);
    }else{
        console.log("Difficulty Invalid.");
    }
    while(validPlace === false && difficulty != "Extreme" && difficulty != ""){
        randomNum = Math.floor(Math.random() * length);
        if(objectArr[randomNum].chosen === false){
            objectArr[randomNum].chosen = true;
            validPlace = true;
            objectArr = objectArr[randomNum];
        }
    }
    console.log(objectArr);
    return objectArr;
}

var updateVolume = function(){
    if(inBounds === false){
        themeSong.volume = 0;
    }else if(inBounds === true && (zoomLevel == 7 || zoomLevel == 9)){
        themeSong.volume = 1;
    }else if(inBounds === true && (zoomLevel == 6 || zoomLevel == 10)){
        themeSong.volume = 0.75;
    }else if(inBounds === true && (zoomLevel == 5 || zoomLevel == 11)){
        themeSong.volume = 0.5;
    }else if(inBounds === true && (zoomLevel == 4 || zoomLevel == 12)){
        themeSong.volume = 0.25;
    }else if(inBounds === true && (zoomLevel == 3 || zoomLevel == 13)){
        themeSong.volume = 0.05;
    }else if(inBounds === true && (zoomLevel == 2 || zoomLevel == 14)){
        themeSong.volume = 0.03;
    }else if(inBounds === true && (zoomLevel == 1 || zoomLevel == 15)){
        themeSong.volume = 0.02;
    }else{
        themeSong.volume = 0.01;
    }
}
var startClock = function(){
    setInterval(function(){
        if(!gameWon){
            score += 1;
            SetScore();
        }
    }, 10);
}
var restart = function(){
    location.reload();
}
