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
    
    // likes counter
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
        
        // adding medium likes to total likes
        likes += medium["likes"];
        
        let photos = document.getElementById("photos");
        let mediaDiv = document.createElement("div");
        mediaDiv.classList.add("mediadiv");
    
        // condition medium["image"] or medium["video"] according to media
        if (medium["image"]) {
          mediaDiv.innerHTML = '<a>' + '<img class="images" tabindex="0" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["image"] + '"alt=' + medium["title"] + '>' + '</a>' + '<div class="title">' + '<p class="titleparagraph">' + medium["title"] + '</p>' + '<div class="likes-counter">' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart" tabindex="0">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        }
        else if (medium["video"]) {
          mediaDiv.innerHTML = '<a>' + '<video class="images" tabindex="0" preload="auto" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["video"] + '"title="' + medium["title"] +'">' + '</video>' + '</a>' + '<div class="title">' + '<p class="titleparagraph">' + medium["title"] + '</p>' + '<div class="likes-counter">' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart" tabindex="0">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        } 
      }
    })
    
    // media filter on click 
    // function show media 
    function showMedia() {
      mediaArray.forEach(function(medium) {
        let mediaDiv = document.createElement("div");
        mediaDiv.classList.add("mediadiv");

        if (medium["image"]) {    
          mediaDiv.innerHTML = '<a>' + '<img class="images" tabindex="0" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["image"] + '"alt=' + medium["title"] + '>' + '</a>' + '<div class="title">' + '<p class="titleparagraph">' + medium["title"] + '</p>' + '<div class="likes-counter">' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart" tabindex="0">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        }
        else if (medium["video"]) {
          mediaDiv.innerHTML = '<a>' + '<video class="images" tabindex="0" preload="auto" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["video"] + '"title=' + medium["title"] + '>' + '</video>' + '</a>' + '<div class="title">' + '<p class="titleparagraph">' + medium["title"] + '</p>' + '<p class="counter">' +  medium["likes"] + '</p>' + '<i class="fas fa-heart heart tabindex="0">' + '</i>' + '</div>'+ '</div>';
          photos.appendChild(mediaDiv);
        }
      })

      const images = photos.querySelectorAll(".images");

    //launch show LightBox function when filtering with media filters  
      for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', e => {
          lightBoxFunc(e, images, i);
        });
      }
    }

    //select media according to popularity
    popularity.addEventListener('click', e => {
      popularitySort();
      addLike();
      lightboxListener();
    });

    //accessibility: sort according to popularity when pressing enter key 
    popularity.addEventListener('keypress', e => {
      if (e.key === 'Enter')
      popularitySort();
      addLike();
      lightboxListener();
    })

    //sorting out media according to popularity
    function popularitySort() {
      // decreasing filter on likes  
      mediaArray.sort(function (a,b) {
        return b.likes - a.likes; 
      });
      
      photos.innerHTML = "";
      //show filtered media by popularity
      showMedia();
    } 

    //select media according to date
    date.addEventListener('click', e => {
      dateSort();
      addLike();
      lightboxListener();
    });

    //accessibility: sort according to date when pressing enter key 
    date.addEventListener('keypress', e => {
      if (e.key === 'Enter')
      dateSort();
      addLike();
      lightboxListener();
    })
      // filter from most to less recent 
    function dateSort() {
      mediaArray.sort(function (a,b) {
        return new Date(b.date) - new Date(a.date); 
      })
    
      photos.innerHTML = "";
      //show filtered media according to date 
      showMedia();

    };

    //select media according to title (A -> W)
    title.addEventListener('click', e => {
      titleSort();
      addLike();
      lightboxListener();
    });

    ////accessibility: sort according to title's alphabetical order when pressing enter key 
    title.addEventListener('keypress', e => {
      if (e.key === 'Enter')
      titleSort();
      addLike();
      lightboxListener();
    })

      // filter according to title from most A to W
    function titleSort() {  
      mediaArray.sort(function (a,b) {
                var titleA = a.title.toLowerCase();
                var titleB = b.title.toLowerCase();
                if (titleA < titleB) //sort string ascending
                    return -1
      });
    
      photos.innerHTML = "";
      //show filtered media according to title (A-W)
      showMedia();
    }

      //open dropdown with arrow down
      const chevronDown = document.querySelector(".fa-chevron-down")
      const dropdown = document.querySelector(".dropdown")
      const arrow = document.querySelector(".arrow")
    
      chevronDown.addEventListener('click',function(ev) {
        openDropDown();
      });

      //accessibility: launching Dropdown filter when pressing enter on the arrow 
      chevronDown.addEventListener('keypress', e => {
        if (e.key === 'Enter')
          openDropDown();
      });

      //open dropdown with mediafilters(date & title) 
      function openDropDown() {
        if (!dropdown.classList.contains("active")) {
          arrow.style.transform = 'rotate(180deg)';
          dropdown.style.display = "flex";
          dropdown.classList.add("active");
        }

        else if (dropdown.classList.contains("active")) {
          arrow.style.transform = 'rotate(360deg)';
          dropdown.style.display = "none";
          dropdown.classList.remove("active");
        }
      }


    //lightbox funtion to open images & videos
    function lightboxListener() {
      const images = photos.querySelectorAll(".images");

      for (let i = 0; i < images.length; i++) {
        images[i].addEventListener('click', e => {
          lightBoxFunc(e, images, i);
        });

        //accessibility: open lightbox when pressing enter on an image
        images[i].addEventListener("keypress", e => {
          if (e.key === 'Enter') {
            lightBoxFunc(e, images, i);
          }
        })
      }
    }
    lightboxListener();

      function lightBoxFunc(e, images, i) {

        const lightBox = document.getElementById("lightbox");
        //select img & video at the same time with .class
        const lightBoxContainer = document.querySelector(".lightbox-container");

        lightBox.classList.add("active");
          
        let img;
        // condition according to img or vidéo
        if (e.target.src.includes('.jpg')){
          img = document.createElement("img");
          img.setAttribute("alt", e.target.alt);
          titleImg = document.createElement("div");
          titleImg.classList.add("titleparagraph");
          titleImg.innerHTML = '<p>' + img.alt + '</p>';
        }

        else if (e.target.src.includes('.mp4')){
          img = document.createElement("video");
          img.setAttribute("controls", "");
          titleImg = document.createElement("div");
          titleImg.classList.add("titleparagraph");
          titleImg.innerHTML = '<p>' + e.target.title + '</p>';
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
          lightBox.appendChild(nextButton);
          lightBox.appendChild(titleImg); 

          let nxtButton = lightBox.querySelector(".next");
          let prvButton = lightBox.querySelector(".previous");

          nxtButton.addEventListener('click', e => {
            goNextSlide()
          });

          //function go to next slide when clicking on right arrow
          function goNextSlide() {
            i += 1;
            if (i >= images.length)
            {
              i = 0;
            }
            img.src = images[i].src;
            
            let lightboxImg = document.querySelector(".lightboxImg");

            //video
            if (images[i].src.includes('.mp4')) {
              let video = document.createElement('VIDEO')
              video.src = images[i].src; 

              video.onloadeddata = (e) => {
                lightboxImg.remove();
                prvButton.after(video);
                video.classList.add("lightboxImg");
                titleImg.innerHTML = images[i].title
                
              }
              video.setAttribute('controls','');
            }
            //img
            if (images[i].src.includes('.jpg')) {
              img = document.createElement("img");
              img.src = images[i].src;
              titleImg.innerHTML = images[i].alt

              img.onload = () => {
                lightboxImg.remove();
                prvButton.after(img);
                img.classList.add("lightboxImg");
              }
            } 
          }

          prvButton.addEventListener('click', e => {
            goPreviousSlide();
          })

          ////function go to previous slide when clicking on left arrow
          function goPreviousSlide() {
            let lightboxImg = document.querySelector(".lightboxImg");

            i -= 1;
            if (i < 0) {
              i = images.length - 1;
            }
            img.src = images[i].src;

            //video
            if (images[i].src.includes('.mp4')) {
              let video = document.createElement('VIDEO')
              video.src = images[i].src; 

              video.onloadeddata = () => {
                lightboxImg.remove();
                prvButton.after(video);
                video.classList.add("lightboxImg");
                titleImg.innerHTML = images[i].title
              }
              video.setAttribute('controls','');
            }

            //img
            if (images[i].src.includes('.jpg')) {
              img = document.createElement("img");
              img.src = images[i].src;
              titleImg.innerHTML = images[i].alt

              img.onload = () => {
                lightboxImg.remove();
                prvButton.after(img);
                img.classList.add("lightboxImg");
              }
            } 
          }

          //close lightbox with x button
          const closedButton = document.querySelector(".closed");
          closedButton.addEventListener('click', e => {
            lightBox.classList.remove("active");
          })

          //accessibility: close lightbox with escape key, moving forward and backward with image list according to right & left arrow
          window.addEventListener("keydown", e => {
            if (e.key === 'Escape')
              lightBox.classList.remove("active");
            else if (e.key === 'ArrowRight')
              goNextSlide();
            else if (e.key === 'ArrowLeft')
              goPreviousSlide();
          })

      }
    //}  

    //total likes and price
    let totalLikes = document.getElementById("total-likes");
    let likesDiv = document.createElement("div");

    likesDiv.classList.add("likesdiv");
    likesDiv.innerHTML = '<div class="nrheart"><div class="likesNbr">' + likes  + '</div><i class="fas fa-heart heart">'+ '</i>' + '</div>' + '<p>' + currentPhotographer["price"] + '/' + 'jour' + '</p>' ;
    totalLikes.appendChild(likesDiv);

    addLike();
    
    function addLike() {
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

        heart.addEventListener("keydown", e => {
          if (e.key === "Enter") {
            let counter = e.target.previousSibling;
            //sélectionne l'html du compteur global pour récupérer sa value
            let global = document.querySelector(".likesNbr");
            let globalLikes = parseInt(global.innerHTML) + 1;
            counter.innerHTML = parseInt(counter.innerHTML) + 1;
            global.innerHTML = globalLikes; 
          }
        })
      })
    }
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

window.addEventListener('keydown', e => {
  if (e.key === 'Escape')
    formBackground.style.display = "none";
})

// close form - close with button 'Envoyer'
const closeButton = document.querySelector(".submit");
closeButton.addEventListener('click', function(e) {
  e.preventDefault();
  console.log(document.querySelector("#first-name").value);
  console.log(document.querySelector("#name").value);
  console.log(document.querySelector("#email").value);
  console.log(document.querySelector("#message").value);
  formBackground.style.display = "none";
});


