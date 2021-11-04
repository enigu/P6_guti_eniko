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
          //button.classList.add("contactme");
          button.setAttribute("id", "contactme");
          let avatarDiv = document.createElement("div");
          avatarDiv.classList.add("avatar");
          let info = document.getElementById("info");

          photographerDiv.innerHTML = `<div><a class="name">${photographer.name}</a><br>
          <a href="photographer.html?id=${photographer.id}">${photographer.city}, ${photographer.country}</a>
          <p>${photographer.tagline}</p><p>${photographer.price}€/jour</p><p>#${photographer.tags}</p></div>`;
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
    //let likes = 0;

    media.forEach(function(medium) {
      if (medium["photographerId"]==photographerId) {

        //ajouter le nombre de likes de medium à la variable des likes globale
        //likes += medium["likes"];

          let photos = document.getElementById("photos");
          let mediaDiv = document.createElement("div");
          mediaDiv.classList.add("mediadiv");
            
            //vérifier que medium["image"] existe, si oui on fait avec medium["image"] sinon avec medium["video"]
            if (medium["image"]) {
              mediaDiv.innerHTML = '<img src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["image"] + '"/> '+ '<div class="title">' + '<p>' + medium["title"] + '</p>' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart">' + '</i>' + '</div>';
              photos.appendChild(mediaDiv);
            
            }
            else if (medium["video"]) {
              mediaDiv.innerHTML = '<video controls="controls" preload="auto" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["video"] + '" />' ;
              photos.appendChild(mediaDiv);
            }

          
         

            //<img src="./Sample Photos/Ellie Rose/Architecture_Connected_Curves.jpg"></img>
            //<video controls="controls" poster="image.jpg" preload="auto">
            //<source src="./Sample Photos/Mimi Keel/Animals_Wild_Horses_in_the_mountains.mp4" type="video/mp4"/>
            //video Ellie</video>
            //<i class="fas fa-heart"></i>         
        }
    })
        // event listener on the heart icon in order to count likes
        let hearts = document.querySelectorAll(".heart");
        //let counter = document.querySelectorAll(".counter");
        hearts.forEach(heart => {
          heart.addEventListener('click', function(e) {
          let counter = e.target.previousSibling;
          counter.innerHTML = parseInt(counter.innerHTML) + 1;

          //sélectionner compteur global et ajouter 1 de la même manière
 
        })
      })
        //total likes and price
        let totalLikes = document.getElementById("total-likes");
        let likesDiv = document.createElement("div");
        likesDiv.classList.add("likesdiv");
        //likesDiv.innerHTML = '<p>' + '' + '</p>' + '<i id="heart" class="fas fa-heart">' + medium["price"] + '/' + 'jour';
        totalLikes.appendChild(likesDiv);
  })

  //fill-in form launch

//DOM elements
const formBackground = document.querySelector(".background");
const contactBtn = document.getElementById("contactme");
const userInfo = document.querySelectorAll(".user-info");
const closeFormBtn = document.querySelector(".close");

// launch form event
contactBtn.addEventListener('click', function(){
    formBackground.style.display = "block";
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





  
