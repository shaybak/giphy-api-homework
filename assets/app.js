// Create subject array to hold pre-selected button subjects
var subjectArray = ["alpacas", "dogs", "cats", "magic", "potatoes", "hogwarts"];

// Create variables for API parameters

// apiKey is set to "constant" because we don't want it to change
const apiKey = "4xW69sv2q24wSAau2sHmhQGN7YLyBlWi";
var limit = "10";
var rating = "g";
var subject = "quokka";
var numberOfClicks = 0;

// Create query URL
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + subject + "&" + limit + "=10&offset=0&rating=" + rating + "&lang=en";

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  console.log("got data: " + queryURL);

  // Here we define our gif results. We're working with the first ten (i.e., indicies 0 - 9).
  var gifResults = [
    response.data[0].images.downsized_still.url,
    response.data[1].images.downsized_still.url,
    response.data[2].images.downsized_still.url,
    response.data[3].images.downsized_still.url,
    response.data[4].images.downsized_still.url,
    response.data[5].images.downsized_still.url,
    response.data[6].images.downsized_still.url,
    response.data[7].images.downsized_still.url,
    response.data[8].images.downsized_still.url,
    response.data[9].images.downsized_still.url,
  ]

  // Loop through the results to display them on the page
  for (var j = 0; j < gifResults.length; j++) {

    // Each result will be saved as an img element
    gif = "<img src=" + response.data[j].images.downsized_still.url + " class= 'captured-gif' />";

    // We append the img element to the parent div
    $(".gif-div").append(gif);
  }


  // Found how to capture clicked element index from stackoverflow:
  // Source: https://stackoverflow.com/questions/5545283/get-index-of-clicked-element-in-collection-with-jquery
  $(".captured-gif").on("click", function () {

    
    numberOfClicks++;

    console.log(numberOfClicks);

    if (numberOfClicks % 2 === 0) {
      ndexOfClickedGif = $(".captured-gif").index(this);
      $(this).attr("src", response.data[indexOfClickedGif].images.downsized_still.url)
    } else {
      indexOfClickedGif = $(".captured-gif").index(this);
      $(this).attr("src", response.data[indexOfClickedGif].images.downsized.url);
    }
  })

  // If there is an error getting the data, we'll console log the error message
}).catch(function (err) {
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
$("#search-parameters").on("click", function (event) {
  event.preventDefault();
  var subject = $("#search-input").val().trim();
  subjectArray.push(subject);
  createButtons();
});

createButtons();
