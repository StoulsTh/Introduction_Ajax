var titre;
var artiste;
var prix;
var information;
var format;
var image;
 
function Init() {
	titre = document.getElementById("titre");
  artiste = document.getElementById("artiste");
  prix = document.getElementById("prix");
  information = document.getElementById("info");
  format = document.getElementById("typefichier");
  image = document.getElementById("peinture");
}

function ChargerInfo(el) {
  var code = el.value;

  var xhr = new XMLHttpRequest();
  var infoText = new XMLHttpRequest();

  ClearMessage();
  
  xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 200) {
      if (format.value == "json")
        DisplayJSONResponse(JSON.parse(xhr.responseText),code);
      else
        DisplayXMLResponse(xhr.responseXML,code);
		}
	}

  infoText.onreadystatechange = function() {
		if (infoText.readyState == 4 && infoText.status == 200) {
      information.appendChild(document.createTextNode(infoText.responseText));
		}
	}

  if (format.value == "json")
    xhr.open("GET", "./ajax/peintures.json", true);
  else
    xhr.open("GET", "./ajax/peintures.xml", true);

  infoText.open("GET", "./ajax/" + code + ".txt", true);

	xhr.send();
  infoText.send();
}


function DisplayJSONResponse(json,code) {

  var peinture = json.peinture;
  var codeNumber = 0;
  for (i = 0; i < peinture.length; i++)
  {
    
    if(peinture[i].code == code)
      codeNumber = i;
  }
  
  image.src = "./img/" + peinture[codeNumber].image;
  titre.appendChild(document.createTextNode(peinture[codeNumber].titre));
  artiste.appendChild(document.createTextNode(peinture[codeNumber].artiste));
  prix.appendChild(document.createTextNode(peinture[codeNumber].prix));
}

function DisplayXMLResponse(xml,code) {

  var peinture = xml.getElementsByTagName("peinture");

  var codeNumber = 0;
  for (i = 0; i < peinture.length; i++)
  {
    if(peinture[i].getElementsByTagName("code")[0].firstChild.nodeValue == code)
      codeNumber = i;
  }
  
  image.src = "./img/" + peinture[codeNumber].getElementsByTagName("image")[0].firstChild.nodeValue;
  titre.appendChild(document.createTextNode(peinture[codeNumber].getElementsByTagName("titre")[0].firstChild.nodeValue));
  artiste.appendChild(document.createTextNode(peinture[codeNumber].getElementsByTagName("artiste")[0].firstChild.nodeValue));
  prix.appendChild(document.createTextNode(peinture[codeNumber].getElementsByTagName("prix")[0].firstChild.nodeValue));
}




function ClearMessage() {
	while (titre.firstChild) {
		titre.removeChild(titre.firstChild);
	}
  while (artiste.firstChild) {
		artiste.removeChild(artiste.firstChild);
	}
  while (prix.firstChild) {
		prix.removeChild(prix.firstChild);
	}
  while (information.firstChild) {
		information.removeChild(information.firstChild);
	}
}
