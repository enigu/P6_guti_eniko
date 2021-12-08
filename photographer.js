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

        let htmlPhotograph = '<div class="left-info">' + '<h1 class="name">' + photographer["name"] + '</h1>' + '<br>' +
         '<h2 href="photographer.html?id=${photographer.id}">' + photographer["city"] + ',' + ' ' + photographer["country"] + '</h2>' 
         + '<p>' + photographer["tagline"] + '</p>' + '<div class="hashtags">'; 
 
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
    
    //créer variable pour compter les likes
    let likes = 0;

    //créer tableau de médias
    let mediaArray = [];
    const polularity = document.getElementById("popularity");
    const date = document.getElementById("date");
    const title = document.getElementById("title");
    const filterBy = document.querySelector(".filterby");
    
    media.forEach(function(medium) {
      if (medium["photographerId"]==photographerId) {
        //tableaumedia.push de medium
        mediaArray.push(medium);
        
        //ajouter le nombre de likes de medium à la variable des likes globale
        likes += medium["likes"];
        
        let photos = document.getElementById("photos");
        let mediaDiv = document.createElement("div");
        mediaDiv.classList.add("mediadiv");
    
        //vérifier que medium["image"] existe, si oui on fait avec medium["image"] sinon avec medium["video"]
        if (medium["image"]) {
          mediaDiv.innerHTML = '<a>' + '<img class="images" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["image"] + '"/>' + '</a>' + '<div class="title">' + '<p>' + medium["title"] + '</p>' + '<div class="likes-counter">' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        }
        else if (medium["video"]) {
          mediaDiv.innerHTML = '<a>' + '<video class="images" controls="controls" preload="auto" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["video"] + '"/>' + '</video>' + '</a>' + '<div class="title">' + '<p>' + medium["title"] + '</p>' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        } 
      } 
    })
    
    // trier media selon popularité, date, titre
    popularity.addEventListener('click', e => {
      popularity.innerHTML = '<a>' + 'Popularité' +'</a>' + ' ' + '<span>' + '<i class="fas fa-chevron-up">' + '</i>' + '</span>'
      
      // fermer la dropdown avec l'icone chevron-up
      const chevronUp = document.querySelector(".fa-chevron-up")  
      chevronUp.addEventListener('click', e => {
        dropdown.style.display = "none";
        popularity.innerHTML = '<a>' + 'Popularité' +'</a>' + ' '+ '<span>' + '<i class="fas fa-chevron-down">' + '</i>' + '</span>'
      })
      // tri décroissant sur le nobre de likes  
      mediaArray.sort(function (a,b) {
        return b.likes - a.likes; 
      });
      
      //show filtered media by popularity
      mediaArray.forEach(function(medium) {    
        if (mediaArray["image"]) {    
          mediaDiv.innerHTML = '<a>' + '<img class="images" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["image"] + '"/>' + '</a>' + '<div class="title">' + '<p>' + medium["title"] + '</p>' + '<div class="likes-counter">' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        }
        else if (mediaArray["video"]) {
          mediaDiv.innerHTML = '<a>' + '<video class="images" controls="controls" preload="auto" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["video"] + '"/>' + '</video>' + '</a>' + '<div class="title">' + '<p>' + medium["title"] + '</p>' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        }
      })
    }); 
     

      //event listener on spans up and down - dropdown on and off 
      const chevronDown = document.querySelector(".fa-chevron-down")
      const dropdown = document.querySelector(".dropdown")
    
      chevronDown.addEventListener('click', e => {
        dropdown.style.display = "flex";
      })  
  


    //lightbox
    const lightBox = document.getElementById("lightbox");
    //sélectionner img et video à la fois avec .class
    const images = photos.querySelectorAll(".images"); 
    const titleImg = photos.querySelector(".title >p");

      for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', e => {                
          lightBox.classList.add("active");
          let img; 
          // condition selon balise img ou vidéo
          if (e.target.src.includes('.jpg')){
            img = document.createElement("img");
            //img.title = medium.title;
          }
          else {
            img = document.createElement("video");
            img.setAttribute("controls", "");
          }
          
            img.classList.add("lightboxImg");
            img.src = images[i].src;  
        
            const nextButton = document.createElement("button");
            nextButton.classList.add("next");
            nextButton.innerHTML = '<i class="fas fa-chevron-right">' + '</i>';

            while (lightBox.firstChild) {
              lightBox.removeChild(lightBox.firstChild)
            }

            lightBox.innerHTML = '<span class="closed"><i class="fas fa-times"></i></span> <button class="previous"><i class="fas fa-chevron-left"><p></p></i></button>';
            lightBox.appendChild(img);
            lightBox.appendChild(titleImg);
            lightBox.appendChild(nextButton);

            let nxtButton = lightBox.querySelector(".next");
            let prvButton = lightBox.querySelector(".previous");

            nxtButton.addEventListener('click', e => {
              i += 1;
              img.src = images[i].src;
              //video
              if (images[i].src.includes('.mp4')) {
                let video = document.createElement('VIDEO')
                video.src = images[i].src; 
                video.onloadeddata = () => {
                  lightBox.removeChild(img);
                  lightBox.appendChild(video);
                  video.classList.add("lightboxImg");
                }
                video.setAttribute('controls','');
              }
              //img
              if (images[i].src.includes('.jpg')) {
                img = document.createElement("img");
                img.src = images[i].src;
                img.onload = () => {
                  while (lightBox.firstChild) {
                    lightBox.removeChild(lightBox.firstChild)
                  }
                  lightBox.appendChild(img);
                  img.classList.add("lightboxImg");
                }
              } 
              //if images[i].src contient .jpg && img.src ne contient pas .jpg
              //on utilise replaceChild pour remplacer video par img
              //else if images[i].src ne contient pas .jpg && img.src contient.jpg
              //on utilise replaceChild pour remplacer img par video
              /*if (images[i].src.includes('.jpg') && !img.src.includes('.jpg')){
                lightBox.replaceChild('img','<video>');
              }
              else if (!images[i].src.includes('.jpg') && img.src.includes('.jpg')){
                lightBox.replaceChild('<video>','img');
              }*/
              //img.src = images[i].src;
            })

            prvButton.addEventListener('click', e => {
              i -= 1;
              img.src = images[i].src;
              //video
              if (images[i].src.includes('.mp4')) {
                let video = document.createElement('VIDEO')
                video.src = images[i].src; 
                video.onloadeddata = () => {
                  lightBox.removeChild(img);
                  lightBox.appendChild(video);
                  video.classList.add("lightboxImg");
                }
                video.setAttribute('controls','');
              }
              //img
              if (images[i].src.includes('.jpg')) {
                img = document.createElement("img");
                img.src = images[i].src;
                img.onload = () => {
                  while (lightBox.firstChild) {
                    lightBox.removeChild(lightBox.firstChild)
                  }
                  lightBox.appendChild(img);
                  img.classList.add("lightboxImg");
                }
              } 
            })

            //close lightbox with x button
            const closedButton = document.querySelector(".closed");
            closedButton.addEventListener('click', e => {
              lightBox.classList.remove("active");
            })  
        })
      }
    

    //total likes and price
    let totalLikes = document.getElementById("total-likes");
    let likesDiv = document.createElement("div");

    likesDiv.classList.add("likesdiv");
    likesDiv.innerHTML = '<div class="nrheart"><div class="likesNbr">' + likes  + '</div><i class="fas fa-heart heart">'+ '</i>' + '</div>' + '<p>' + currentPhotographer["price"] + '/' + 'jour' + '</p>' ;
    totalLikes.appendChild(likesDiv);
    
    let hearts = document.querySelectorAll(".heart");
    let likesNbr = document.querySelector(".likesNbr");
    // event listener on the heart icon in order to count likes
    hearts.forEach(heart => {
      heart.addEventListener('click', function(e) {
        let counter = e.target.previousSibling;
         //sélectionne l'html du compteur global pour récupérer sa value
        let global = document.querySelector(".likesNbr");
        let globalLikes = parseInt(global.innerHTML) + 1;
        counter.innerHTML = parseInt(counter.innerHTML) + 1;
        global.innerHTML = globalLikes; 
      })
    })
  });

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


