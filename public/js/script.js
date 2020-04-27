require("dotenv").config();


$("#movie_search").on("submit", function (event) {
  event.preventDefault();  
  let movie = $("#movie_search_title").val().trim();
  if (!movie) {
    $("#movie_search_title").attr("placeholder", "please enter a movie")
    return
  }
  

  var queryURL = `https://www.omdbapi.com/?t=${movie}` + process.env.IMDBAPIKEY;
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    if (response.Error === "Movie not found!") {
      $("#movie_search_title").attr("placeholder", "please enter a valid movie title")
      return
    }
    
    $("#movies-view").empty();
    $("#movies-poster").empty();
    $("#apiresults").show();

    $("#results-title").html(`${response.Title} <div class="divider"></div>`)

    let searchResults = $("<ul>").attr({
      class: "collection",
      id: "search-results"
    })
    let year = $("<li>")
    let director = $("<li>")
    let actors = $("<li>")
    let plot = $("<li>")
    let poster = $("<img>").attr("src", response.Poster)

    year.text("Released: " + response.Released);
    director.text("Director: " + response.Director);
    actors.text("Actors: " + response.Actors);
    plot.text("Plot: " + response.Plot);
    searchResults.append(year, director, actors, plot);
    $("#movies-view").append(searchResults);
    $("#movies-poster").append(poster);
    $("li").attr("class", "collection-item")

  


    $(".add-to-list").on("click", function (event) {
      event.preventDefault();
      let listId = $(this).data("id")
      let movieObj = {
        movieName: response.Title,
        movieID: response.imdbID
      }
      $.ajax({
        method: "POST",
        data: movieObj,
        url: `/movies/${listId}`
      }).then(data => {
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
    location.href = `/movies/${id}`
  })
});


$(".delete-movie").on("click", function (event) {
  event.preventDefault();
  var id = $(this).data("id");
  const idToDelete = $(this).data("movie")
  $.ajax({
    method: "DELETE",
    url: `/movies/${idToDelete}`
  }).then(data => {
    location.reload();
  })
})





$(".display-change").on("click", function (event) {

  event.preventDefault();
  const id = $(this).data("id");
  const listToShow = $(this).data("display")

  if (listToShow) {
    var newDisplay = {
      display: false
    }
  }
  else {
    var newDisplay = {
      display: true
    }
  }

  $.ajax({
    method: "PUT",
    data: newDisplay,
    url: `/movies/disp/${id}`
  }).then(data => {
    location.reload();
  })
})


$(".update-list-name").on("click", function (event) {
  event.preventDefault();
  let list = $(this).data("list")
  const editInput = $(`#edit-list-input-${list}`)
  editInput.toggleClass('edit-list-new')
})


$(".edit-list-new").on("submit", function (event) {
  event.preventDefault();
  let id = $(this).data("number")
  const newLisName = $(`#newListName-${id}`)
  listTitle = newLisName.val()

  const listObj = {
    list_title: listTitle
  }
  $.ajax({
    method: "PUT",
    data: listObj,
    url: `/movies/editlistname/${id}`
  }).then(data => {
    location.reload();
  })
})