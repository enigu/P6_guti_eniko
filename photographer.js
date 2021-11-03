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

            let photos = document.getElementById("photos");
            let mediaDiv = document.createElement("div");
            mediaDiv.classList.add("mediadiv");
            
            let heart = document.createElement("i");
            heart.classList.add("fas","fa-heart");
            
            //vérifier que medium["image"] existe, si oui on fait avec medium["image"] sinon avec medium["video"]
            if (medium["image"] = medium["image"]) {
              mediaDiv.innerHTML = '<img src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["image"] + '" />';
              photos.appendChild(mediaDiv);
            }
            if (medium["video"] = medium["video"]) {
              mediaDiv.innerHTML = '<video controls="controls" poster="image.jpg" preload="auto" src="./Sample Photos/' + currentPhotographer["name"] + '/' + medium["video"] + '" />';
              photos.appendChild(mediaDiv);
            } 

            //<img src="./Sample Photos/Ellie Rose/Architecture_Connected_Curves.jpg"></img>
            //<video controls="controls" poster="image.jpg" preload="auto">
            //<source src="./Sample Photos/Mimi Keel/Animals_Wild_Horses_in_the_mountains.mp4" type="video/mp4"/>
            //video Ellie</video>
            //titleDiv.appendChild(heart);*/           
        }
    })
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





  
