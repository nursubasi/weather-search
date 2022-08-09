let now = new Date();
let dayinfo = document.querySelector("#weekday");
let hours = now.getHours();
if (hours< 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes< 10) {
  minutes = `0${minutes}`;
}
let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[now.getDay()];
dayinfo.innerHTML = `${day} ${hours}:${minutes}`;

function placeSearch(event){
    event.preventDefault();
      let placeInput = document.querySelector("#input-entry");
    let place = document.querySelector("#weather-place");
    if (placeInput.value){
place.innerHTML = `${placeInput.value}`;
} else {
    place.innerHTML = `Paris`;
}
}

let form = document.querySelector("form");
form.addEventListener("submit", placeSearch);
form.addEventListener("click", placeSearch);

function showCelcius(){
    let degree = document.querySelector("#default-degree");
    degree.innerHTML = `35`;
}

let celciusDegree = document.querySelector("#celcius");
celciusDegree.addEventListener("click", showCelcius);

function showFahrenheit(){
    let degree = document.querySelector("#default-degree");
    degree.innerHTML = `95`;
}

let fahrenheitDegree = document.querySelector("#fahrenheit");
fahrenheitDegree.addEventListener("click", showFahrenheit);