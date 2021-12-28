//hide screen elements until user action
document.getElementById("search-term-card").style.display = "none";
//remove items from local storage on load
localStorage.clear();

var key = "AIzaSyDSvqHkiOyrUOr7LTw4D3tczbiBLBsRJR8";

var goButton = document.getElementById("go-button");
let randomWordUrl = "https://random-word-api.herokuapp.com/word?number=10";
async function getSearchTerms() {
  localStorage.clear();
  var pullWord = await fetch(randomWordUrl);
  var searchTermArray = await pullWord.json();
  console.log(searchTermArray);
  console.log(searchTermArray[1]);
  document.getElementById("search-term-card").style.display = "block";
  var searchTerms = "";
  for (let i = 0; i < searchTermArray.length; i++) {
    searchTerms =
      searchTerms +
      "| <a href='./#" +
      searchTermArray[i] +
      "' id=" +
      searchTermArray[i] +
      ">" +
      searchTermArray[i] +
      "</a> | ";
    localStorage.setItem("0123456789"[i], searchTermArray[i]);
  }
  document.getElementById("search-terms").innerHTML = searchTerms;
}
goButton.addEventListener("click", getSearchTerms);
goButton.addEventListener("touchstart", getSearchTerms);

async function searchYT(url) {
  var response = await fetch(url);
  var data = await response.json();
  localStorage.setItem("video-code", data.items[1].id.videoId);
  videoCode = localStorage.getItem("video-code");
  document.querySelector(
    "#video-iframe"
  ).src = `https://www.youtube.com/embed/${videoCode}?playsinline=0&fs=1`;
}
// //load youtube video on search term click
$("#search-term-card").click(function (event) {
  var searchTerm = $(event.target).text();
  var url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=2&q=${searchTerm}&type=video&videoDuration=short&key=${key}`;
  console.log(url);
  searchYT(url);
  // add the random video source into the video iframe on the html file
});
