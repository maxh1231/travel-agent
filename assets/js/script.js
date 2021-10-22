var submitSearchBtn = document.getElementById("searchBtn");
var PSDcontainer = document.getElementsByClassName("PSD-container");

var loadPreviousSearch = function () {
	var previousSearch = localStorage.getItem("previousSearch");

	// Load the previous search record if there is any.
	if (previousSearch) {
		previousSearch = JSON.parse(previousSearch);

		for (var i = 0; i < previousSearch.length; i++)
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
			displayanswer.textContent = previousSearch[i];
			searchBtn.setAttribute("type", "button");
			searchBtn.setAttribute("class", "btn");
			searchBtn.setAttribute("id", searchBtnID);
			searchBtn.textContent = "Search Again";
			deleteBtn.setAttribute("type", "button");
			deleteBtn.setAttribute("class", "btn");
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
	}
}

submitSearchBtn.addEventListener("click", function (event) {
	event.preventDefault();

	var searchInputValue = document.getElementById("location");
	var previousSearch = localStorage.getItem("previousSearch");
	var temporarySearch = [];

	if (!previousSearch) {
        temporarySearch.push(searchInputValue.value);
        localStorage.setItem("previousSearch", JSON.stringify(temporarySearch));
    } else {
		previousSearch = JSON.parse(previousSearch);
		previousSearch.push(searchInputValue.value);
		localStorage.setItem("previousSearch", JSON.stringify(previousSearch));
	}
});

loadPreviousSearch();