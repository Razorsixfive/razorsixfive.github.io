var PicArray = [];
var CurrentURL = undefined;
var Starthtml = '<img id="Mainimg">'

function checkValidSave(){
    for (let X = 0; X < PicArray.length; X++) {
        if (PicArray[X] == CurrentURL) {return false;}
    }
    return true;
}

function SavePhoto(){
    document.getElementById("SaveText").hidden = false;

    if(checkValidSave()){
        PicArray.push(CurrentURL);
    }
}

async function NewPhoto(){
    document.getElementById("SaveText").hidden = true;
    document.getElementById("SaveBtn").hidden = false;
    document.getElementById("PicBox").innerHTML = Starthtml;

    let response = await fetch('https://dog.ceo/api/breeds/image/random');
    let data = await response.json();
    document.getElementById('Mainimg').src = data.message;
    CurrentURL = data.message;
}

function ViewSaved(){
    document.getElementById("SaveText").hidden = true;
    document.getElementById("SaveBtn").hidden = true;

    var Doc = document.getElementById("PicBox");
    var html = "";
    document.getElementById("Mainimg").src = "";

    for (let X = 0; X < PicArray.length; X++) {
        html += '<div id="PicBoxSmall">'
        html += '<img id="img" src="'+PicArray[X]+'">'
        html += '<button class="Setting Button" style="float: left; margin-top: 10px; width: 30%; margin-left: 15%" onclick="DeletePicture('+"'"+PicArray[X]+"'"+')">Slet</button>'
        html += '<button class="Setting Button" style="float: right; margin-top: 10px; width: 30%; margin-right: 15%" onclick="SaveURL('+"'"+PicArray[X]+"'"+')">Kopier URL</button>'
        html += '</div>'
    }

    Doc.innerHTML = html;
}

function DeletePicture(URL){
    for (let X = 0; X < PicArray.length; X++) {
        if (PicArray[X] == URL) {
            PicArray.splice(X,1);
        }
    }

    ViewSaved();
}

function SaveURL(URL){
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = URL;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    alert("Copied!");
}
