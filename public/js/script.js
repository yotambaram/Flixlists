/////// DOM manipulation

// get the inputs from user and do...

// take the data from dt and show it on browser.

/////// DOM manipulation
// get the inputs from user and do...
// take the data from dt and show it on browser.
// This function handles events where a movie button is clicked

$("#movie_search").on("submit", function (event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  let movie = $("#movie_search_title").val().trim();
  // this is John's key.
  // TODO: encrypt here
  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=47b3bbc4";
  // Creating an AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    // Creating a div to hold the movie
    var movieDiv = $("<div class='movie'>");
    // Storing the rating data
    var rating = response.Rated;
    // Creating an element to have the rating displayed
    var pOne = $("<p>").text("Rating: " + rating);
    // Displaying the rating
    movieDiv.append(pOne);
    // Storing the release year
    var released = response.Released;
    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Released: " + released);
    // Displaying the release year
    movieDiv.append(pTwo);
    // Storing the plot
    var plot = response.Plot;
    // Creating an element to hold the plot
    var pThree = $("<p>").text("Plot: " + plot);
    // Appending the plot
    movieDiv.append(pThree);
    // Retrieving the URL for the image
    var imgURL = response.Poster;
    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);
    // Appending the image
    movieDiv.append(image);
    // Create a button with movie data attached
    var movieTitle = response.Title;
    var movieID = response.imdbID;
    // var button = $("<button>").text("Title: " + movieTitle);
    var button = $("<button>").text("ID: " + movieID);
    // button.addClass
    // adding button to page  
    movieDiv.append(button);
    // Putting the entire movie above the previous movies
    $("#movies-view").prepend(movieDiv);



    $("#add-to-list").on("click", function (event) {   
      event.preventDefault();
      let listId = $(this).data("id")
      let movieObj = {
        movieName: response.Title,
        movieID: movieID,
      }
      $.ajax({
        method: "POST",
        data: movieObj,
        url: `/movies/${listId}`
      }).then(data => {
        console.log(data)
        location.href = "/"
      })
    });

  });
});


$("#sign-up-form").submit(function (event) {
  event.preventDefault();
  const userObj = {
    first_name: event.target.first_name.value,
    last_name: event.target.last_name.value,
    email: event.target.email.value,
    password: event.target.password.value
  }
  console.log(userObj)

  $.ajax({
    method: "POST",
    data: userObj,
    url: "/signup"
  }).then(data => {
    location.href = "/"
  })
});



$("#login-form").submit(function (event) {
  event.preventDefault();
  const logInObj = {
    email: $('#login_email').val(),
    password: $('#login_password').val()
  }
  console.log(logInObj)
  $.ajax({
    method: "POST",
    data: logInObj,
    url: "/login"
  }).then(data => {
    location.href = "/"
  })
});




$("#add-new-list-form").on("submit", function (event) {
  event.preventDefault();
  // This line grabs the input from the newList textbox
  let listName = $("#add-new-list-name").val().trim();
  const listObj = {
    list_title: listName,
  }
  $.ajax({
    method: "POST",
    data: listObj,
    url: "/movies/addlist"
  }).then(data => {
    location.href = "/"
  })
});



$(`#addtolist`).on("click", function (event) {
  event.preventDefault();
  let listId = $(this).data("id")
  $.ajax({
    method: "GET",
    url: `/movies/${listId}`
  }).then(data => {
    console.log(data);
    location.href = `/movies/${id}`
  })
});


