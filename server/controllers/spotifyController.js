import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import config from '../config/config.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import request from 'request'; 

/** @module  */

function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

/**
 * Generate random string for access token.
 * @method
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';
let authKey = 'spotify_key_code'

/**
 * Generate access token from Spotify.
 * @method
 * @param {string} client_id - Spotify's Developer Client ID.
 * @param {string} scope - Permissions given by the user.
 * @param {string} state - State of local authentication.
 * @param {string} redirect_uri - Redirect URL after authentication.
 */
export const auth = async (req, res) => {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'playlist-read-collaborative playlist-read-private user-read-private user-read-email user-library-read user-read-currently-playing user-read-playback-state';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: config.spotify.client_id,
      scope: scope,
      redirect_uri: config.spotify.redirect_uri,
      state: state
    }));
};

/**
 * Return after authentication.
 * @method
 * @param {string} code - Spotify's Developer Client ID.
 * @param {string} state - State of local authentication.
 * @param {string} storedState - State of local authentication.
 */
export const callback = async (req, res) => {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  res.cookie(authKey, code);

  // if (state === null || state !== storedState) {
  //   res.redirect('/#' +
  //     querystring.stringify({
  //       error: 'state_mismatch'
  //     }));
  // } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: config.spotify.redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(config.spotify.client_id + ':' + config.spotify.client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        console.log('======>' + access_token);
        

        var options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });

        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  // }
  // res.json({code})
};

/**
 * Refresh auth token.
 * @method
 * @param {string} refresh_token - Spotify's Access Token.
 */
export const refresh_token = async (req, res) => {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(config.spotify.client_id + ':' + config.spotify.client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
};

/**
 * Return list of podcasts saved by the user.
 * @method
 * @param {string} code - Spotify's Access Token.
 */
export const podcasts = async (req, res) => {

  // let authCode = req.cookies[authKey] ? req.cookies[authKey] : req.query.code;
  let authCode = req.query.code;

  var authOptions = {
    url: 'https://api.spotify.com/v1/me/shows',
    headers: { 
      "Authorization": "Bearer " + authCode,
      "Accept": "application/json",
      "Content-Type": "application/json" 
    },
    json: true
  };

  request.get(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json({body});
    } else { console.log(error) };
  });
};

/**
 * Search into Spotify's database.
 * @method
 * @param {string} code - Spotify's Access Token.
 * @param {string} media - Media title.
 * @param {string} type - Media type.
 */
export const search = async (req, res) => {


  // let authCode = req.cookies[authKey] ? req.cookies[authKey] : req.query.code;
  let authCode = req.query.code;
  let media = req.query.media;
  let type = req.query.type; // types = album , artist, playlist, track, show and episode.

  var authOptions = {
    url: 'https://api.spotify.com/v1/search?q=' + media + '&type=' + type,
    headers: { 
      "Authorization": "Bearer " + authCode,
      "Accept": "application/json",
      "Content-Type": "application/json" 
    },
    json: true
  };

  request.get(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json({body});
    } else { console.log(error) };
  });
};

/**
 * Returns metadata of what is currently playing in the User's devices
 * @method
 * @param {string} code - Spotify's Access Token.
 */
export const current_playing = async (req, res) => {

  // let authCode = req.cookies[authKey] ? req.cookies[authKey] : req.query.code;
  let authCode = req.query.code;

  var authOptions = {
    url: 'https://api.spotify.com/v1/me/player',
    headers: { 
      "Authorization": "Bearer " + authCode,
      "Accept": "application/json",
      "Content-Type": "application/json" 
    },
    json: true
  };

  request.get(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json({body});
    } else { console.log(error) };
  });
};

/**
 * Return list of playlists saved by the user.
 * @method
 * @param {string} code - Spotify's Access Token.
 */
export const playlists = async (req, res) => {

  // let authCode = req.cookies[authKey] ? req.cookies[authKey] : req.query.code;
  let authCode = req.query.code;

  var authOptions = {
    url: 'https://api.spotify.com/v1/me/playlists',
    headers: { 
      "Authorization": "Bearer " + authCode,
      "Accept": "application/json",
      "Content-Type": "application/json" 
    },
    json: true
  };

  request.get(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json({body});
    } else { console.log(error) };
  });
};

/**
 * Return list of genres of Spotify.
 * @method
 * @param {string} code - Spotify's Access Token.
 */
export const genres = async (req, res) => {

  // let authCode = req.cookies[authKey] ? req.cookies[authKey] : req.query.code;
  let authCode = req.query.code;

  var authOptions = {
    url: 'https://api.spotify.com/v1/recommendations/available-genre-seeds',
    headers: { 
      "Authorization": "Bearer " + authCode,
      "Accept": "application/json",
      "Content-Type": "application/json" 
    },
    json: true
  };

  request.get(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json({body});
    } else { console.log(error) };
  });
};

/**
 * Return recommendations by Spotify.
 * @method
 * @param {string} code - Spotify's Access Token.
 * @param {string} seed_genres - Genres (alt-rock, jazz, etc).
 * @param {string} seed_artists - Artist ID.
 * @param {string} seed_tracks - Track ID.
 */
export const recommendations = async (req, res) => {

  // let authCode = req.cookies[authKey] ? req.cookies[authKey] : req.query.code;
  let authCode = req.query.code;

  let seed_artists = req.query.seed_artists
  let seed_genres = req.query.seed_genres
  let seed_tracks = req.query.seed_tracks

  var authOptions = {
    url: 'https://api.spotify.com/v1/recommendations?seed_artists=' + seed_artists + '&seed_genres=' + seed_genres + '&seed_tracks=' + seed_tracks,
    headers: { 
      "Authorization": "Bearer " + authCode,
      "Accept": "application/json",
      "Content-Type": "application/json" 
    },
    json: true
  };

  request.get(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json({body});
    } else { console.log(error) };
  });
};



