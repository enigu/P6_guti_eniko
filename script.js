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

  let tag = photographers.tags;

  photographers.forEach(function(photographer) {
    console.log(photographer);
    let htmlContent = document.createElement("div");
    htmlContent.classList.add("photographe");

    //htmlContent.innerHTML = "<img src=" + photographer["img"] + "/>"photographer["name"];

    document.getElementById("gallery").appendChild(htmlContent);

    console.log(htmlContent);
  })
    
});

