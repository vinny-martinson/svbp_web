import mongoose from 'mongoose';
import config from '../config/config.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import request from 'request'; 
import Review from '../models/ReviewModel.js';


function initMongoose() {
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

export const save = async (req, res) => {

  let comment = req.body.comment;
  let media_id = req.body.media_id;
  let username = req.body.username;
  let new1 = 1;

  initMongoose()
  const found = await Review.findOne({comment:comment});
  if (found) {
    console.log("This has already been saved");
    new1 = 0
  }

  if (new1) {
    let save_review
    save_review = new Review({
      media_id: media_id,
      username: username,
      comment: comment
    });

    save_review.save(function (err, save_review) {
      console.log('saved =>', save_review);
      console.log('err =>', err);

      if (!err) {
        res.status(200).json({save_review})
      } else {
        res.status(400).json({err})
      }
    });
  } else {
    res.status(400).json({err: "Review already saved."})
  }
  

};





