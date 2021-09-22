/*var name = "Mimi Keel";
var country = "UK";

a = '<div class="photographes">'${name}'</div><div>'${country}'</div> <img src="mimikeel.jpg">'

document.querySelector(".toto").innerHTML(a);*/

/*function photographersList() {
    fetch("photographers.json")
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      document
          .getElementById("gallery")
          .innerText = value.queryString.name;
    })
    .catch(function(err) {
      // Une erreur est survenue
    });
  }
document
  .getElementById("tags-input")
  .addEventListener("click", photographersList);


const gallery = document.getElementById("gallery");
const div = document.createElement("div");
gallery.append(div);
div.innerHTML = photographers.name;

const photographerName = document.createElement("photographerName");
photographerName.innerText = photographers.name;
div.append(); */


/*function getJSON("photographers.json") {
    return get("photographers.json").then(JSON.parse);
}

function showPhotographers(photographer) {
    const gallery = document.getElementById("gallery");
    const div = document.createElement("div");
    div.innerHTML = photographers;
    return gallery.appendChild(div);
}*/


const gallery = document.getElementById("gallery");
const newElt = document.createElement("div");
gallery.innerHTML = "<ul><li>Elément 1</li><li>Elément 2</li></ul>";
gallery.appendChild(newElt); 
newElt.innerHTML = "hey";

fetch("/photographers.json")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value);
  })
  .catch(function(err) {

  });


const input = document.querySelector('input');
const log = document.getElementById('values');

input.addEventListener('input', updateValue);

function updateValue(e) {
  log.textContent = e.target.value;
}

