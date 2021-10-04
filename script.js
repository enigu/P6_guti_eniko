let photographers = "";
fetch("photographers.json")
.then(function(response) {
  if(response.ok) {
    return response.json();
}
})
.then(function(jsonObj) {
  //let tags = [""];

  generatePhotographers(jsonObj["photographers"]);
  //addTags();

})



function generatePhotographers(photographers) {
    //console.log(jsonObj);
  //console.log(jsonObj["photographers"]);
  //let tag = photographers.tags;

  photographers.forEach(function(photographer) {
  
    let photographerDiv = document.createElement("div");
    let gallery = document.getElementById("gallery");

    photographerDiv.classList.add("photographe");

    //html.innerHTML = '<img src="./Sample Photos/Photographers ID Photos/' + photographer["portrait"] + '"><div class="name">' + photographer["name"] + '</div>';
    photographerDiv.innerHTML = `<div><img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}"><a class="name">${photographer.name}</a><a href="photographer.html?id=${photographer.id}"></a><a href="#">${photographer.city}, ${photographer.country}</a><p>${photographer.tagline}</p><p>${photographer.price}€/jour</p><p>#${photographer.tags}</p></div>`;
    //le lien avec l'id après le ? qui permet, sur le fichier js de ta page de profil d'utiliser la fonction url.parse pour récupérer les variables
    gallery.appendChild(photographerDiv);
  }) 
}



/*
<div class="tag">
    <span>javascript</span>
    <i class="fas fa-hashtag"></i>
</div>
*/

const tagContainer = document.querySelector('.tag-container');
const input = document.querySelector('.tag-container input');

var tags = []

function createTag(label) {
  const div = document.createElement('div');
  div.setAttribute('class', 'tag');
  const span = document.createElement('span');
  span.innerHTML = label ;
  const hashTag = document.createElement('i');
  hashTag.setAttribute('class', 'fa-hashtag');

  div.appendChild(span);
  div.appendChild(hashTag);
  return div;
}

function reset() {
  document.querySelectorAll('.tag').forEach(function(tag) {
    tag.parentElement.removeChild(tag);
  })
}

function addTags() {
  reset();
  tags.forEach(function(tag){
    const input = createTag(tag);
    tagContainer.prepend(input);

  })
}

input.addEventListener('keyup', function(e) {
  if(e.key === 'Enter') {
    tags.push(input.value);
    addTags();
    input.value = '';
  }

})








