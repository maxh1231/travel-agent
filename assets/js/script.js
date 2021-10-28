var submitSearchBtn = document.getElementById("searchBtn");
var searchInputValue = document.getElementById("location");

var PSDcontainer = document.getElementsByClassName("PSD-container");
var userformEl = document.getElementById("user-form");

// Update the "previousSearch" by putting "newSearch" into it, then clear out "previousSearch"
var updatePreviousSearch = function () {
	var newSearch = localStorage.getItem("newSearch");
	var previousSearch = localStorage.getItem("previousSearch");
	var temp = [];

	var legitFlag = window.location.href.split("=");

	if ((legitFlag.length != 1) && (legitFlag[1] == "true")) {
		document.getElementById("user-form").reset();
		var newSearchItem = JSON.parse(newSearch);
		var elementCheck = document.getElementById("errorMessage");
		if (elementCheck) {
			elementCheck.textContent = newSearchItem + " cannot be FOUND!";
		} else {
			var errorInputMessage = document.createElement("h2");
			errorInputMessage.setAttribute("id", "errorMessage");
			errorInputMessage.setAttribute("style", "color:red; font-weight:bold;");
			errorInputMessage.textContent = newSearchItem + " cannot be FOUND!";
			userformEl.appendChild(errorInputMessage);
		}
		localStorage.setItem("newSearch", "");
	} else {
		if (newSearch) {
			// If there is newSearch data, try to update previousSearch
			var newSearchItem = JSON.parse(newSearch);
			if (newSearchItem != "") {
				if (!previousSearch) {
					// If previousSearch is empty, put newSearch data into array and store in previousSearch
					temp.push(newSearchItem)
					localStorage.setItem("previousSearch", JSON.stringify(temp));
				} else {
					// If there is previousSearch data, push newSearch data into it
					var repeatFlag = false;
					var previousSearchRecord = JSON.parse(previousSearch);
					// Compare if there is a record in previous Search already
					for (var i = 0; i < previousSearchRecord.length; i++) {
						var newSearchItemString = newSearchItem.split(" ").join("");
						var previousSearchRecordString = previousSearchRecord[i].split(" ").join("");
						if (newSearchItemString == previousSearchRecordString) {
							repeatFlag = true;
						}
					}
					// Only add when there is no duplicate record
					if (!repeatFlag) {
						previousSearchRecord.push(newSearchItem);
						localStorage.setItem("previousSearch", JSON.stringify(previousSearchRecord));
					}
				}
				// Clear out newSearch data in case user refresh
				localStorage.setItem("newSearch", "");
			}
		} 
	}

}

