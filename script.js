var cityFormEl=document.querySelector("#city-search-form");
var cityInputEl=document.querySelector("#city");
var weatherContainerEl=document.querySelector("#current-weather-container");
var citySearchInputEl = document.querySelector("#searched-city");
var forecastTitle = document.querySelector("#forecast");
var forecastContainerEl = document.querySelector("#fiveday-container");
var pastSearchButtonEl = document.querySelector("#past-search-buttons");
var cities = [];


var saveSearch = function() {
    localStorage.setItem('cities', JSON.stringify(cities));
}

var getCityWeather = function(city){
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=0cf1c7e9555bfeee92b38ab834c53129`

    fetch(apiURL)
    .then(function(response){
        response.json().then(function(data){
        });
    });
};

