import mongoose from 'mongoose';
import config from '../config/config.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import querystring from 'querystring';
import cookieParser from 'cookie-parser';
import request from 'request'; 
import SaveMedia from '../models/SavedMediaModel.js';


function initMongoose() {
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

export const save = async (req, res) => {

  let title = req.body.title;
  let type = req.body.type;
  let id = req.body.id;
  let new1 = 1;

  initMongoose()
  const found = await SaveMedia.findOne({title:title});
  if (found) {
    console.log("This has already been saved");
    new1 = 0
  }

  if (new1) {
    let save_media
    save_media = new SaveMedia({
      title: title,
      type: type,
      id: id
    });

    save_media.save(function (err, save_media) {
      console.log('saved =>', save_media);
      console.log('err =>', err);

      if (!err) {
        res.status(200).json({save_media})
      } else {
        res.status(400).json({err})
      }
    });
  } else {
    res.status(400).json({err: "Media already saved."})
  }
  

};





