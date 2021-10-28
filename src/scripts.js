////-------DEFAULT INITIAL API CALL & SEARCH RESULT--------/////
function searchCity(citySearch) {
  let apiKey = "7784a4cd4aa2e0c25ead7bd96d585b8a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

////-------POPULAR CITIES SEARCH RESULT--------/////
// ----- LONDON ---//
function london() {
  searchCity("London");
}
let londonBtn = document
  .querySelector("#london")
  .addEventListener("click", london);

// ----- NY ---//
function newyork() {
  searchCity("New York");
}
let nyBtn = document
  .querySelector("#new-york")
  .addEventListener("click", newyork);

// ----- BEIJING  ---//
function beijing() {
  searchCity("Beijing");
}
let beijingBtn = document
  .querySelector("#beijing")
  .addEventListener("click", beijing);

// ----- SAN FRAN  ---//
function sanfrancisco() {
  searchCity("San Francisco");
}
let sanfranBtn = document
  .querySelector("#san-francisco")
  .addEventListener("click", sanfrancisco);

///---------API CALL FUNCTION-----------///
function handleSubmit(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-bar").value;
  searchCity(citySearch);
}
let form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);

///--------- GET CURRENT LOCATION FUNCTION ------------///

function getLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "701239fef296828e0d2dfbfb4ce41702";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
  axios.get(apiUrl).then(displayName);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(getLocation);
}
let locationBtn = document.querySelector("#current-location");
locationBtn.addEventListener("click", getCurrentPosition);

///--------- CHANGE CITY NAME------------///
function displayName(response) {
  let currentCity = response.data.name;
  let currentCityDisplayed = document.querySelector("#city-name");
  currentCityDisplayed.innerHTML = currentCity.toUpperCase();
}

///--------- SHOW TEMPERATURE FUNCTION --- GET & DISPLAY TEMPERATURE ------------///
function showTemperature(response) {
  temp = response.data.main.temp;
  let temperature = document.querySelector("#main-temp-display");
  temperature.innerHTML = Math.floor(temp);

  // Display City Name//
  document.querySelector("#city-name").innerHTML =
    response.data.name.toUpperCase();

  // Display Icon//
  let icon = document.querySelector("#main-icon");
  icon.setAttribute("src", `images/${response.data.weather[0].icon}.svg`);

  // Display Main Description//
  let weatherDescription = response.data.weather[0].description;
  let description = document.querySelector("#weather-description");
  description.innerHTML = weatherDescription;

  // Display Humidity Description//
  let humidityValue = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity is ${humidityValue}%`;

  // Display Wind Description//
  let windSpeed = response.data.wind.speed;
  let realFeel = response.data.main.feels_like;
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind speed ${windSpeed}mph, Feels like ${realFeel}°C`;
}
///--------- END OF SHOW TEMPERATURE FUNCTION GET & DISPLAY TEMPERATURE ------------///

///-------------CONVERT UNITS C TO F TO C----------------///
// ---Convert value to fahrenheit---///
function convertToFahrenheit(event) {
  event.preventDefault();
  // let tempValueCelcius = temp;
  let farenheitTemp = (temp * 9) / 5 + 32;
  let mainTempDisplay = document.querySelector("#main-temp-display");
  mainTempDisplay.innerHTML = Math.round(farenheitTemp);
}
///---Convert value to celcius---///
function convertToCelcius(event) {
  event.preventDefault();
  let mainTempDisplay = document.querySelector("#main-temp-display");
  mainTempDisplay.innerHTML = Math.round(temp);
}

//------- CHANGE CLASS OF UNIT OF MEASUREMENT BIG F-------///
function fahrenheitToMain() {
  document.getElementById("fahrenheit").classList.add("mainUnit");
  document.getElementById("fahrenheit").classList.remove("secondaryUnit");
  document.getElementById("celcius").classList.add("secondaryUnit");
  document.getElementById("celcius").classList.remove("mainUnit");
}

let farenheitBtn = document.querySelector("#fahrenheit");
farenheitBtn.addEventListener("click", convertToFahrenheit, true);
farenheitBtn.addEventListener("click", fahrenheitToMain, true);

//------- CHANGE CLASS OF UNIT OF MEASUREMENT BIG C -------///
function celciusToMain() {
  document.getElementById("celcius").classList.add("mainUnit");
  document.getElementById("celcius").classList.remove("secondaryUnit");
  document.getElementById("fahrenheit").classList.add("secondaryUnit");
  document.getElementById("fahrenheit").classList.remove("mainUnit");
}

let celciusBtn = document.querySelector("#celcius");
celciusBtn.addEventListener("click", convertToCelcius, true);
celciusBtn.addEventListener("click", celciusToMain, true);

///---------GLOBAL VARIABLE TO PULL TEMP VALUE INTO CtoF CONVERTER-----------///
let temp = null;

///---------BG COLOR TOGGLE------------///
//DAYTIME/EVENING TOGGLE
function changeLight() {
  document.getElementById("panel").classList.remove("darkClass");
  document.getElementById("panel").classList.add("lightClass");
}

function changeDark() {
  document.getElementById("panel").classList.remove("lightClass");
  document.getElementById("panel").classList.add("darkClass");
}

///---------CURRENT DATE & TIME & MONTH ------------///
let now = new Date();
let timeOfDay = now.getHours();
//TIME
let time = now.toLocaleTimeString([], {
  hourCycle: "h23",
  hour: "2-digit",
  minute: "2-digit",
});

let currentTime = document.querySelector("#time");
currentTime.innerHTML = time;

///---------UPDATE BACKGROUND COLOUR ACCORDING TO TIME ------------///

function updateBG() {
  if (timeOfDay < 15 && timeOfDay > 5) {
    document.getElementById("panel").classList.remove("darkClass");
    document.getElementById("panel").classList.add("lightClass");
  } else if (timeOfDay < 19 && timeOfDay >= 15) {
    document.getElementById("panel").classList.remove("lightClass");
    document.getElementById("panel").classList.add("medClass");
  } else {
    document.getElementById("panel").classList.remove("lightClass");
    document.getElementById("panel").classList.add("darkClass");
  }
}
updateBG();

// DAY OF THE WEEK // MAPPING
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
let currentDay = document.querySelector("#day-name");
currentDay.innerHTML = day;

//DATE
let date = now.getDate();
let currenDate = document.querySelector("#date");
currenDate.innerHTML = date;

// CURRENT MONTH
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let month = months[now.getMonth()];
let currentMonth = document.querySelector("#month");
currentMonth.innerHTML = month;

searchCity("London");
