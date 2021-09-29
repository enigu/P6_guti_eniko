let photographers = "";
fetch("photographers.json")
.then(function(response) {
  if(response.ok) {
    return response.json();
}
})
.then(function(jsonObj) {
  //console.log(jsonObj);
  //console.log(jsonObj["photographers"]);
  let photographers = jsonObj["photographers"];
  //let tag = photographers.tags;

  photographers.forEach(function(photographer) {
    //photographer.img
    let imgPhotographer = document.createElement("img");
    imgPhotographer.classList.add("photo");
    let gallery = document.getElementById("gallery");
    gallery.appendChild(imgPhotographer);
    imgPhotographer.innerHTML = `<a href="#"> <img src="./Sample Photos/Photographers ID Photos/${photographer.portrait}"> </a>`;
    console.log(imgPhotographer);

    // photographer.name
    let htmlContent = document.createElement("div");
    htmlContent.classList.add("photographe");
    gallery.appendChild(htmlContent);
    htmlContent.innerHTML = `<a href="#"> <h2>${photographer.name}</h2> </a>`;
    console.log(htmlContent);

    //photographer.location
    let contentLocation = document.createElement("p");
    contentLocation.classList.add("location");
    gallery.appendChild(contentLocation);
    contentLocation.innerHTML = `<a href="#">${photographer.city}, ${photographer.country}</a>`;
    console.log(contentLocation);

    //photographer.tagline
    let tagLine = document.createElement("p");
    tagLine.classList.add("tagline");
    gallery.appendChild(tagLine);
    tagLine.innerHTML = `<p>${photographer.tagline}</p>`;
    console.log(tagLine);

    //photographer.price
    let priceOfShooting = document.createElement("p");
    priceOfShooting.classList.add("price");
    gallery.appendChild(priceOfShooting);
    priceOfShooting.innerHTML = `<p>${photographer.price}€/jour</p>`;
    console.log(priceOfShooting);

    //photographer.tags
    let photographerTags = document.createElement("p");
    photographerTags.classList.add("tags");
    gallery.appendChild(photographerTags);
    photographerTags.innerHTML = `<p>#${photographer.tags}</p>`;
    console.log(photographerTags);

  }) 
})








