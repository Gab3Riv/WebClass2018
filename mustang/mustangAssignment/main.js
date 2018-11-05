var contactURLArray = [];
var contactsArray = [];

var loadIndex = function(){
    var indexRequest = new XMLHttpRequest();
    indexRequest.open("GET", "https://mustang-index.azurewebsites.net/index.json");
    indexRequest.onload = function(){
        var contactIndex = JSON.parse(indexRequest.responseText);
        for(var i = 0; i<contactIndex.length; i+=1){
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        document.getElementById("data").innerHTML = "Index: " + indexRequest.responseText;
    }
    indexRequest.send();
}
var loadContacts = function(){
    document.getElementById("contacts").innerHTML = "Contacts: ";
    var indexRequest = new XMLHttpRequest();
    for(var i=0;i<contactURLArray.length;i+=1){
        indexRequest.open("GET", contactURLArray[i], false);
        indexRequest.onload = function(){
            document.getElementById("contacts").innerHTML += "<br><div class='cards'>" + indexRequest.responseText + "</div><br>";
            contactsArray.push(JSON.parse(indexRequest.response));
        }
        indexRequest.send();
    }
}
/*
var loadContacts = function(){
    document.getElementById("contacts").innerHTML = "Contacts: " + "Added Contacts";
    contactURLArray.length = 0;
    loadingContact = 0;

    if(contactURLArray.length > loadingContact){
        loadNextContact(contactURLArray[loadingContact]);
    }
}
*/