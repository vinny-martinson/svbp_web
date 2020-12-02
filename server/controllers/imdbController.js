import mongoose from 'mongoose';
import config from '../config/config.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import request from 'request'; 


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
      res.json({body});
    } else { console.log(error) };
  });
};





