var http = require("https");

let movie = "dune";
let movies = [];

var options = {
	"method": "GET",
	"hostname": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
	"port": null,
	"path": "/search/" + movie,
	"headers": {
		"x-rapidapi-host": "imdb-internet-movie-database-unofficial.p.rapidapi.com",
		"x-rapidapi-key": "3e85271df6mshffb2557ab433d94p19f131jsne75ebcb10a2a"
	}
};

var req = http.request(options, function (res) {
	var chunks = [];

	res.on("data", function (chunk) {
		chunks.push(chunk);
	});

	res.on("end", function () {
		var body = Buffer.concat(chunks);
		console.log(body.toString());
	});
});

req.end();

