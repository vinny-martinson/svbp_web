import * as saveMedia from '../controllers/saveMediaController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const saveMediaRouter = express.Router();


saveMediaRouter.post('/comment', saveMedia.save)

export default saveMediaRouter;
