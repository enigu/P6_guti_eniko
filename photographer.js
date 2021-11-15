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

        //boucle on photographer.tags in order to put a  # in front of each tag on the photographers page
        const tags = photographer.tags;
        let hashPlusTag= []
        tags.forEach(tag => {
          tag = '#' + tag;
          hashPlusTag.push(tag);
        })

        /*for (var i = 0; i < hashPlusTag.length; i++) {
          hashPlusTag[i].classList.add("contour")
          hashPlusTag[i]
        }*/

        photographerDiv.innerHTML = '<div class="left-info">' + '<h1 class="name">' + photographer["name"] + '</h1>' + '<br>' + '<h2 href="photographer.html?id=${photographer.id}">' + photographer["city"] + ',' + ' ' + photographer["country"] + '</h2>' + '<p>' + photographer["tagline"] + '</p>' + '<a>' + hashPlusTag + '</a>' + '</div>';

        button.innerHTML = "Contactez-moi";  
        avatarDiv.innerHTML = `<div><img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}"</div>`;

        info.appendChild(photographerDiv);
        info.appendChild(button);
        info.appendChild(avatarDiv); 

        // inject message 'contactez-moi ${photographer.name}' in the fill-in form
        const contactMessage = document.getElementById("contact-message");
        let messageDiv = document.createElement("p");

        messageDiv.innerHTML = 'Contactez-moi' + ' ' + currentPhotographer["name"];
        contactMessage.appendChild(messageDiv);
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

     //lightbox
      //lightBox.innerHTML = '<button class="closed">' + '<i class="fas fa-times">' + '</i>' + '</button>'
     const lightBox = document.getElementById("lightbox");
     const images = document.querySelectorAll(".mediadiv > a > img");
     //sélectionner balises video
     

    //mettre listener sur videos
    //au lieu de créer un élément img il va falloir créer un élément video, une balise video

     images.forEach(image => {
       image.addEventListener('click', e => {
         lightBox.classList.add("active");
         const img = document.createElement("img");
         img.src = image.src;

         const nextButton = document.createElement("button");
         nextButton.classList.add("next");
         nextButton.innerHTML = '<i class="fas fa-chevron-right">' + '</i>';
         
         while (lightBox.firstChild) {
           lightBox.removeChild(lightBox.firstChild)
         }
         lightBox.innerHTML = '<button class="closed"><i class="fas fa-times"></i></button> <button class="previous"><i class="fas fa-chevron-left"></i></button>';
         lightBox.appendChild(img);
         lightBox.appendChild(nextButton);

       })
      })

     lightBox.addEventListener('click', e => {
       if (e.target !== e.currentTarget) return
       lightBox.classList.remove("active");
     })

     //close lightbox with x button

    //total likes and price
    let totalLikes = document.getElementById("total-likes");
    let likesDiv = document.createElement("div");

    likesDiv.classList.add("likesdiv");
    likesDiv.innerHTML = '<div class="nrheart"><div class="likesNbr">' + likes  + '</div><i class="fas fa-heart heart">'+ '</i>' + '</div>' + '<p>' + currentPhotographer["price"] + '/' + 'jour' + '</p>' ;
    totalLikes.appendChild(likesDiv);
    

    // event listener on the heart icon in order to count likes
    let hearts = document.querySelectorAll(".heart");
    likesNbr = document.querySelector(".likesNbr");
    //console.log(allLikes);
    
    hearts.forEach(heart => {
      heart.addEventListener('click', function(e) {
        let counter = e.target.previousSibling;
        //sélectionne l'html du compteur global pour récupérer sa value      
        likesNbr = parseInt(likes.innerHTML) + 1;
        console.log(likes.innerHTML);
        //likesNbr += 1;
        //faire +1 à likesNbr et le mettre dans likesDiv à la place de l'ancien (donc innerHTML)
        counter.innerHTML = parseInt(counter.innerHTML) + 1;
        //console.log(likesNbr);
        //sélectionner compteur global et ajouter 1 de la même manière
        //allLikes.innerHTML =  parseInt(allLikes.innerHTML) + 1;  
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











  
