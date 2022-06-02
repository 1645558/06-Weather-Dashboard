var textInputEl = document.querySelector('.text');
var buttonEl = document.querySelector('.searchBtn');
var nameEl = document.querySelector('.name');
var descriptionEl = document.querySelector('.desc');
var tempEl = document.querySelector('.temp');
var windEl = document.querySelector('.wind');
var humidEl = document.querySelector('.humidity')
var uvEl = document.querySelector('.uv');
var searchBtnEl = document.querySelector('.search-buttons');
var items = JSON.parse(localStorage.getItem('items')) || [];

// var items = JSON.parse(localStorage.getItem('searchBtn')) || [];
// const histEl = document.getElementById('history');

function init() {

//displays weather on page
function handleSubmit(city) {
    var city = textInputEl.value;
    if (city) {
        getApi(city)
        textInputEl.value = '';
    } 
    //else {
    //     alert('please enter a city name');
    // }
    //storeItem();
}

var displayWeatherButtons = function () {
    var items = JSON.parse(localStorage.getItem('items')) || [];
    for (var item of items) {
        var btnEl = document.createElement('button');
        btnEl.dataset.item = item;
        btnEl.setAttribute('class', 'd-block')
        btnEl.className = 'btn'
        btnEl.textContent = item;
        searchBtnEl.appendChild(btnEl)
    }
}

function saveData () {
    for (var i = 0; i < items.length; i++) {
        console.log(items)
    }
}

//gets api data for displaying weather
function getApi(city) {
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=0cf1c7e9555bfeee92b38ab834c53129`;

    fetch(requestURL)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            displayWeather(data, city);
        });
};

//grabs weather data from array
var displayWeather = function (weather, searchedCity) {
    nameEl.textContent = searchedCity;
    tempEl.textContent = "Temperature: " + weather.main.temp;
    windEl.textContent = "Wind Speed: " + weather.wind.speed;
    humidEl.textContent = "Humidity: " + weather.main.humidity;
    uvEl.textContent = "";
}

//saves to local storage
buttonEl.addEventListener('click', function() {
    var searches = textInputEl.value;
    handleSubmit(searches);
    //console.log(searches)
    var items = JSON.parse(localStorage.getItem(searches)) || [];
    items.push(searches);
    localStorage.setItem('items', JSON.stringify(items));
    displayWeatherButtons();
    saveData();
});
//buttonEl.addEventListener('click', handleSubmit)
}
init();

