// Determine the city
var cityInputEl = document.querySelector("#city-name-input");
// apikey to authorize search
const apikey = "f431e0b2fba2d152c610f1222f98d6d3";
// execute search
const searchbtnEl = document.getElementById("search-button");
//current weather display
const citynameEl = document.getElementById("city-name");
const cImageEl = document.getElementById("current-image");
const cTempEl = document.getElementById("temp");
const cHumidityEl = document.getElementById("humidity");4
const cWindEl = document.getElementById("wind");
const cUVEl = document.getElementById("UV");

//To Do:
// UV Index
// WHEN a search is complete, commit the search to local storage


//Weather in the selected city
var cityweather = function (search) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + apikey;
    console.log(apiUrl)
    fetch(apiUrl)
    .then(function (response) {
        response.json().then(function(data) {
            console.log(data);
            const currentDate = new Date(data.dt*1000);
            const day = currentDate.getDate();
            const month = currentDate.getMonth() + 1;
            const year = currentDate.getFullYear();
            citynameEl.innerHTML = data.name + " (" + month + "/" + day + "/" + year + ") ";
            let weatherImage = data.weather[0].icon;
            cImageEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherImage + "@2x.png");
            cImageEl.setAttribute("alt",data.weather[0].description);
            cTempEl.innerHTML = "Current Temperature: " + tempbright(data.main.temp) + " &#176F";
            cHumidityEl.innerHTML = "Current Humidity: " + data.main.humidity + "%";
            cWindEl.innerHTML = "Current Wind Speed: " + data.wind.speed + " MPH";
            getforecast(search);
        });
    });
};

//Coming soon
var getforecast = function (search) {
    let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + apikey;
    console.log(apiUrl)
    fetch(apiUrl)
    .then(function (response) {
        response.json().then(function(data) {
            console.log(data);
            
            const forecastEls = document.querySelectorAll(".forecast-card");
            for (i=0; i<forecastEls.length; i++) {
                forecastEls[i].innerHTML = "";
                const forecastIndex = i*8 + 4;
                const forecastDate = new Date(data.list[forecastIndex].dt * 1000);
                const forecastDay = forecastDate.getDate();
                const forecastMonth = forecastDate.getMonth() + 1;
                const forecastYear = forecastDate.getFullYear();
                const forecastDateEl = document.createElement("p");
                forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                forecastEls[i].append(forecastDateEl);
                const forecastWeatherEl = document.createElement("img");
                forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + data.list[forecastIndex].weather[0].icon + "@2x.png");
                forecastWeatherEl.setAttribute("alt",data.list[forecastIndex].weather[0].description);
                forecastEls[i].append(forecastWeatherEl);
                const forecastTempEl = document.createElement("p");
                forecastTempEl.innerHTML = "Temp: " + tempbright(data.list[forecastIndex].main.temp) + " &#176F";
                forecastEls[i].append(forecastTempEl);
                const forecastHumidityEl = document.createElement("p");
                forecastHumidityEl.innerHTML = "Humidity: " + data.list[forecastIndex].main.humidity + "%";
                forecastEls[i].append(forecastHumidityEl);
                }
        });
    });
};


function tempbright(temp) {
    return Math.floor((temp - 273.15) *1.8 +32);
}

//Take the city and push it through cityweather
searchbtnEl.addEventListener("click",function() {
    var cityInput = cityInputEl.value.trim();
    console.log("Searching for weather in: " + cityInput);
    const search = cityInput;

    cityweather(search);
})