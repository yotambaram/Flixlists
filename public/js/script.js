/////// DOM manipulation

// get the inputs from user and do...

// take the data from dt and show it on browser.

<<<<<<< HEAD
/////// DOM manipulation
// get the inputs from user and do...
// take the data from dt and show it on browser.
=======
>>>>>>> development
// This function handles events where a movie button is clicked
$("#movie-search").on("click", function(event) {
    console.log("hello");
    event.preventDefault();
<<<<<<< HEAD
    // This line grabs the input from the textbox
    let movie = $("#movie-input").val().trim();
    // this is John's key.
    // TODO: encrypt here
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=47b3bbc4";
=======
    
    // This line grabs the input from the textbox
    let movie = $("#movie-input").val().trim();

    // this is John's key.
    // TODO: encrypt here

    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=47b3bbc4";

>>>>>>> development
    // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
<<<<<<< HEAD
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
=======

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

>>>>>>> development
          // Putting the entire movie above the previous movies
          $("#movies-view").prepend(movieDiv);
        });
  });
<<<<<<< HEAD
  $("#add-to-list").on("click", function(event) {
    event.preventDefault();
=======

  $("#add-to-list").on("click", function(event) {
    event.preventDefault();

>>>>>>> development
    const movieObj = {
      movieName: req.body.movie_name,
      movieID: req.body.imdbID,
      listID:listID               // this needs to be defined
    }
    $.ajax({
      method:"POST",
      data:movieObj,
      url:"/movies/addlist"
  }).then(data=>{
      location.reload();
  })
<<<<<<< HEAD
});
=======

});
>>>>>>> development
