var apiQuery = localStorage.getItem(localStorage.key(0));
var userInput = new URLSearchParams(window.location.search).get("location");

var city_destinationId;


// fetches destination id from Hotels API
let hotelDataCall = function () {

    fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${userInput}&locale=en_US`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key": "cb11f2ee2fmsha08fecdbc24fd3cp11b47bjsn82e3b7599a4d"
        }
    })

        .then(response => response.json())
        .then(function (hotelData) {
            var city_destinationId = hotelData.suggestions[0].entities[0].destinationId
            fetch(`https://hotels4.p.rapidapi.com/properties/list?destinationId=${city_destinationId}&pageNumber=1&pageSize=10&checkIn=2021-10-30&checkOut=2021-10-31&adults1=1&sortOrder=PRICE&locale=en_US&currency=USD`, {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "hotels4.p.rapidapi.com",
                    "x-rapidapi-key": "cb11f2ee2fmsha08fecdbc24fd3cp11b47bjsn82e3b7599a4d"
                }
            })
                .then(response => response.json())
                .then(function (hotelPropertiesData) {
                    //placeholder for now until update on hotel.html
                    console.log(hotelPropertiesData.data.body.searchResults.results)
                    document.querySelector(".HR-picture").src = hotelPropertiesData.data.body.searchResults.results[0].optimizedThumbUrls.srpDesktop
                    document.querySelector(".HR-price").textContent = hotelPropertiesData.data.body.searchResults.results[0].ratePlan.price.current
                    document.querySelector(".HR-rating").textContent = hotelPropertiesData.data.body.searchResults.results[0].starRating + " star"
                    document.querySelector(".HR-address").textContent = hotelPropertiesData.data.body.searchResults.results[0].address.streetAddress + ", "
                        + hotelPropertiesData.data.body.searchResults.results[0].address.locality + ", " + hotelPropertiesData.data.body.searchResults.results[0].address.region + " " + hotelPropertiesData.data.body.searchResults.results[0].address.postalCode
                    document.querySelector(".HR-name").textContent = hotelPropertiesData.data.body.searchResults.results[0].name
                    var hotelLocation = hotelPropertiesData.data.body.searchResults.results[0].coordinate
                    //document.querySelector(".HR-map").src = "https://www.google.com/maps/embed/v1/streetview?location=40.7719,-111.8764&key=AIzaSyAD1j26SQoCLmAFKABhY_QKa25HtuYWdhU"
                    document.querySelector(".HR-map").src = `https://www.google.com/maps/embed/v1/streetview?location=${hotelLocation["lat"]},${hotelLocation["lon"]}&key=AIzaSyAD1j26SQoCLmAFKABhY_QKa25HtuYWdhU`
                })

                .catch(err => {
                    console.error(err);
                });
        })

}






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

                    // Day 1
                    document.getElementById("WR-01-picture").src = "assets/image/weather-icons/" + weatherData.response[0].periods[0].icon;
                    document.getElementById("WR-01-date").textContent = moment().format("M/DD/YYYY");
                    document.getElementById("WR-01-temp").textContent = "High: " + weatherData.response[0].periods[0].maxTempF + " Low: " + weatherData.response[0].periods[0].minTempF
                    document.getElementById("WR-01-wind").textContent = weatherData.response[0].periods[0].windSpeedMPH + " MPH"
                    document.getElementById("WR-01-humidity").textContent = weatherData.response[0].periods[0].humidity + " %"
                    document.getElementById("WR-01-index").textContent = weatherData.response[0].periods[0].uvi + " UVI"

                    // Day 2
                    document.getElementById("WR-02-picture").src = "assets/image/weather-icons/" + weatherData.response[0].periods[1].icon;
                    document.getElementById("WR-02-date").textContent = moment().add(1, 'days').format("M/DD/YYYY");
                    document.getElementById("WR-02-temp").textContent = "High: " + weatherData.response[0].periods[1].maxTempF + " Low: " + weatherData.response[0].periods[1].minTempF
                    document.getElementById("WR-02-wind").textContent = weatherData.response[0].periods[1].windSpeedMPH + " MPH"
                    document.getElementById("WR-02-humidity").textContent = weatherData.response[0].periods[1].humidity + " %"
                    document.getElementById("WR-02-index").textContent = weatherData.response[0].periods[1].uvi + " UVI"

                    // Day 3
                    document.getElementById("WR-03-picture").src = "assets/image/weather-icons/" + weatherData.response[0].periods[2].icon;
                    document.getElementById("WR-03-date").textContent = moment().add(2, 'days').format("M/DD/YYYY");
                    document.getElementById("WR-03-temp").textContent = "High: " + weatherData.response[0].periods[2].maxTempF + " Low: " + weatherData.response[0].periods[2].minTempF
                    document.getElementById("WR-03-wind").textContent = weatherData.response[0].periods[2].windSpeedMPH + " MPH"
                    document.getElementById("WR-03-humidity").textContent = weatherData.response[0].periods[2].humidity + " %"
                    document.getElementById("WR-03-index").textContent = weatherData.response[0].periods[2].uvi + " UVI"

                    // Day 4
                    document.getElementById("WR-04-picture").src = "assets/image/weather-icons/" + weatherData.response[0].periods[3].icon;
                    document.getElementById("WR-04-date").textContent = moment().add(3, 'days').format("M/DD/YYYY");
                    document.getElementById("WR-04-temp").textContent = "High: " + weatherData.response[0].periods[3].maxTempF + " Low: " + weatherData.response[0].periods[3].minTempF
                    document.getElementById("WR-04-wind").textContent = weatherData.response[0].periods[3].windSpeedMPH + " MPH"
                    document.getElementById("WR-04-humidity").textContent = weatherData.response[0].periods[3].humidity + " %"
                    document.getElementById("WR-04-index").textContent = weatherData.response[0].periods[3].uvi + " UVI"

                    // Day 5
                    document.getElementById("WR-05-picture").src = "assets/image/weather-icons/" + weatherData.response[0].periods[4].icon;
                    document.getElementById("WR-05-date").textContent = moment().add(4, 'days').format("M/DD/YYYY");
                    document.getElementById("WR-05-temp").textContent = "High: " + weatherData.response[0].periods[4].maxTempF + " Low: " + weatherData.response[0].periods[4].minTempF
                    document.getElementById("WR-05-wind").textContent = weatherData.response[0].periods[4].windSpeedMPH + " MPH"
                    document.getElementById("WR-05-humidity").textContent = weatherData.response[0].periods[4].humidity + " %"
                    document.getElementById("WR-05-index").textContent = weatherData.response[0].periods[4].uvi + " UVI"




                })
                .catch(err => {
                    console.error(err);
                });
        })
}


window.onload = function () {
    weatherDataCall();
    hotelDataCall();
}

