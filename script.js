var cityFormEl = document.querySelector("#city-search-form");
var cityInputEl = document.querySelector("#city");
var weatherContainerEl = document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var cities = [];

//localstorage save
var saveSearch = function () {
    localStorage.setItem('cities', JSON.stringify(cities));
}

//grab api 
var getCityWeather = function (city) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=0cf1c7e9555bfeee92b38ab834c53129`

    fetch(apiURL)
        .then(function (response) {
            response.json().then(function (data) {
            });
        });
};

//gather weather data from api and display on page
var displayWeather = function(weather, searchCity) {
    weatherContainerEl.textContent = '';
    citySearchInputEl.textContent = searchCity;

    var temperatureEl = document.createElement('span');
    temperatureEl.textContent = 'temperature: ' + weather.main.temp + ' F';

    var humidityEl = document.createElement('span');
    humidityEl.textContent = "Humidity: " + weather.main.humidity + ' %';

    var windSpeedEl = document.createElement('span');
    windSpeedEl.textContent = 'Wind speed: ' + weather.main.speed + ' MPH';
 }

