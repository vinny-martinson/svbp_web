import * as imdb from '../controllers/imdbController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const dbRouter = express.Router();


dbRouter.get('/search', imdb.search)


export default dbRouter;

