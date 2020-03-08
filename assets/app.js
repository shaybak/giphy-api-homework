// Create subject array to hold pre-selected button subjects
var subjectArray = ["alpacas", "dogs", "cats", "magic", "potatoes", "hogwarts"];

// Create variables for API parameters

// apiKey is set to "constant" because we don't want it to change
const apiKey = "4xW69sv2q24wSAau2sHmhQGN7YLyBlWi";
var limit = "10";
// var rating = "g";
var subject = "quokka";
var numberOfClicks = 0;
var gifStill = [];
var gifAnimated = [];

createButtons();
getAPIData();

function getAPIData() {
  // Create query URL
  // var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + subject + "&" + limit + "=10&offset=0&rating=" + rating + "&lang=en";

  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apiKey + "&q=" + subject + "&limit=" + limit + "&offset=0&lang=en&random_id:e826c9fc5c929e0d6c6d423841a282aa";

  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log("got data from: " + queryURL);

    // Here we define our gif results. We're working with the first ten (i.e., indicies 0 - 9).

    // array of still URLs
    gifStill = [
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

    // array of animated URLs
    gifAnimated = [
      response.data[0].images.downsized.url,
      response.data[1].images.downsized.url,
      response.data[2].images.downsized.url,
      response.data[3].images.downsized.url,
      response.data[4].images.downsized.url,
      response.data[5].images.downsized.url,
      response.data[6].images.downsized.url,
      response.data[7].images.downsized.url,
      response.data[8].images.downsized.url,
      response.data[9].images.downsized.url,
    ]

    // Loop through the results to display them on the page
    for (var j = 0; j < gifStill.length; j++) {

      

      // Each result will be saved as an img element
      var gif = "<img src=" + gifStill[j] + " class= 'captured-gif' />";

      //Create sub-div for image and rating
      subDiv = $("<div>").addClass("img-and-rating");

      // Create element for rating
      var ratingElement = $("<p>").addClass("rating")

      // Create variable rating to store rating value
      var rating = "Rating: " + response.data[0].rating

      // Append rating value to the rating element
      ratingElement.append(rating);

      // Append gif and rating element to subDiv
      subDiv.append(gif);
      subDiv.append(ratingElement);

      // We append the subDiv  to the parent div
      $(".gif-div").append(subDiv);
    }




    // Found how to capture clicked element index from stackoverflow:
    // Source: https://stackoverflow.com/questions/5545283/get-index-of-clicked-element-in-collection-with-jquery
    $(".captured-gif").on("click", function () {

      var indexOfClickedGif = "";

      numberOfClicks++;

      console.log(numberOfClicks);

      if (numberOfClicks % 2 === 0) {
        indexOfClickedGif = $(".captured-gif").index(this);
        $(this).attr("src", gifStill[indexOfClickedGif]);
      } else {
        indexOfClickedGif = $(".captured-gif").index(this);
        $(this).attr("src", gifAnimated[indexOfClickedGif]);
      }
    });

    // If there is an error getting the data, we'll console log the error message
  }).catch(function (err) {
    console.log(err.message);
  });

}

// Here we'll add buttons if the user enters a search parameter
$("#search-parameters").on("click", function (event) {
  event.preventDefault();
  var newSubject = $("#search-input").val().trim();
  subjectArray.push(newSubject);

  console.log(subjectArray);
  console.log(newSubject);

  subject = newSubject;
  $(".gif-div").empty();
  $("#search-input").val("");
  getAPIData(subject);
  createButtons();
});

// $(".subject-button").on("click", function () {
//   subject = $(this).attr("data-name");
//   // console.log(subject);
//   $(".gif-div").empty();
//   getAPIData(subject);
// });

$(document).on("click", ".subject-button", function () {
  subject = $(this).attr("data-name");
  // console.log(subject);
  $(".gif-div").empty();
  getAPIData(subject);
})

// Here we'll create buttons for our preselected subjects
function createButtons() {

  $("#buttons-div").empty();

  for (var i = 0; i < subjectArray.length; i++) {
    var newButton = $("<button>");
    newButton.addClass("btn btn-outline-primary btn-lg subject-button");
    newButton.attr("data-name", subjectArray[i]);
    newButton.text(subjectArray[i]);
    $("#buttons-div").append(newButton);

  }
}