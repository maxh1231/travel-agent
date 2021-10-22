var submitSearchBtn = document.getElementById("searchBtn");
var searchInputValue = document.getElementById("location");

submitSearchBtn.addEventListener("click", function () {

	localStorage.setItem("previousSearch", JSON.stringify(searchInputValue.value));
	//window.location.href = "./hotel.html"

});


