// Determine the city
const cityEl = document.getElementById("city-name-input");
// apikey to authorize search
const apikey = "f431e0b2fba2d152c610f1222f98d6d3";
// execute search
const searchbtnEl = document.getElementById("search-button");


//build a function that calls the API key to pull weather data. -Function added, citysearch
//Example: https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=f431e0b2fba2d152c610f1222f98d6d3 -Function working
//Tie that function to the html document's search-button

//Items needed WILL include:
// 
// City Name
// Temperature
// Humidity
// UV Index
// Wind
// 5 Day Forecast
// 
// WHEN a search is complete, commit the search to local storage



var cityweather = function () {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityEl + "&appid=" + apikey;
    console.log(apiUrl);

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
            });
        } else {
            alert("Error: " + response.statusText);
        }
    });
};

cityweather();

//Let's see if our button is clinking
searchbtnEl.addEventListener("click",function() {
    console.log("I've been clicked!");
    // const searchTerm = cityEl.value;
    // getWeather(searchTerm);
    // searchHistory.push(searchTerm);
    // localStorage.setItem("search",JSON.stringify(searchHistory));
    // renderSearchHistory();
})