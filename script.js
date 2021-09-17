/*var name = "Mimi Keel";
var country = "UK";

a = '<div class="photographes">'${name}'</div><div>'${country}'</div> <img src="mimikeel.jpg">'

document.querySelector(".toto").innerHTML(a);*/

function photographersList() {
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
div.append();


