//fetch de json

// get photographer's id in url
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const photographerId = urlParams.get('id');

console.log(photographerId);