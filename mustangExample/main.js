var loadIndex = function(){
    console.log("working");

    var indexRequest = new XMLHttpRequest();
    indexRequest.open("GET", "https://mustang-index.azurewebsites.net/index.json");
    indexRequest.onload = function(){
        console.log("Got Index From Web " + indexRequest.responseText);
        document.getElementById("data").innerHTML = "Index: " + indexRequest.responseText;
    }
    indexRequest.send();
    console.log("After open");
}
var loadContacts = function(){
    document.getElementById("contacts").innerHTML = "Contacts: " + "Added Contacts";
}