import mongoose from 'mongoose';
import config from '../config/config.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import request from 'request'; 
import { title } from 'process';

/** @module  */

/** 
 * Search title string in IMDB.
 * @method
 * @param {string} title - The title of the media.
 */
export const search = async (req, res) => {

  // http://www.omdbapi.com/?s=Avengers&apikey=81c75ea2

  let title = req.query.title;

  var authOptions = {
    url: 'http://www.omdbapi.com/?s=' + title + '&apikey=81c75ea2',
    headers: { 
      "Accept": "application/json",
      "Content-Type": "application/json" 
    },
    json: true
  };

  request.get(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      res.json(body);
      saveMedia(body)
    } else { console.log(error) };
  });
};

/**
 * Save recent media into MongoDB.
 * @method
 * @param {string} title - The title of the media.
 * @param {string} imdbID - The id of the media.
 * @param {string} type - The type of the media.
 */
function saveMedia(result) {

  result.Search.forEach(m => {
    let authOptions = {
      url: 'http://localhost:3001/api/web/save_media/save',
      url1: '/api/web/save_media/save',
      headers: { 
        "Accept": "application/json",
        "Content-Type": "application/json" 
      },
      body: {
        title: m.Title,
        id : m.imdbID,
        type: m.Type
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      (error) ? console.log(error) : console.log(body);
    })
  });

  

}

