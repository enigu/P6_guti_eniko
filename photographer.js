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

    media.forEach(function(medium) {
        if (medium["photographerId"]==photographerId) {
            //console.log(medium["photographerId"])
            //console.log(photographerId);

            let photos = document.getElementById("photos");
            let mediaDiv = document.createElement("div");
            mediaDiv.classList.add("mediadiv");
            let titleDiv = document.createElement("div");
            let image = document.createElement("img");
            image.classList.add("image");
            titleDiv.classList.add("titlediv");
            let heart = document.createElement("i");
            heart.classList.add("fas","fa-heart");

            //console.log(currentPhotographer["name"]);
            //console.log(medium["id"]);
            //mediaDiv.innerHTML = `<img src="./Sample Photos/${currentPhotographer.name}/${medium.image}" />`;
            
            //vérifier que medium["image"] existe, si oui on fait avec medium["image"] sinon avec medium["video"]
            if () {
            mediaDiv.innerHTML = '<img src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["image"] + '" />';

            photos.appendChild(mediaDiv);
            }
            else{
            }    
            //photos.appendChild(mediaDiv);

            //<img src="./Sample Photos/Ellie Rose/Architecture_Connected_Curves.jpg"></img>
            //image.innerHTML = `<img src="./Sample Photos/${photographer.name}/${medium.id}">`;

            //titleDiv.innerHTML = `<h3>${medium.title}</h3><h4>${medium.likes}</h4>`

            //photos.appendChild(titleDiv);
            //titleDiv.appendChild(heart);

            /*let titleDiv = document.getElementById("titlediv");
            let image = document.createElement("img");
            image.classList.add("image");
            let title = document.createElement("h3");
            title.classList.add("title");
            let likes = document.createElement("h3");
            likes.classList.add("likes");
            //<i class="fas fa-heart"></i>
            let heart = document.createElement("i");
            heart.classList.add("fas","fa-heart");
        
            let photoId = medium.id;
            //console.log(photoId);
        
            //<img src="./Sample Photos/Ellie Rose/Architecture_Connected_Curves.jpg"></img>
            //image.innerHTML = `<img src="./Sample Photos/${photographer.name}/${medium.id}">`;
            title.innerHTML = `<h3>${medium.title}</h3>`;
            likes.innerHTML = `<h3>${medium.likes}</h3>`;
        
            titleDiv.appendChild(title);
            titleDiv.appendChild(likes);
            titleDiv.appendChild(heart);*/
           
        }
    })


  
  })

  // fetch  de la section media des photographes

  fetch("photographers.json")
  .then(function(response) {
    if (response.ok) {
      return response.json();
    }
  })
  .then(function(jsonObj) {
    
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





  
