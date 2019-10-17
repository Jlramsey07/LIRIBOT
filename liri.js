require("dotenv").config();
var keys = require("./keys.js");
// Terminal Colors
const chalk = require('chalk');
// Calls to BandsInTown and OMDB
var request = require('request');
// Date Formatting
var moment = require('moment');
// Spotify
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var fs = require('fs');

let command = process.argv[2];
let media_array = process.argv.slice(3);
let media = media_array.join(" ");

function doThings(command, media) {
    switch (command) {

        case 'spotify-this-song':
            spotifyThis(media); break;
        case 'movie-this':
            movieThis(media); break;
        case 'concert-this':
            concertThis(media); break;
        case 'do-what-it-says':
            doWhatItSays(); break;
        default:
            console.log("Invalid command. Please type any of the following commands:");
            console.log(chalk.magenta("concert-this,"), chalk.cyan("spotify-this-song,"), chalk.magenta("movie-this,"), chalk.cyan("do-what-it-says"));
    }
}

function spotifyThis(media) {
    // Default value
    if (media == "") {
        media = "All Star"
    }

    // Search spotify API
    spotify
        .search({ type: 'track', query: media, limit: 1 })
        .then(function (response) {
            var song = response.tracks.items[0];
            if (song != undefined) {
                console.log();
                console.log(chalk.green("***********Song Name**********"));
                console.log(song.name);

                console.log(chalk.green("******Artist or Artists:******"));
                for (i = 0; i < song.artists.length; i++) {
                    console.log(song.artists[i].name);
                }

                console.log(chalk.green("*********Preview Link*********"));
                console.log(song.preview_url);

                console.log(chalk.green("************Album*************"));
                console.log(song.album.name);
                console.log();
            } else {
                console.log("Can't find this song!")
            }
        })
        .catch(function (err) {
            console.log(err);
        });
}

function concertThis(media) {
    // Default value
    if (media == "") {
        media = "Brockhampton"
    }
    request("https://rest.bandsintown.com/artists/" + media + "/events?app_id=codingbootcamp", function (error, response, data) {
        try {
            var response = JSON.parse(data)
            if (response.length != 0) {
                console.log(chalk.green(`Upcoming concerts for ${media} include: `))
                response.forEach(function (element) {
                    console.log(chalk.cyan("Venue name: " + element.venue.name));
                    if (element.venue.country == "United States") {
                        console.log("City: " + element.venue.city + ", " + element.venue.region);
                    } else {
                        console.log("City: " + element.venue.city + ", " + element.venue.country);
                    }
                    console.log("Date: " + moment(element.datetime).format('MM/DD/YYYY'));
                    console.log();
                })
            } else {
                console.log(chalk.red("No concerts found."));
            }
        }
        catch (error) {
            console.log(chalk.red("No concerts found."));
        }
    });
}

function movieThis(media) {
    // Default value
    if (media == "") {
        media = "Mr. Nobody"
    }
    request("http://www.omdbapi.com/?apikey=trilogy&t=" + media, function (error, response, data) {
        try {
            var response = JSON.parse(data)
            if (response.Title != undefined) {
                console.log(chalk.green("*************Movie Name**************"));
                console.log(response.Title);
                console.log(chalk.green("*****************Year****************"));
                console.log(response.Year);
                console.log(chalk.green("***" + response.Ratings[0].Source + " Rating****"));
                console.log(response.Ratings[0].Value);
                // This is in case there's only ratings from one source
                // at time of publication, ex: "Bad Times at the El Royale"
                try {
                    console.log(chalk.green("********" + response.Ratings[1].Source + " Rating*******"));
                    console.log(response.Ratings[1].Value);
                } catch { }
                console.log(chalk.green("****************Country**************"));
                console.log(response.Country);
                console.log(chalk.green("***************Language**************"));
                console.log(response.Language);
                console.log(chalk.green("*****************Plot****************"));
                console.log(response.Plot);
                console.log(chalk.green("****************Actors***************"));
                console.log(response.Actors);
                console.log();
            } else {
                console.log(chalk.red("This movie not found."));
            }
        }
        catch (error) {
            console.log(chalk.red("This movie not found."));
        }
    });
}

function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (err, response) {
        if (err) {
            console.log(err);
        }
        let params = (response.split(','));
        doThings(params[0], params[1]);
    })
}

doThings(command, media);