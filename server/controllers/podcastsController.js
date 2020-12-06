import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import config from '../config/config.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import unirest from "unirest"

/** @module  */

function initMongoose() {
  mongoose.connect(config.db.uri, {useNewUrlParser: true});
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

/**
 * Search into ListenAPI's database.
 * @method
 * @param {string} name - Podcast name.
 */
export const search = async (req, res) => {
  const search = req.body.name
  console.log(search);
  
  const response = await unirest.get('https://listen-api.listennotes.com/api/v2/search?q="${search}"&sort_by_date=0&type=episode&offset=0&len_min=10&len_max=30&genre_ids=68%2C82&published_before=1580172454000&published_after=0&only_in=title%2Cdescription&language=English&safe_mode=0')
  .header('X-ListenAPI-Key', '572f37c4f8114dea896217525b8265c1')
  response.toJSON();

  res.status(200).json(response.toJSON())
}


