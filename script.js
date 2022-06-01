var textInput = document.querySelector('.text')

function getApi() {

var requestURL = 'http://api.openweathermap.org/geo/1.0/direct?q='+textInput.value+'&appid=0cf1c7e9555bfeee92b38ab834c53129'

fetch(requestURL)
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data) {
        console.log(data);
        getOneCallWeather(data[0].lat, data[0].lon);
    });
}

function getOneCallWeather(lat, lon) {
    fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=0cf1c7e9555bfeee92b38ab834c53129`)
        .then(function(response) {
            return response.json()
        })
        .then(function(data) {
            console.log(data)
        })
}
getApi()