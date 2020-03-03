// Create subject array to hold pre-selected button subjects
var subjectArray = ["puppies", "kittens", "birds"];

// Create variables for API parameters

// apiKey is set to "constant" because we don't want it to change
const apiKey = "4xW69sv2q24wSAau2sHmhQGN7YLyBlWi";
var limit = "10";
var rating = "g";
var subject = "magic";

// Create query URL
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + subject + "&" + limit + "=10&offset=0&rating=" + rating + "&lang=en";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log("got data: " + queryURL);

  // Here we define our gif results. We're working with the first ten.
  gifResults = [
    response.data[0].images.downsized.url,
    response.data[2].images.downsized.url,
    response.data[3].images.downsized.url,
    response.data[4].images.downsized.url,
    response.data[5].images.downsized.url,
    response.data[6].images.downsized.url,
    response.data[7].images.downsized.url,
    response.data[8].images.downsized.url,
    response.data[9].images.downsized.url,
  ];

// Loop through the results to display them on the page
  for (var j = 0; j < gifResults.length; j++) {

    // Each result will be saved as an img element
    gif = "<img src=" + response.data[j].images.downsized.url + " class= 'captured-gif' />";

    // We append the img element to the parent div
    $(".gif-div").append(gif);
  }

// If there is an error getting the data, we'll console log the error message
}).catch(function(err) {
  console.log(err.message);
});


// Here we'll create buttons for our preselected subjects
function createButtons() {


  $("#buttons-div").empty();

  for (var i = 0; i < subjectArray.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn btn-outline-primary btn-lg gif-button");
    newButton.attr("data-name", subjectArray[i]);
    newButton.text(subjectArray[i]);
    $("#buttons-div").append(newButton);
  }
}

// Here we'll add buttons if the user enters a search parameter
$("#search-parameters").on("click", function(event) {
  event.preventDefault();
  var subject = $("#search-input").val().trim();
  subjectArray.push(subject);
  createButtons();
});

createButtons();
