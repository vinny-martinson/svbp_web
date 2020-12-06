import * as podcasts from '../controllers/podcastsController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const podcastsRouter = express.Router();

/** @module */

//logon routes
podcastsRouter.post('/search', podcasts.search);

/** Routing /search  */
export default podcastsRouter;
