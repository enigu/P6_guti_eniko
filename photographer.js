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

        let htmlPhotograph = '<div class="left-info">' + '<h1 class="name">' + photographer["name"] + '</h1>' + '<br>' +
         '<h2 href="photographer.html?id=${photographer.id}">' + photographer["city"] + ',' + ' ' + photographer["country"] + '</h2>' 
         + '<p>' + photographer["tagline"] + '</p>'; 

         
         hashPlusTag.forEach(tagHtml => {
           htmlPhotograph = htmlPhotograph + '<a class="tagList">' + tagHtml + '</a>';
         })

        photographerDiv.innerHTML = htmlPhotograph + '</div>';

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
          mediaDiv.innerHTML = '<a>' + '<video controls="controls" preload="auto" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["video"] + '"/>' + '</video>' + '</a>' + '<div class="title">' + '<p>' + medium["title"] + '</p>' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        }      
      }     
    })

     //lightbox
     const lightBox = document.getElementById("lightbox");
     const images = document.querySelectorAll(".mediadiv > a > img");
     //ajouter class sur balises img et video pour sélectionner les deux à la fois
     //sélectionner balises video
     
    //mettre listener sur videos
    //au lieu de créer un élément img il va falloir créer un élément video, une balise video

     //images.forEach(image => {
      for (let i = 0; i < images.length; i++) {
       images[i].addEventListener('click', e => {
        
        
        lightBox.classList.add("active");

        //mettre un if qui vérifie que images[i].image existe, si oui créer img sinon créer video
        const img = document.createElement("img");
        img.src = images[i].src;
        

         const nextButton = document.createElement("button");
         nextButton.classList.add("next");
         nextButton.innerHTML = '<i class="fas fa-chevron-right">' + '</i>';

         while (lightBox.firstChild) {
           lightBox.removeChild(lightBox.firstChild)
         }

         lightBox.innerHTML = '<span class="closed"><i class="fas fa-times"></i></span> <button class="previous"><i class="fas fa-chevron-left"></i></button>';
         lightBox.appendChild(img);
         lightBox.appendChild(nextButton);

         let nxtButton = lightBox.querySelector(".next");
         let prvButton = lightBox.querySelector(".previous");

         nxtButton.addEventListener('click', e => {
           i += 1;

           img.src = images[i].src;
         })

         prvButton.addEventListener('click', e => {
          i -= 1;

          img.src = images[i].src;
        })

         //close lightbox with x button
         const closedButton = document.querySelector(".closed");

        closedButton.addEventListener('click', e => {
          lightBox.classList.remove("active");
        })
      }) 
    }

    //lightBox Grafikart

    /*<div id="lightbox">
    <button class="lightbox__close"><i class="fas fa-times"></i></button>
    <button class="lightbox__next"><i class="fas fa-chevron-right"></i></button>
    <button class="lightbox__prev"><i class="fas fa-chevron-left"></i></button>
    <div class="lightbox__container">
      <img>
    </div>
    </div>*/

    //@property {HTMLElement}
    /*class Lightbox {
      static init () {
        //const links = document.querySelectorAll('.mediadiv > a > img');
        //, ('.mediadiv > a > video')
        const links = document.querySelectorAll('.mediadiv > a[href$=".jpg"], .mediadiv > a[href$=".mp4"]')
        //console.log(links);
        links.forEach(link => link.addEventListener('click', e => {
          e.preventDefault()
          new Lightbox(e.currentTarget.getAttribute('href'));  //graficart ('href')
        }))  
      }
      // @param {string} url de l'image
      constructor (url) {
        this.element = this.buildDOM(url);
        this.loadImage(url)
        document.body.appendChild(this.element);
      }

      //@param {string} url de l'image
      loadImage(url) {
        const image = new Image (); 
        const container = this.element.querySelector('.lightbox__container');
        image.onload = function () {
          container.appendChild(image);  
        }
        image.src = url
      
      }

      // @param {string} url de l'image
      //return {HTML element}
      buildDOM (url) {
        const dom = document.createElement('div');
        dom.id = 'lightbox';
        //console.log(dom);
        dom.innerHTML = `<button class="lightbox__close"><i class="fas fa-times"></i></button>
        <button class="lightbox__next"><i class="fas fa-chevron-right"></i></button>
        <button class="lightbox__prev"><i class="fas fa-chevron-left"></i></button>
        <div class="lightbox__container">
          <img src= "./Sample Photos/${currentPhotographer.name}/${medium.image}">
        </div>`
        return dom;
      } 
    }

    Lightbox.init();*/

    
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


