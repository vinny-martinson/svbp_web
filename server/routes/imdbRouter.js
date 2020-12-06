import * as imdb from '../controllers/imdbController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const dbRouter = express.Router();


/** @module */


dbRouter.get('/search', imdb.search)

/** /search - GET */
export default dbRouter;

