//Section 1
function formatDate(date) {
  let now = new Date();
  let h2 = document.querySelector("#date-time");

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
    "Saturday",
  ];
  let day = days[now.getDay()];

  return `${day}, ${hours}:${minutes}`;
}
//Section 3

//Section 4
function search(city) {
  let apiKey = "43bd304d3929c83fc4efa74e53a4793b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temp-new").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.main.wind
  );
}

function searchLocation(position) {
  let apiKey = "43bd304d3929c83fc4efa74e53a4793b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//Temp convert
function convertToFar(event) {
  event.preventDefault();
  let farTemp = document.querySelector("#temp-new");
  farTemp.innerHTML = `66ºF`;
}

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFar);

function convertToCel(event) {
  event.preventDefault();
  let celTemp = document.querySelector("#temp-new");
  celTemp.innerHTML = `17ºC`;
}

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", convertToCel);

let dateElement = document.querySelector("#date-time");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

let searchForm = document.querySelector("#city-form");
searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-city-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Glasgow");
