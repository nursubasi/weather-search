
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

let fahrenheitElement = document.getElementById(`fahrenheit`);
let celciusElement = document.getElementById(`celcius`);

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

function placeSearch(event) {
  event.preventDefault();
  let placeInput = document.querySelector("#input-entry");
  let place = document.querySelector("#weather-place");
  let weatherDescription = document.querySelector(".image-description");
  let windSpeed = document.querySelector("#wind-speed");
  let imageElement = document.querySelector("#first-image");
  if (placeInput.value) {
    let cityInput = placeInput.value;
    let apiKey = "2089812b000f63951a22fa9a7c7bfb0d";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=${units}&appid=${apiKey}`;
    function placeName(response) {
      let cityName = response.data.name;
      place.innerHTML = `${cityName}`;
    }
    axios.get(apiUrl).then(placeName);
    function enterTemperature(response) {
      console.log(apiUrl);
      let currentTemp = Math.round(response.data.main.temp);
      console.log(currentTemp);
      let temperatureElement = document.querySelector("#default-degree");
      temperatureElement.innerHTML = `${currentTemp}`;
    }
    axios.get(apiUrl).then(enterTemperature);

    function getWeatherDescription(response) {
      let currentDescription = response.data.weather[0].main;
      console.log(currentDescription);
      weatherDescription.innerHTML = `${currentDescription}`;
    }
    axios.get(apiUrl).then(getWeatherDescription);

    function getWindSpeed(response) {
      let currentWindSpeed = Math.round(response.data.wind.speed);
      console.log(currentWindSpeed);
      windSpeed.innerHTML = `${currentWindSpeed}`;
    }
    axios.get(apiUrl).then(getWindSpeed);

    function getImage(response) {
      let imageNumber = response.data.weather[0].icon;
      console.log(imageNumber);
      imageElement.setAttribute("src", `img/${imageNumber}.jpg`);
    }
    
    axios.get(apiUrl).then(getImage);

    function getCoordinates (response){
    let coordinates = response.data.coord;
    getForecast(coordinates)};

    axios.get(apiUrl).then(getCoordinates);

  } else {
    weatherDescription.innerHTML = `Sunny`;
    imageElement.setAttribute("src", `img/01d.jpg`);
  }
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", placeSearch);
form.addEventListener("click", placeSearch);

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let place = document.querySelector("#weather-place");
  let weatherDescription = document.querySelector(".image-description");
  let windSpeed = document.querySelector("#wind-speed");
  let imageElement = document.querySelector("#first-image");
  let apiKey = "2089812b000f63951a22fa9a7c7bfb0d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  function placeName(response) {
    let cityName = response.data.name;
    place.innerHTML = `${cityName}`;
  }
  axios.get(apiUrl).then(placeName);
  function enterTemperature(response) {
    console.log(apiUrl);
    let currentTemp = Math.round(response.data.main.temp);
    console.log(currentTemp);
    let temperatureElement = document.querySelector("#default-degree");
    temperatureElement.innerHTML = `${currentTemp}`;
  }
  axios.get(apiUrl).then(enterTemperature);

  function getWeatherDescription(response) {
    let currentDescription = response.data.weather[0].main;
    console.log(currentDescription);
    weatherDescription.innerHTML = `${currentDescription}`;
  }
  axios.get(apiUrl).then(getWeatherDescription);

  function getWindSpeed(response) {
    let currentWindSpeed = Math.round(response.data.wind.speed);
    console.log(currentWindSpeed);
    windSpeed.innerHTML = `${currentWindSpeed}`;
  }
  axios.get(apiUrl).then(getWindSpeed);

  function getImage(response) {
    let imageNumber = response.data.weather[0].icon;
    console.log(imageNumber);
    imageElement.setAttribute("src", `img/${imageNumber}.jpg`);
  }
  axios.get(apiUrl).then(getImage);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}


function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "2089812b000f63951a22fa9a7c7bfb0d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}


function displayForecast(response) {
let forecast = response.data.daily;
console.log(forecast);
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

