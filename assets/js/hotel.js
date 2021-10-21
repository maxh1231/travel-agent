
var apiQuery = localStorage.getItem(localStorage.key(0));
var userInput = new URLSearchParams(window.location.search).get("location");



// hotel data fetch
let hotelDataCall = function () {

    fetch(`https://hotels4.p.rapidapi.com/locations/search?query=${userInput}&locale=en_US`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "hotels4.p.rapidapi.com",
            "x-rapidapi-key": "26aa5aaa64msh7c71403c8404b50p1f70d8jsn250c3dfeb42e"
        }
    })
        .then(response => response.json())
        .then(function (hotelData) {
            console.log(hotelData);
            // for (let i = 0; i < 10; i++) {
            // 	console.log(data.suggestions[1].entities[i]);

            // }




        })

        .catch(err => {
            console.error(err);
        });



}

// weather data fetch
let weatherDataCall = function () {


    fetch(`https://visual-crossing-weather.p.rapidapi.com/forecast?aggregateHours=24&location=${userInput}&contentType=json&unitGroup=us&shortColumnNames=0`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "visual-crossing-weather.p.rapidapi.com",
            "x-rapidapi-key": "26aa5aaa64msh7c71403c8404b50p1f70d8jsn250c3dfeb42e"
        }
    })
        .then(response => response.json())
        .then(function (weatherData) {
            console.log(weatherData);




        })
        .catch(err => {
            console.error(err);
        });

}

// window.onload = function () {
//     weatherDataCall();
//     hotelDataCall();
// }