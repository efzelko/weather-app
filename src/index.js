let apiKey = "082d3d02ffdb12f2fd9b259e2ced1d0d";
days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let lat = null;
let long = null;

function locationSearch(event) {
  event.preventDefault();
  let h1 = document.querySelector("h1");
  let input = document.querySelector("#loc").value;
  h1.innerHTML = input;

  let response = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=imperial&appid=${apiKey}`
    )
    .then(showTemp);
}

function showCelsius(event) {
  let temp = document.querySelector(".large-temp");
  temp.innerHTML = "-2°";
  let high = document.querySelector(".high-temp");
  high.innerHTML = "High 2°";
  let low = document.querySelector(".low-temp");
  low.innerHTML = "Low -7°";
}

function showFarenheit(event) {
  let temp = document.querySelector(".large-temp");
  temp.innerHTML = "27°";
  let high = document.querySelector(".high-temp");
  high.innerHTML = "High 34°";
  let low = document.querySelector(".low-temp");
  low.innerHTML = "Low 15°";
}

function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let tempDisplay = document.querySelector(".large-temp");
  tempDisplay.innerHTML = `${temp}°`;
  let high = Math.round(response.data.main.temp_max);
  let highDisplay = document.querySelector(".high-temp");
  highDisplay.innerHTML = `High ${high}°`;
  let low = Math.round(response.data.main.temp_min);
  let lowDisplay = document.querySelector(".low-temp");
  lowDisplay.innerHTML = `Low ${low}°`;
}

function displayTemp(response) {
  let temp = Math.round(response.data.main.temp);
  console.log(temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `The current temperature is ${temp}°`;
}

function changeLocation(response) {
  let h1 = document.querySelector("h1");
  let loc = response.data[0].name;
  h1.innerHTML = loc;
}

function setLocation(position) {
  lat = position.coords.latitude;
  long = position.coords.longitude;
  let response = axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`
    )
    .then(showTemp);
  let city = axios
    .get(
      `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${apiKey}`
    )
    .then(changeLocation);
}

function getLocation(event) {
  navigator.geolocation.getCurrentPosition(setLocation);
}

let now = new Date();
let day = days[now.getDay()];
let hr = now.getHours();
hr = hr.toString().length === 1 ? `0${hr}` : hr.toString();
let min = now.getMinutes();
min = min.toString().length === 1 ? `0${min}` : min.toString();

let datetime = document.querySelector("#datetime");
datetime.innerHTML = `${day} ${hr}:${min}`;

let locationEl = document.querySelector("#location");
locationEl.addEventListener("submit", locationSearch);

let cel = document.querySelector("#cel");
cel.addEventListener("click", showCelsius);

let far = document.querySelector("#far");
far.addEventListener("click", showFarenheit);

let locationButton = document.querySelector("#findLocation");
locationButton.addEventListener("click", getLocation);