//keyboardevent.key - accessibility -- Lightbox
$(document).keydown(function(e) {
  const keyCode = e.keyCode ? e.keyCode : e.which
  //go to next slide when pressing right arrow 
  if (keyCode === 39) {
      goToNextSlide()
  //go to previous slide when pressing left arrow     
  } else if (keyCode === 37) {
      goToPreviousSlide()
  //close lightbox when pressing escape    
  } else if (keyCode === 27) {
      closeLightBox()
  }

})


//keyboardevent.key - accessibility -- fill-in form

// Global DOM var
const $body = $('#body')
const $openModalBtn = $('#contactme')
const $mainWrapper = $('.main')
const $modal = $('.form')
const $modalTitle = $('#contact-message')
const $modalCloseBtn = $('.submit')
 
// Functions open & close fill-in forms
const onOpenModal = () => {
   $mainWrapper.attr('aria-hidden', 'true')
   $modal.attr('aria-hidden', 'false')
   $body.addClass('no-scroll')
   $modal.css('display', 'flex')
   $modalCloseBtn.focus()
}
 
const onCloseModal = () => {
   $mainWrapper.attr('aria-hidden', 'false')
   $modal.attr('aria-hidden', 'true')
   $body.removeClass('no-scroll')
   $modal.css('display', 'none')
   $openModalBtn.focus()
}
 
// Event
$openModalBtn.click(function() {
   onOpenModal()
})
 
$modalCloseBtn.click(function() {
   onCloseModal()
})
 
// Close modal when espace key is pressed
$(document).on('keydown', e => {
   const keyCode = e.keyCode ? e.keyCode : e.which
 
   if ($modal.attr('aria-hidden') == 'false' && keyCode === 27) {
       onCloseModal()
   }
})