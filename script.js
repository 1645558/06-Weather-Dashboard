var cityEl = document.querySelector('#city-search');
var cityInputEl = document.querySelector('#city');
var weatherContainerEl = document.querySelector('#current-weather-div');
var forecastHeadEl = document.querySelector('#forecast');
var forecastContainerEl = document.querySelector('#fiveday-container');
var previousSearchButtonEl = document.querySelector('#previous-search-buttons');
var searchedCityEl = document.querySelector('#searched-city');
var cities = [];

var citySubmitHandler = function (event) {
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if (city) {
        getCityWeather(city);
        get5Day(city);
        cityInputEl.value = '';
    }
    saveLocalStorage();
    previousSearch(city);
};

var getCityWeather = function (city) {
    var apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=0cf1c7e9555bfeee92b38ab834c53129`

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data, city);
        })
};

var get5Day = function (city) {
    var apiURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=0cf1c7e9555bfeee92b38ab834c53129`

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            display5Day(data);
        })
};

var getUvIndex = function (lat, lon) {
    var apiURL = `https://api.openweathermap.org/data/2.5/uvi?appid=0cf1c7e9555bfeee92b38ab834c53129&lat=${lat}&lon=${lon}`

    fetch(apiURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayUvIndex(data);
        })
};

var displayWeather = function (weather, searchCity) {

    weatherContainerEl.textContent = '';
    searchedCityEl.textContent = searchCity;

    //display date
    var currentDate = document.createElement('span')
    currentDate.textContent = ' - ' + moment(weather.dt.value).format('MMM D, YYYY');
    searchedCityEl.appendChild(currentDate);

    //display image
    var weatherImg = document.createElement('img')
    weatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
    searchedCityEl.appendChild(weatherImg);

    //display temp
    var temperatureEl = document.createElement('span');
    temperatureEl.textContent = 'Temperature: ' + weather.main.temp + ' °F';
    temperatureEl.classList = 'list-group-item';

    //display humidity
    var humidityEl = document.createElement('span');
    humidityEl.textContent = 'Humidity: ' + weather.main.humidity + ' %';
    humidityEl.classList = 'list-group-item';

    //display wind
    var windSpeedEl = document.createElement('span');
    windSpeedEl.textContent = 'Wind Speed: ' + weather.wind.speed + ' MPH';
    windSpeedEl.classList = 'list-group-item';

    weatherContainerEl.appendChild(temperatureEl);

    weatherContainerEl.appendChild(humidityEl);

    weatherContainerEl.appendChild(windSpeedEl);

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    getUvIndex(lat, lon);
};

var displayUvIndex = function (index) {
    var uvIndexEl = document.createElement('div');
    uvIndexEl.textContent = 'UV Index: ';
    uvIndexEl.classList = 'list-group-item';

    uvIndexValue = document.createElement('span');
    uvIndexValue.textContent = index.value;

    if(index.value <=2){
        uvIndexValue.classList = "favorable text-success"
    }else if(index.value >2 && index.value<=8){
        uvIndexValue.classList = "moderate text-warning"
    }
    else if(index.value >8){
        uvIndexValue.classList = "severe text-danger"
    };

    uvIndexEl.appendChild(uvIndexValue);

    weatherContainerEl.appendChild(uvIndexEl);
};

var display5Day = function (weather) {
    forecastContainerEl.textContent = '';
    forecastHeadEl.textContent = '5-Day Forecast:';

    var forecast = weather.list;
    for (var i = 5; i < forecast.length; i = i + 8) {
        var dailyForecast = forecast[i];

        //create card to display info
        var forecastEl = document.createElement('div');
        forecastEl.classList = 'card bg-primary text-light m-2';

        //display date
        var forecastDate = document.createElement('h5')
        forecastDate.textContent = moment.unix(dailyForecast.dt).format('MMM D, YYYY');
        forecastDate.classList = 'card-header text-center';


        //display image
        var weatherImg = document.createElement('img')
        weatherImg.classList = 'card-body text-center';
        weatherImg.setAttribute('src', `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);


        //display temp
        var forecastTempEl = document.createElement('span');
        forecastTempEl.classList = 'card-body text-center';
        forecastTempEl.textContent = 'Temperature: ' + dailyForecast.main.temp + ' °F';


        //display humidity
        var forecastHumEl = document.createElement('span');
        forecastHumEl.classList = 'card-body text-center';
        forecastHumEl.textContent = 'Humidity: ' + dailyForecast.main.humidity + '  %';

        //display wind
        var forecastWindEl = document.createElement('span');
        forecastWindEl.classList = 'card-body text-center';
        forecastWindEl.textContent = 'Wind: ' + dailyForecast.wind.speed + ' MPH';

        forecastEl.appendChild(forecastDate);

        forecastEl.appendChild(weatherImg);

        forecastEl.appendChild(forecastTempEl);

        forecastEl.appendChild(forecastHumEl);

        forecastEl.appendChild(forecastWindEl);

        forecastContainerEl.appendChild(forecastEl);
    }

};

//sets local storage
var saveLocalStorage = function () {
    localStorage.setItem('cities', JSON.stringify(cities));
};

//creates the previous searched city buttons
var previousSearch = function (savedSearch) {

    savedSearchEl = document.createElement('button');
    savedSearchEl.textContent = savedSearch;
    savedSearchEl.classList = 'd-flex w-100 btn-light border p-2';
    savedSearchEl.setAttribute('data-city', savedSearch)
    savedSearchEl.setAttribute('type', 'submit');

    previousSearchButtonEl.prepend(savedSearchEl);
};

var previousSearchHandler = function (event) {
    var city = event.target.getAttribute('data-city')
    if (city) {
        getCityWeather(city);
        get5Day(city);
    }
};

cityEl.addEventListener('submit', citySubmitHandler);
previousSearchButtonEl.addEventListener('click', previousSearchHandler);