//fetch de json photographer pour la div info de la section photographers-profile
fetch("photographers.json")
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function(jsonObj) {
    const photographers = jsonObj["photographers"];

    // get photographer's id in url
    let queryString = window.location.search;
    let urlParams = new URLSearchParams(queryString);
    let photographerId = urlParams.get("id");
    var currentPhotographer;

    //console.log(photographerId);

    photographers.forEach(function(photographer) {
      if (photographer["id"]==photographerId) {
        currentPhotographer = photographer;

        let photographerDiv = document.createElement("div");
        photographerDiv.classList.add("photographe");
        let button = document.createElement("button");
        button.setAttribute("id", "contactme");
        let avatarDiv = document.createElement("div");
        avatarDiv.classList.add("avatar");
        let info = document.getElementById("info");

        photographerDiv.innerHTML = `<div class="left-info"><h1 class="name">${photographer.name}</h1><br>
        <h2 href="photographer.html?id=${photographer.id}">${photographer.city}, ${photographer.country}</h2>
        <p>${photographer.tagline}</p><a>#${photographer.tags}</a></div>`;
        button.innerHTML = "Contactez-moi";  
        avatarDiv.innerHTML = `<div><img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}"</div>`;

        info.appendChild(photographerDiv);
        info.appendChild(button);
        info.appendChild(avatarDiv);  
        }    
    });
        const media = jsonObj["media"];
    //console.log(media);

    //créer variable pour compter les likes
    let likes = 0;
    
    media.forEach(function(medium) {
      if (medium["photographerId"]==photographerId) {

        //ajouter le nombre de likes de medium à la variable des likes globale
        likes += medium["likes"];
        
        let photos = document.getElementById("photos");
        let mediaDiv = document.createElement("div");
        mediaDiv.classList.add("mediadiv");
    
        //vérifier que medium["image"] existe, si oui on fait avec medium["image"] sinon avec medium["video"]
        if (medium["image"]) {
          mediaDiv.innerHTML = '<a>' + '<img src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["image"] + '"/>' + '</a>' + '<div class="title">' + '<p>' + medium["title"] + '</p>' + '<div class="likes-counter">' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        }
        else if (medium["video"]) {
          mediaDiv.innerHTML = '<video controls="controls" preload="auto" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["video"] + '"/>' + '</video>' + '<div class="title">' + '<p>' + medium["title"] + '</p>' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        }      
      }
    })
    //total likes and price
    let totalLikes = document.getElementById("total-likes");
    let likesDiv = document.createElement("div");

    likesDiv.classList.add("likesdiv");
    likesDiv.innerHTML = '<p>' + '' + '</p>' + likes + '<i class="fas fa-heart heart">' + '/' + 'jour';
    totalLikes.appendChild(likesDiv);
    

    // event listener on the heart icon in order to count likes
    let hearts = document.querySelectorAll(".heart");
    let allLikes = likes;
    //console.log(allLikes);
    
    hearts.forEach(heart => {
      heart.addEventListener('click', function(e) {
      let counter = e.target.previousSibling;
      counter.innerHTML = parseInt(counter.innerHTML) + 1;
      //sélectionner compteur global et ajouter 1 de la même manière
      allLikes.innerHTML =  parseInt(allLikes.innerHTML) + 1;  
      
      })
    })
  })

//fill-in form launch

//DOM elements
const formBackground = document.querySelector(".background");
//const contactBtn = document.querySelector("#contactme");
const userInfo = document.querySelectorAll(".user-info");
const closeFormBtn = document.querySelector(".close");

// launch form event --> event delegation with <div id="info">
const info = document.getElementById("info");

info.addEventListener('click', function(e){
  const target = e.target;
  if (target.matches("#contactme")) {
    formBackground.style.display = "block";
  }
});

// close form with 'x' span
closeFormBtn.addEventListener('click', function() {
    formBackground.style.display = "none";
  });

// close form - close with button 'Envoyer'
const closeButton = document.querySelector(".submit");
closeButton.addEventListener('click', function() {
    formBackground.style.display = "none";  
});








  
