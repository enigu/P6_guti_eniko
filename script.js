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


  photographerDiv.innerHTML = `<a href="photographer.html?id=${photographer.id}"><img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}"><h2 class="name">${photographer.name}</h2></a><div class="details"><p class="location">${photographer.city}, ${photographer.country}</p><p>${photographer.tagline}</p><p class="price">${photographer.price}€/jour</p><a class="hashtags">#${photographer.tags}</a></div>`;
  gallery.appendChild(photographerDiv);
  }) 
}

function generatePhotographers(photographers) {

  photographers.forEach(function(photographer) {
  
    let photographerDiv = document.createElement("div");
    let gallery = document.getElementById("gallery");

    photographerDiv.classList.add("photographe");

    //boucle on photographer.tags in order to put a  # in front of each tag on the photographers page
    const tags = photographer.tags;
    let hashPlusTag= []
    tags.forEach(tag => {
      tag = '#' + tag;
      hashPlusTag.push(tag);
    })
    
    //le lien avec l'id après le ? permet, sur le fichier js de la page de profil d'utiliser la fonction url.parse pour récupérer les variables
    let htmlPhotograph = `<a href="photographer.html?id=${photographer.id}">
      <img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}">
      <h2 class="name">${photographer.name}</h2>
    </a>
    <div class="details">
      <p class="location">${photographer.city} , ${photographer.country}</p>
      <p class="tagline">${photographer.tagline}</p>
      <p class="price">${photographer.price}€/jour</p>
      <div class="hashtags">`;

    hashPlusTag.forEach(tagHtml => {
    htmlPhotograph = htmlPhotograph + '<a class="tagList">' + tagHtml + '</a>';
    })

    photographerDiv.innerHTML = htmlPhotograph + '</div>';
    gallery.appendChild(photographerDiv);
  }) 
}