// Display All Previous Search Record
var loadPreviousSearch = function () {
	var previousSearch = localStorage.getItem("previousSearch");
	// Empty PSD-container
	PSDcontainer[0].innerHTML = "";  // Comment this Line if hard code example is needed. CSSexample
	var previousSearchRecord = JSON.parse(previousSearch);

	// Load the previous search record if there is any.
	if ((previousSearchRecord) && (previousSearchRecord[0])) {
		
		for (var i = 0; i < previousSearchRecord.length; i++)
		{
			// Example Structure
			//  <article id="PSD-1" class="PSD-item">
            //   <div class="PSD-detail">
            //    <div class="PSD-destination">
            //     <h3 class="display-label">Location : </h3>
            //     <h3 class="display-answer">Salt Lake City</h3>
            //    </div>
            //   </div>
            //   <button type="button" class="btn" id="PSD-1-searchBtn">Search Again</button>
            //   <button type="button" class="btn" id="PSD-1-deleteBtn">Delete Record</button>
            //  </article>

			// Generate ID string
			var PSDitemID = "PSD-" + i;
			var searchBtnID = "PSD-" + i + "-searchBtn";
			var deleteBtnID = "PSD-" + i + "-deleteBtn";
		
			// Create Elements
			var PSDitem = document.createElement("article");
			var PSDdetail = document.createElement("div");
			var PSDdestination = document.createElement("div");
			var displaylabel = document.createElement("h3");
			var displayanswer = document.createElement("h3");
			var searchBtn = document.createElement("button");
			var deleteBtn = document.createElement("button");
			
			// Set Attribute for each elements
			PSDitem.setAttribute("id", PSDitemID);
			PSDitem.setAttribute("class", "PSD-item");
			PSDdetail.setAttribute("class", "PSD-detail");
			PSDdestination.setAttribute("class", "PSD-destination");
			displaylabel.setAttribute("class","display-label");
			displaylabel.textContent = "Location : ";
			displayanswer.setAttribute("class", "display-answer");
			displayanswer.textContent = previousSearchRecord[i];
			searchBtn.setAttribute("type", "button");
			searchBtn.setAttribute("class", "btn button is-link");
			searchBtn.setAttribute("id", searchBtnID);
			searchBtn.textContent = "Search Again";
			deleteBtn.setAttribute("type", "button");
			deleteBtn.setAttribute("class", "btn button is-danger");
			deleteBtn.setAttribute("id", deleteBtnID);
			deleteBtn.textContent = "Delete Record";

			// Position each element in their spots
			PSDcontainer[0].appendChild(PSDitem);
			PSDitem.appendChild(PSDdetail);
			PSDitem.appendChild(searchBtn);
			PSDitem.appendChild(deleteBtn);
			PSDdetail.appendChild(PSDdestination);
			PSDdestination.appendChild(displaylabel);
			PSDdestination.appendChild(displayanswer);

		}
	} else {
		// Display No Record Message
		var displayTitle = document.createElement("h3");
		displayTitle.setAttribute("class", "noRecordMessage");
		displayTitle.setAttribute("style", "font-size : 20px; font-weight : bold; text-align : center");
		displayTitle.textContent = "There is no previous search record";
		PSDcontainer[0].appendChild(displayTitle);
	}


}

var loadIndexPage = function () {
	updatePreviousSearch();
	loadPreviousSearch();
}

// Saved the search location to Local Storage "newSearch"
submitSearchBtn.addEventListener("click", function (event) {
	event.preventDefault();

	var targetCity = searchInputValue.value.toUpperCase().trim();

	if (targetCity.length != 0) {
		// If input value is not empty string, store value and move to hotel.html
		localStorage.setItem("newSearch", JSON.stringify(targetCity));
		targetCity = targetCity.replaceAll(" ", "+");
		var hrefLink = "./hotel.html?location=" + targetCity;
		document.getElementById("user-form").reset();
		window.location.href = hrefLink;
	} else {
		// If input value is empty string, display Error Message
		document.getElementById("user-form").reset();
		var elementCheck = document.getElementById("errorMessage");
		if (elementCheck) {
			elementCheck.textContent = "Location cannot be EMPTY!";
		} else {
			var errorInputMessage = document.createElement("h2");
			errorInputMessage.setAttribute("id", "errorMessage");
			errorInputMessage.setAttribute("style", "color:red; font-weight:bold;");
			errorInputMessage.textContent = "Location cannot be EMPTY!";
			userformEl.appendChild(errorInputMessage);
		}
	}

});

PSDcontainer[0].addEventListener("click", function(event) {
	var targetID = event.target.id;
	var targetClass = event.target.className;

	targetClass = targetClass.split(" ");

	if (targetClass[0] == "btn") {
		// If it is the button, break down the ID for more info
		var targetIDInfo = targetID.split("-");
		var previousSearch = localStorage.getItem("previousSearch");
		previousSearch = JSON.parse(previousSearch);

		if (targetIDInfo[2] == "searchBtn") {
			// If it is a search button, pull the location from Local Storage
			var targetLocation = previousSearch[targetIDInfo[1]];

			// Replacing spaces into +, and generate the href link
			targetLocation = targetLocation.replaceAll(" ", "+");
			var hrefLink = "./hotel.html?location=" + targetLocation;
			
			// Go to hotel.html with the query string
			window.location.href = hrefLink;
		} else {
			var temp = [];
			for (var i = 0; i < previousSearch.length; i++) {
				// Push all previous search record to temporary array except the one need to be deleted
				if (i != targetIDInfo[1]) {
					temp.push(previousSearch[i]);
				}	
			}
			localStorage.setItem("previousSearch", JSON.stringify(temp));
			loadPreviousSearch();
		}
	}

})

loadIndexPage();