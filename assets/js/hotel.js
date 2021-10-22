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



window.onload = function () {
    hotelDataCall();
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
