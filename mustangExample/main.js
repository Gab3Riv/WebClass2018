var contactURLArray = [];

var loadIndex = function(){
    console.log("working");

    var indexRequest = new XMLHttpRequest();
    indexRequest.open("GET", "https://mustang-index.azurewebsites.net/index.json");
    indexRequest.onload = function(){
        console.log("Got Index From Web " + indexRequest.responseText);
        var contactIndex = JSON.parse(indexRequest.responseText);
        console.log(contactIndex);
        for(var i = 0; i<contactIndex; i+=1){
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        console.log(contactURLArray);
        document.getElementById("data").innerHTML = "Index: " + indexRequest.responseText;
    }
    indexRequest.send();
    console.log("After open");
}
var loadContacts = function(){
    document.getElementById("contacts").innerHTML = "Contacts: " + "Added Contacts";
    contactURLArray.length = 0;
    loadingContact = 0;

    if(contactURLArray.length > loadingContact){
        loadNextContact(contactURLArray[loadingContact]);
    }
}