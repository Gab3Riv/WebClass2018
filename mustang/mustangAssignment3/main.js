var contactURLArray = [];
var contactArray = [];
var loadingContact = 0;
var currentContactIndex = 0; 

var initApplication = function() {
    document.getElementById("nameID").value = "";   
    document.getElementById("emailID").value = "";   
    document.getElementById("cityID").value = "";   
    document.getElementById("stateID").value = "";
    document.getElementById("zipID").value = "";  
}

var setStatus = function(status){
    document.getElementById("statusID").innerHTML = status;    
}

var zipBlurFunction = function(){
    ZipToCityState();
}

var importContacts = function(){
    loadIndexAndContacts();
}

var saveContactsToServer = function(){
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            setStatus(this.responseText)
        }
    };
    xmlhttp.open("POST", "save-contacts.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("contacts=" + JSON.stringify(contactArray));   
}

var loadContactsFromServer = function(){
    contactArray.length = 0;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            contactArray = JSON.parse(this.responseText);
            setStatus("Loaded contacts (" + contactArray.length + ")");

            currentContactIndex = 0;
            viewCurrentContact()
        }
    };

    xmlhttp.open("GET", "load-contacts.php", true);
    xmlhttp.send();   
}

var viewCurrentContact = function(){
    currentContact = contactArray[currentContactIndex];
    document.getElementById("nameID").value = currentContact.preferredName;   
    document.getElementById("emailID").value = currentContact.email;   
    document.getElementById("cityID").value = currentContact.city;   
    document.getElementById("stateID").value = currentContact.state;
    document.getElementById("zipID").value = currentContact.zip;
    document.getElementById("statusID").innerHTML = "Viewing contact " + (currentContactIndex+1) + " of " + contactArray.length;
}

var previous = function(){
    if (currentContactIndex > 0) {
        currentContactIndex--;
    }
    currentContact = contactArray[currentContactIndex];
    if(currentContact != undefined){ //This line of code makes sure that nothing gets logged to the console with errors
        viewCurrentContact();
    }
}

var next = function(){
    if (currentContactIndex < (contactArray.length-1)) {
        currentContactIndex++;
    }
    currentContact = contactArray[currentContactIndex];
    if(currentContact != undefined){ //This line of code also makes sure that nothing gets logged to the console with errors
        viewCurrentContact();
    }
}

var ZipToCityState = function(){
    var zip = document.getElementById("zipID").value
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.responseText;
            var place = result.split(', ');
            if (document.getElementById("cityID").value == "")
                document.getElementById("cityID").value = place[0];
            if (document.getElementById("stateID").value == "")
                document.getElementById("stateID").value = place[1];
        }
    }
    xhr.open("GET", "zip-to-city-state.php?zip=" + zip);
    xhr.send(null);
}

var loadIndexAndContacts = function(){
    var indexRequest = new XMLHttpRequest();
    indexRequest.open('GET', 'https://mustang-index.azurewebsites.net/index.json');
    indexRequest.onload = function() {
        contactIndex = JSON.parse(indexRequest.responseText);
        for (i=0; i<contactIndex.length; i++) {
            contactURLArray.push(contactIndex[i].ContactURL);
        }
        loadContacts();
    }
    indexRequest.send();
}

var loadContacts = function(){
    contactArray.length = 0;
    loadingContact = 0;
    if (contactURLArray.length > loadingContact) {
        loadNextContact(contactURLArray[loadingContact]);
    }
}

var loadNextContact = function(URL){
    contactRequest = new XMLHttpRequest();
    contactRequest.open('GET', URL);
    contactRequest.onload = function() {
        var contact = JSON.parse(contactRequest.responseText);
        contactArray.push(contact);

        document.getElementById("statusID").innerHTML = "Loading " + contact.firstName + " " + contact.lastName;

        loadingContact++;
        if (contactURLArray.length > loadingContact) {
            loadNextContact(contactURLArray[loadingContact]);
        }
        else {
            document.getElementById("statusID").innerHTML = "Contacts Loaded (" + contactURLArray.length + ")";
            viewCurrentContact();
        }
    }
    contactRequest.send();
}

var submit = function(){ //Creates a new contact
    var tempJSONContact = {
        "preferredName": "",
        "email": "",
        "zip": "",
        "city": "",
        "state": ""
    }
    tempJSONContact.preferredName = document.getElementById("modalnameID").value;
    tempJSONContact.email = document.getElementById("modalemailID").value;
    tempJSONContact.zip = document.getElementById("modalzipID").value;
    tempJSONContact.city = document.getElementById("modalcityID").value;
    tempJSONContact.state = document.getElementById("modalstateID").value;
    contactArray.push(tempJSONContact);
    //This clears the Contact Modal
    document.getElementById("modalnameID").value = "";
    document.getElementById("modalemailID").value = "";
    document.getElementById("modalzipID").value = "";
    document.getElementById("modalcityID").value = "";
    document.getElementById("modalstateID").value = "";
    currentContactIndex = contactArray.length - 1;
    viewCurrentContact();
    add.close();
}

var deleteContact = function(){//deletes a contact
    contactArray.splice(currentContactIndex, 1);
    if(currentContactIndex != 0){//If it is not the first one it will go back 1 index
        currentContactIndex -= 1;
    }
    viewCurrentContact();
    remove.close();
}

var goToFirst = function(){ //Lets you go to the first contact to make it easier
    currentContactIndex = 0;
    viewCurrentContact();
}

var goToLast = function(){ //Lets you go to the last contact to make it easier
    currentContactIndex = contactArray.length -1;
    viewCurrentContact();
}

var logContacts = function() {
    console.log("ContactArray: ");
    console.log(contactArray);
}