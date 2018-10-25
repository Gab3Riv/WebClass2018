var gMap, currentPlace, markLocation, infoWindow, inBounds, zoomLevel;
var difficulty = "";
var markerArray = ["","","","","","","","","",""];
var infoArray = ["","","","","","","","","",""];
var listenersArray = ["","","","","","","","","",""];
var gameStarted, gameWon, cheat, stopScore = false;
var score = 0;
var placesChecked = 0;
themeSong = new Audio('theme.mp3'); 
themeSong.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
themeSong.play();
themeSong.volume = 0.01;

var enableCheat = function(){
    stopScore = true;
    if(!gameWon){
        cheat = true;
        updateGame();
        console.log("You cheated");
        cheat = false;
    }
}

//Game has been programmed to work with each difficulty.
//These will only be places in United States
//Images are for future use, if someone ever wants to use a custom image
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
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "McDonalds",
        "info": "Everyone knows a McDonalds.",
        "coordinates": {
            "lat": 47.060829,
            "lng": -109.432538
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "The Crawfish Pot & Oyster Bar",
        "info": "This is where I tried Crawfish for the first time.",
        "coordinates": {
            "lat": 29.651531,
            "lng": -95.251680
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Whataburger",
        "info": "The McDonalds of Texas.",
        "coordinates": {
            "lat": 29.491216,
            "lng": -98.704880
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Franklin, Tennessee",
        "info": "Where I might live in the future.",
        "coordinates": {
            "lat": 35.917390,
            "lng": -86.868190
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "In-N-Out Burger",
        "info": "I Still need to try this Place.",
        "coordinates": {
            "lat": 34.067790,
            "lng": -117.973513
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Hilton Head Island South Carolina",
        "info": "A great Island to take a vacation on in South Carolina.",
        "coordinates": {
            "lat": 32.206675,
            "lng": -80.732926
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Lewis University",
        "info": "Where I attend College.",
        "coordinates": {
            "lat": 41.604803,
            "lng": -88.080467
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Marco Island, Florida",
        "info": "Last beach vacation I had.",
        "coordinates": {
            "lat": 25.936186,
            "lng": -81.731030
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Disney World",
        "info": "Who doesn't love this place?",
        "coordinates": {
            "lat": 28.385311,
            "lng": -81.564022
        },
        "image": "something.png", 
        "chosen": false
    }
];
//Images are for future use, if someone ever wants to use a custom image
//These will only be places in North America
var mediumPlaces = [
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
        "image": "something.png",
        "chosen": false
    },
    {
        "name": "McDonalds",
        "info": "Everyone knows a McDonalds.",
        "coordinates": {
            "lat": 47.060829,
            "lng": -109.432538
        },
        "image": "something.png",
        "chosen": false
    },
    {
        "name": "The Crawfish Pot & Oyster Bar",
        "info": "This is where I tried Crawfish for the first time.",
        "coordinates": {
            "lat": 29.651531,
            "lng": -95.251680
        },
        "image": "something.png",
        "chosen": false
    },
    {
        "name": "Whataburger",
        "info": "The McDonalds of Texas.",
        "coordinates": {
            "lat": 29.491216,
            "lng": -98.704880
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Franklin, Tennessee",
        "info": "Where I might live in the future.",
        "coordinates": {
            "lat": 35.917390,
            "lng": -86.868190
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "In-N-Out Burger",
        "info": "I Still need to try this Place.",
        "coordinates": {
            "lat": 34.067790,
            "lng": -117.973513
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Hilton Head Island South Carolina",
        "info": "A great Island to take a vacation on in South Carolina.",
        "coordinates": {
            "lat": 32.206675,
            "lng": -80.732926
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Lewis University",
        "info": "Where I attend College.",
        "coordinates": {
            "lat": 41.604803,
            "lng": -88.080467
        },
        "image": "something.png",
        "chosen": false
    },
    {
        "name": "Marco Island, Florida",
        "info": "Last beach vacation I had.",
        "coordinates": {
            "lat": 25.936186,
            "lng": -81.731030
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Haida Gwaii - British Columbia – Canada",
        "info": "Haida Gwaii - Canada | 1st Best Place To Visit In North America",
        "coordinates": {
            "lat": 53.100507,
            "lng": -132.042346
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Coronach – Saskatchewan – Canada",
        "info": "Coronach – Canada | 2nd Best Place To Visit In North America",
        "coordinates": {
            "lat": 49.114056,
            "lng": -105.522770
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Banff/Lake Louise – Alberta – Canada",
        "info": "Alberta – Canada | 3rd Best Place To Visit In North America",
        "coordinates": {
            "lat": 51.424521,
            "lng": -116.177062
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Tamul Falls, Mexico",
        "info": "One of the Top places to visit in North America.",
        "coordinates": {
            "lat": 21.809320,
            "lng": -99.177596
        },
        "image": "something.png", 
        "chosen": false
    }
];
//These places can be anywhere in the World
//Images are for future use, if someone ever wants to use a custom image
var hardPlaces = [
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
        "image": "something.png",
        "chosen": false
    },
    {
        "name": "McDonalds",
        "info": "Everyone knows a McDonalds.",
        "coordinates": {
            "lat": 47.060829,
            "lng": -109.432538
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "The Crawfish Pot & Oyster Bar",
        "info": "This is where I tried Crawfish for the first time.",
        "coordinates": {
            "lat": 29.651531,
            "lng": -95.251680
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Whataburger",
        "info": "The McDonalds of Texas.",
        "coordinates": {
            "lat": 29.491216,
            "lng": -98.704880
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Franklin, Tennessee",
        "info": "Where I might live in the future.",
        "coordinates": {
            "lat": 35.917390,
            "lng": -86.868190
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "In-N-Out Burger",
        "info": "I Still need to try this Place.",
        "coordinates": {
            "lat": 34.067790,
            "lng": -117.973513
        },
        "image": "something.png",
        "chosen": false
    },
    {
        "name": "Hilton Head Island South Carolina",
        "info": "A great Island to take a vacation on in South Carolina.",
        "coordinates": {
            "lat": 32.206675,
            "lng": -80.732926
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Lewis University",
        "info": "Where I attend College.",
        "coordinates": {
            "lat": 41.604803,
            "lng": -88.080467
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Marco Island, Florida",
        "info": "Last beach vacation I had.",
        "coordinates": {
            "lat": 25.936186,
            "lng": -81.731030
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Haida Gwaii - British Columbia – Canada",
        "info": "Haida Gwaii - Canada | 1st Best Place To Visit In North America",
        "coordinates": {
            "lat": 53.100507,
            "lng": -132.042346
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Coronach – Saskatchewan – Canada",
        "info": "Coronach – Canada | 2nd Best Place To Visit In North America",
        "coordinates": {
            "lat": 49.114056,
            "lng": -105.522770
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Banff/Lake Louise – Alberta – Canada",
        "info": "Alberta – Canada | 3rd Best Place To Visit In North America",
        "coordinates": {
            "lat": 51.424521,
            "lng": -116.177062
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Tamul Falls, Mexico",
        "info": "One of the Top places to visit in North America.",
        "coordinates": {
            "lat": 21.809320,
            "lng": -99.177596
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Portugal",
        "info": "A Country I Would Like To Visit In The Future.",
        "coordinates": {
            "lat": 39.381302,
            "lng": -8.232327
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Ecuador",
        "info": "Another Country I'd Like To Visit.",
        "coordinates": {
            "lat": -0.854855,
            "lng": -78.421897
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Thailand",
        "info": "A Country In Asia I Would Like To Visit.",
        "coordinates": {
            "lat": 16.186181,
            "lng": 101.516571
        },
        "image": "something.png", 
        "chosen": false
    },
    {
        "name": "Italy",
        "info": "I Would Like To Try Authentic Food From Italy One Day.",
        "coordinates": {
            "lat": 44.135449,
            "lng": 10.746128
        },
        "image": "something.png", 
        "chosen": false
    }

];
//This is where the Logic Starts
var checkIfWon = function(){ //Game Stops Once 10 Places Are Found
    placesChecked += 1;
    if(placesChecked >= 10){
        gameWon = true;
    }
}
var launch = function() {
    document.getElementById("header").innerHTML = "Welcome to Gabe's Map Mania!";
    start.open();
}
var canStartGame = function(){
    if(!document.getElementById("easyButton").checked && !document.getElementById("mediumButton").checked && 
    !document.getElementById("hardButton").checked && !document.getElementById("extremeButton").checked){
        return false;
    }else{
        if(document.getElementById("easyButton").checked){difficulty = "Easy"}
        if(document.getElementById("mediumButton").checked){difficulty = "Medium"}
        if(document.getElementById("hardButton").checked){difficulty = "Hard"}
        if(document.getElementById("extremeButton").checked){difficulty = "Extreme"}
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
    setScore(score);
}
function updateGame() {
    zoomLevel = gMap.getZoom();
    inBounds = false;

    //Checks if your in bounds
    if(gameStarted){
        if(gMap.getBounds().contains(currentPlace.coordinates) || cheat === true){
            inBounds = true;
            if(zoomLevel === 8 || cheat === true){
                //Your Flag Will Spawn here -- For future reference
                var index = placesChecked;
                markerArray[placesChecked] = new google.maps.Marker({position:{lat:currentPlace.coordinates.lat,lng:currentPlace.coordinates.lng}, map:gMap});
                infoArray[placesChecked] = new google.maps.InfoWindow({content:currentPlace.info});
                
                markerArray[index].addListener('click', function(){
                    infoArray[index].open(gMap, markerArray[index]);
                });
                currentPlace = getRandomPlace(difficulty);
                checkIfWon();
            }   
        }
    }
    updateVolume();
}
function setScore() {
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
        if(!gameWon && !stopScore){
            score += 1;
            setScore();
        }else{
            console.log("Did this work?");
            score = 0;
            setScore();
        }
    }, 10);
}
var restart = function(){
    location.reload();
}
