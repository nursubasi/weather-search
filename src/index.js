
let now = new Date();
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let dayinfo = document.querySelector("#weekday");
dayinfo.innerHTML = `${day} ${hours}:${minutes}`;

function showWeather(response) {
  let place = document.querySelector("#weather-place");
  let weatherDescription = document.querySelector(".image-description");
  let windSpeed = document.querySelector("#wind-speed");
  let imageElement = document.querySelector("#first-image");

  let cityName = response.data.name;
  place.innerHTML = `${cityName}`;

  let currentTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#default-degree");
  temperatureElement.innerHTML = `${currentTemp}`;

  let currentDescription = response.data.weather[0].main;
  weatherDescription.innerHTML = `${currentDescription}`;

  let currentWindSpeed = Math.round(response.data.wind.speed);
  windSpeed.innerHTML = `${currentWindSpeed}`;

  let imageNumber = response.data.weather[0].icon;
  imageElement.setAttribute("src", `img/${imageNumber}.jpg`);
  imageElement.setAttribute("alt", currentDescription);

  coords = response.data.coord;

  getForecast(coords);

};

function placeSearch(cityInput) {
    let apiKey = "2089812b000f63951a22fa9a7c7bfb0d";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
  };

function handleSubmit(event) {
  event.preventDefault();
  let placeInput = document.querySelector("#input-entry");
  placeSearch(placeInput.value);
};




let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
form.addEventListener("click", handleSubmit);





function formatDate(timestamp){
let date = new Date(timestamp * 1000);
let day = date. getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
return days[day];
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "2089812b000f63951a22fa9a7c7bfb0d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
 
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}


function getForecast(coordinates) {
  let apiKey = "2089812b000f63951a22fa9a7c7bfb0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}


function displayForecast(response) {
let forecast = response.data.daily;
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
forecast.forEach(function(forecastDay, index) {
  if (index >0 && index < 5){
forecastHTML = forecastHTML + `<div class="col-sm-3">
            <div class="card" style="width: 120px;">
              <div class="card-body">
                <p class="card-text" style="text-align: center;">
                  ${formatDate(forecastDay.dt)}
                </p>
                <img
                  src="img/${(forecastDay.weather[0].icon)}.jpg"
                  class="img-fluid rounded-start"
                  alt="weather"
                  style="width: 100%;"
                />
                <h5 class="card-title" style="text-align: center;">${Math.round(forecastDay.temp.max)}°C</h5>
              </div>
            </div>
          </div>
          `;
}
} 
)
;

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
          }

let units = "metric";
let coords = null;
placeSearch("Paris");
displayForecast();