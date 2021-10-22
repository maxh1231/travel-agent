var apiQuery = localStorage.getItem(localStorage.key(0));
var userInput = new URLSearchParams(window.location.search).get("location");




// hotel data fetch
let hotelDataCall = function () {

    fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${userInput}&locale=en_US`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            //"x-rapidapi-key": "26aa5aaa64msh7c71403c8404b50p1f70d8jsn250c3dfeb42e"
            "x-rapidapi-key": "26aa5aaa64msh7c71403c8404b50p1f70d8jsn250c3dfeb42e"
        }
    })
        .then(response => response.json())
        .then(function (hotelData) {
            var city_destinationId = hotelData.suggestions[0].entities[0].destinationId
            console.log(city_destinationId)
        })

        .catch(err => {
            console.error(err);
        });
    return city_destinationId

}

var city_destinationId = hotelDataCall()






// weather data fetch
let weatherDataCall = function () {


    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${userInput}&limit=5&appid=16504850b1a264a95e1797ff5a4e056b`)


        .then(response => response.json())
        .then(function (geoData) {
            console.log(geoData);
            var lat = geoData[0].lat;
            var lon = geoData[0].lon;


            fetch(`https://aerisweather1.p.rapidapi.com/forecasts/${lat},${lon}`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "aerisweather1.p.rapidapi.com",
                    "x-rapidapi-key": "26aa5aaa64msh7c71403c8404b50p1f70d8jsn250c3dfeb42e"
                }
            })
                .then(response => response.json())
                .then(function (weatherData) {
                    console.log(weatherData);
                    document.querySelector(".WR-picture").src = "assets/image/weather-icons/" + weatherData.response[0].periods[0].icon;
                    document.querySelector(".WR-date").textContent = weatherData.response[0].periods[0].dateTimeISO
                    document.querySelector(".WR-temperature").textContent = "High: " + weatherData.response[0].periods[0].maxTempF + " Low: " + weatherData.response[0].periods[0].minTempF
                    document.querySelector(".WR-wind").textContent = weatherData.response[0].periods[0].windSpeedMPH + " MPH"
                    document.querySelector(".WR-humidity").textContent = weatherData.response[0].periods[0].humidity + " %"
                    document.querySelector(".WR-uv-index").textContent = weatherData.response[0].periods[0].uvi



                })
                .catch(err => {
                    console.error(err);
                });
        })
}

/*
window.onload = function () {
    weatherDataCall();
}
*/
