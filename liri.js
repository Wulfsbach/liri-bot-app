require("dotenv").config();
var Twitter=require('twitter');
var Spotify= require('node-spotify-api');
var request= require("request");
var fs= require("fs");
var keys= require('./key.js');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var AppNode= process.argv[2];
var App2= process.argv[3];



function Overlord(Appnode,App2){
  switch(Appnode){
    case "my-tweets":
    TweetPull();
    break;
    
    case "spotify-this-song":
    var muse= App2;
    if(muse){
    Spotis(muse);
    }else{
      Spotis("The Sign, Ace of Base");
    }
    break;

    case "movie-this":
    var film=App2;
    if (film){
      Movies(film)}else{
        Movies("Mr. Nobody")
      }
    
    
    break;

    case "Do-what-it-says":
    DoWhatISay();
    break;
  }
}


function TweetPull(){

var params = {screen_name: 'Wulfsbach', count:20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
    console.log("Woops");
  }

  if (AppNode === "my-tweets"){
  for(var i=0; i <tweets.length; i++){
    
    console.log(tweets[i].text);
    console.log(tweets[i].created_at);
    console.log("---------------------------")
  }
  
}



});
};


function Spotis (w){
 
  spotify.search({ type: 'track', query: w, limit:1 }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    console.log("------------------------------------------------------------------------------------------------------------");
		console.log("Artist: " + data.tracks.items[0].artists[0].name); 
		console.log("Song: " + data.tracks.items[0].name); 
		console.log("Album: " + data.tracks.items[0].album.name); 
		console.log("Song Preview: " + data.tracks.items[0].preview_url); 
console.log("----------------------------------------------------------------------------------------------------------------");
   

  });
};



function Movies (film){

  
  var queryUrl = "http://www.omdbapi.com/?t=" + film + "&y=&plot=short&apikey=c65ad0aa";
  
  request(queryUrl, function (err,response,data){
   if (err){
     return console.log("Error occurred: " + err)
   }
   
   var FilmDat= JSON.parse(data);
   console.log("Title: " + FilmDat.Title);
   console.log ("-------------------------------------------------------------------------------------------------------------");
   console.log("Year: " + FilmDat.Year);
   console.log("--------------------------------------------------------------------------------------------------------------");
   console.log("IMDB Rating: " + FilmDat.imdbRating);
   console.log ("-------------------------------------------------------------------------------------------------------------");
   console.log("Rotten Tomatoes Rating: " + FilmDat.Ratings[1].Value);
   console.log("--------------------------------------------------------------------------------------------------------------");
   console.log("Country: " + FilmDat.Country);
   console.log ("-------------------------------------------------------------------------------------------------------------");
   console.log("Language: " + FilmDat.Language);
   console.log ("-------------------------------------------------------------------------------------------------------------");
   console.log("Plot: " + FilmDat.Plot);
   console.log("--------------------------------------------------------------------------------------------------------------");
   console.log("Actors: " + FilmDat.Actors);
   console.log("--------------------------------------------------------------------------------------------------------------");

   
});
};


function DoWhatISay(){
  fs.readFile("random.txt","utf8", function(err,data){
    if (err){
      console.log("Woops it seems there was a mistake :" + err)
    };
    var dataArr = data.split(",")
    var AppNode = dataArr[0];
    var App2= dataArr[1];
    Overlord(AppNode,App2);
  })
};
 Overlord(AppNode,App2);