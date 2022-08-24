let now = new Date();
let h4 = document.querySelector("#date-and-time");

let days = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"];
let day = days[now.getDay()];
let date = now.getDate();

let months = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sept",
  "oct",
  "nov",
  "dec",
];

let month = months[now.getMonth()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h4.innerHTML = `${day}, ${month} ${date} | ${hours}:${minutes} `;

function cityTemperature(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#degrees").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "73ff2a59c2dc5fd1e27fc5c64c2da1b5";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;
  axios.get(`${url}&appid=${apiKey}`).then(cityTemperature);
}

function citySubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search").value;
  searchCity(city);
}

function searchCurrentLocation(position) {
  let apiKey = "73ff2a59c2dc5fd1e27fc5c64c2da1b5";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(url).then(cityTemperature);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", citySubmit);

searchCity("Nashville");

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
