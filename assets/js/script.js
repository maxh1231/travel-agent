var submitSearchBtn = document.getElementById("searchBtn");
var searchInputValue = document.getElementById("location");




// hotel data fetch


// weather data fetch


submitSearchBtn.addEventListener("click", function () {
	localStorage.setItem(searchInputValue.value, searchInputValue.value);
<<<<<<< HEAD
	// window.location.href = "hotel.html"
=======
	// window.location.href = "./hotel.html"
>>>>>>> develop

});
