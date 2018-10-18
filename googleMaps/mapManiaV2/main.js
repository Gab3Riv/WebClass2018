var gMap, currentPlace, markLocation;
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
        "name": "McDonalds",
        "info": "Everyone knows a McDonalds.",
        "coordinates": {
            "lat": 47.060829,
            "lng": -109.432538
        },
        "chosen": false
    },
    {
        "name": "The Crawfish Pot & Oyster Bar",
        "info": "This is where I tried Crawfish for the first time.",
        "coordinates": {
            "lat": 29.651531,
            "lng": -95.251680
        },
        "chosen": false
    },
    {
        "name": "Whataburger",
        "info": "The McDonalds of Texas.",
        "coordinates": {
            "lat": 29.491216,
            "lng": -98.704880
        },
        "chosen": false
    },
    {
        "name": "Franklin, Tennessee",
        "info": "Where I might live in the future.",
        "coordinates": {
            "lat": 35.917390,
            "lng": -86.868190
        },
        "chosen": false
    },
    {
        "name": "In-N-Out Burger",
        "info": "I Still need to try this Place.",
        "coordinates": {
            "lat": 34.067790,
            "lng": -117.973513
        },
        "chosen": false
    },
    {
        "name": "Hilton Head Island South Carolina",
        "info": "A great Island to take a vacation on in South Carolina.",
        "coordinates": {
            "lat": 32.206675,
            "lng": -80.732926
        },
        "chosen": false
    },
    {
        "name": "Lewis University",
        "info": "Where I attend College.",
        "coordinates": {
            "lat": 41.604803,
            "lng": -88.080467
        },
        "chosen": false
    },
    {
        "name": "Marco Island, Florida",
        "info": "Last beach vacation I had.",
        "coordinates": {
            "lat": 25.936186,
            "lng": -81.731030
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

var checkIfWon = function(){
    var placesChecked = 0;
    for (var i in easyPlaces.chosen){
        placesChecked+=1;
    }
    console.log(placesChecked);
}

function launch() {
    document.getElementById("header").innerHTML = "Welcome to Gabriel's Map Mania!";
    //CHANGE THIS LATER
    currentPlace = getRandomPlace("Easy");
    gameStarted = true; 
}
function initMap() {
    // Where the map initiates
    gMap = new google.maps.Map(document.getElementById("myMapID"), {
        center:{lat: 41.878, lng: 10}, zoom: 3});

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

    checkIfWon();
    //Checks if your in bounds
    if(gameStarted){
        if(gMap.getBounds().contains(currentPlace.coordinates)){
            inBounds = true;
            if(zoomLevel === 8){
                //Your Flag Will Spawn here -- For future reference
                markLocation = new google.maps.Marker({position:{lat:currentPlace.coordinates.lat,lng:currentPlace.coordinates.lng}, map:gMap});
                currentPlace = getRandomPlace("Easy");
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

    //This is just for testing purposes
    objectArr.name = "No Name";
    objectArr.info = "Sorry But Extreme Difficulty Does Not Give Any Info.";
    objectArr.coordinates.lat = (Math.random() * 180) - 90;
    objectArr.coordinates.lng = (Math.random() * 360) - 180;
    //console.log(objectArr);

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
    while(validPlace === false){
        randomNum = Math.floor(Math.random() * length);
        if(objectArr[randomNum].chosen === false){
            objectArr[randomNum].chosen = true;
            validPlace = true;
        }
    }
    console.log(objectArr[randomNum]);
    return objectArr[randomNum];
}


