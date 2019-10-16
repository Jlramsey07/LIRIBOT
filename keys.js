var Twitter = require('twitter');

var twitterKeys = {
    consumer_key: 'MzDadiSllWfoi9f7HJbtL8ZVr',
    consumer_secret: 'eUUVc7dd6pwV8CWG2EXMT1dZeQnWy8WRtZWHljqHfvj0Xu19SY',
    access_token_key: '916058092743229440-IzWPP2tIy1loN9HGGSI1YZ5CM3SczDG',
    access_token_secret: 'DOevFTH1HQVnKXMEUH1BNQJAqc1hkHunjiUxlTSHCRLC0'
};


// Spotify web API
var SpotifyApi = require('node-spotify-api');

var spotifyKeys = {
  id: 'e1587d5d50a94f8c87389059ba8399f4',
  secret: '8d11caffa14b442e9f65fb6562b73f5b'

};


// OMDB API
var omdbapiKey = {
	apiKey:"40e9cece"
};



// Export keys
module.exports = {
  // Twitter keys
  twitterKeys: twitterKeys,
  // Spotify keys:
  spotifyKeys: spotifyKeys,
  // OMDB key:
  omdbapiKey: omdbapiKey

};