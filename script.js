var textInputEl = document.querySelector('.text');
var buttonEl = document.querySelector('.searchBtn');
var nameEl = document.querySelector('.name');
var descriptionEl = document.querySelector('.desc');
var tempEl = document.querySelector('.temp');
windEl = document.querySelector('.wind');
var humidEl = document.querySelector('.humidity')
var uvEl = document.querySelector('.uv');

function handleSubmit(event) {
    event.preventDefault()
    var city = textInputEl.value;
    if (city) {
        getApi(city)
        textInputEl.value = '';
    } else {
        alert('please enter a city name');
    }
}

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
            //getOneCallWeather(data[0].lat, data[0].lon);
        });
};

var displayWeather = function(weather, searchedCity) {
    nameEl.textContent = searchedCity;
    tempEl.textContent = "Temperature: " + weather.main.temp;
    windEl.textContent = "Wind Speed: " + weather.wind.speed;
    humidEl.textContent = "Humidity: " + weather.main.humidity;
    uvEl.textContent = "";
}


// function getOneCallWeather(lat, lon) {
//     fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=0cf1c7e9555bfeee92b38ab834c53129`)
//         .then(function (response) {
//             console.log(response)
//             return response.json()
//         })
//         .then(function (data) {
//             console.log(data)
//         })
// }
buttonEl.addEventListener('click', handleSubmit);
