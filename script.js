fetch("photographers.json")
.then(function(response) {
  if(response.ok) {
    return response.json();
}
})
.then(function(jsonObj) {
  const photographers = jsonObj["photographers"];

  const tagContainer = document.querySelector('.tag-container');
  var tags = ["portrait", "event", "travel", "animals", "sports", "art", "fashion", "architecture"];

  let tagList = document.querySelectorAll(".tag");
  let gallery = document.querySelector("#gallery");

  for (let i = 0; i < tagList.length; i++) {
    tagList[i].addEventListener("click", function(e) {
      let tagName = e.target.getAttribute("tag");

      tagList.forEach(tag => {
        tag.classList.remove("selected");
      })
      e.target.classList.add("selected");

      //lancer fonction qui efface les photographes qui n'ont pas le tag et affiche ceux qui l'ont
      gallery.innerHTML = "";

      photographers.forEach(function(photographer) {
        if (photographer["tags"].includes(tagName)) {
          let photographerDiv = document.createElement("div");
          let gallery = document.getElementById("gallery");
          photographerDiv.classList.add("photographe");
      
          photographerDiv.innerHTML = `<div><img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}"><br><a class="name">${photographer.name}</a><br><a href="photographer.html?id=${photographer.id}">${photographer.city}, ${photographer.country}</a><p>${photographer.tagline}</p><p>${photographer.price}€/jour</p><p>#${photographer.tags}</p></div>`;
          //le lien avec l'id après le ? qui permet, sur le fichier js de ta page de profil d'utiliser la fonction url.parse pour récupérer les variables
          gallery.appendChild(photographerDiv);
        }
    })  
    })
  }

  generatePhotographers(photographers);
  //addTags();
})

function parsePhotographers(photographers, tag) {
let photographerDiv = document.createElement("div");
let gallery = document.getElementById("gallery");

photographers.forEach(function(photographer) {

 (array.includes(""))
 //vérifier que dans le tableau photographer["tags"] il existe le tag contenu dans la variable tag
  //if photographer["tags"].includes("tagname")
  photographerDiv.classList.add("photographe");
  photographerDiv.innerHTML = `<div><img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}"><br><a class="name">${photographer.name}</a><br><a href="photographer.html?id=${photographer.id}">${photographer.city}, ${photographer.country}</a><p>${photographer.tagline}</p><p>${photographer.price}€/jour</p><p>#${photographer.tags}</p></div>`;
  gallery.appendChild(photographerDiv);
  }) 
}

function generatePhotographers(photographers) {
  //let tag = photographers.tags;

  photographers.forEach(function(photographer) {
  
    let photographerDiv = document.createElement("div");
    let gallery = document.getElementById("gallery");

    photographerDiv.classList.add("photographe");

    console.log(photographer["tags"]);

    photographerDiv.innerHTML = `<div><img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}"><br><a class="name">${photographer.name}</a><br><a href="photographer.html?id=${photographer.id}">${photographer.city}, ${photographer.country}</a><p>${photographer.tagline}</p><p>${photographer.price}€/jour</p><p>#${photographer.tags}</p></div>`;
    //le lien avec l'id après le ? qui permet, sur le fichier js de ta page de profil d'utiliser la fonction url.parse pour récupérer les variables
    gallery.appendChild(photographerDiv);
  }) 
}













