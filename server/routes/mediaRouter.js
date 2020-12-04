import * as media from '../controllers/mediaController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const mediaRouter = express.Router();

//logon routes
mediaRouter.get('/get/:id', media.getMedia);
mediaRouter.post('/get', media.addMedia);


export default mediaRouter;
