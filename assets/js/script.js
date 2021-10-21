var submitSearchBtn = document.getElementById("searchBtn");
var searchInputValue = document.getElementById("location");


let citySearch = function (event) {
	event.preventDefault();
	fetch("https://hotels4.p.rapidapi.com/locations/search?query=salt%20lake%20city&locale=en_US", {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "hotels4.p.rapidapi.com",
			"x-rapidapi-key": "26aa5aaa64msh7c71403c8404b50p1f70d8jsn250c3dfeb42e"
		}
	})
		.then(response => response.json())
		.then(function (data) {

			for (let i = 0; i < 10; i++) {
				console.log(data.suggestions[1].entities[i]);

			}


		})

		.catch(err => {
			console.error(err);
		});
}

submitSearchBtn.addEventListener("click", citySearch);
