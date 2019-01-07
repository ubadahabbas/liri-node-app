require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var axios = require('axios')
var fs = require("fs");
var moment = require('moment');
moment().format();

var spotify = new Spotify(keys.spotify)


var inputArray = process.argv;
var opr = process.argv[2];
var input = '';

for (var i = 3; i < inputArray.length; i++) {

    if (i > 3 && i < inputArray.length) {
        input = input + '+' + inputArray[i];
    } else {
        input += inputArray[i];
    }
}

var omdbURL = "http://www.omdbapi.com/?t=" + input + "&=tt3896198&apikey=a3c78847";
var bitURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";

switch (opr) {

    case 'concert-this':
        axios.get(bitURL).then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                console.log(' ')
                console.log(response.data[i].venue.name)
                console.log(response.data[i].venue.city)
                console.log(moment(response.data[i].datetime).format("MM/DD/YYYY"))
                console.log(' - - - - - ')
            }
        })
        break;

    case 'spotify-this-song':
    if (input == '') {
        input = 'The Sign';
    }
    function spotifySearch(input){
    spotify.search({ type: 'track', query: input }).then(function(response) {
         for (var i=0; i<response.tracks.items.length; i++){
            console.log(' ')
            console.log(response.tracks.items[i].album.artists[0].name);
            console.log(response.tracks.items[i].name);
            console.log(response.tracks.items[i].album.artists[0].external_urls.spotify);
            console.log(response.tracks.items[i].album.name);  
            console.log(' - - - - - ')
          } 
  })
  .catch(function(err) {
    console.log(err);
  });
}
spotifySearch(input);
        break;

    case 'movie-this':
        if (input == '') {
            input = 'Mr. Nobody'
        }
        axios.get(omdbURL).then(function (response) {
            
            console.log(' ')
            console.log("Title: " + response.data.Title)
            console.log("Year: " + response.data.Year)
            console.log("imdbRating: " + response.data.imdbRating)
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
            console.log("Country: " + response.data.Country)
            console.log("Language: " + response.data.Language)
            console.log("Plot: " + response.data.Plot)
            console.log("Plot: " + response.data.Actors)
            console.log(' - - - - - ')
        })
        break;

    case 'do-what-it-says':
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error) {
            return console.log(error);
          }
        var dataArr = data.split(",");
        var songTitle = dataArr[1].split(' ')

        for (var i = 0; i < songTitle.length; i++) {

            if (i > 0 && i < songTitle.length) {
                input = input + '+' + songTitle[i];
            } else {
                input += songTitle[i];
            }
        }
        spotifySearch(input)
    });
        break;
}





