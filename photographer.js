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
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const photographerId = urlParams.get("id");

    //console.log(photographerId);

    photographers.forEach(function(photographer) {
        if (photographer["id"]==photographerId) {
          let photographerDiv = document.createElement("div");
          photographerDiv.classList.add("photographe");
          let button = document.createElement("button");
          button.classList.add("contactme");
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
    })  
  })


  // fetch  de la section media des photographes


  
