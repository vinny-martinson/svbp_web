import * as saveMedia from '../controllers/saveMediaController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const saveMediaRouter = express.Router();

/** @module */

saveMediaRouter.post('/save', saveMedia.save)

/** Routing /save POST */
export default saveMediaRouter;
