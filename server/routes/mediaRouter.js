import * as media from '../controllers/mediaController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const mediaRouter = express.Router();

//logon routes
mediaRouter.get('/shows', media.getAll);
mediaRouter.post('/shows', media.add);
mediaRouter.put('/shows', media.updateAll);
mediaRouter.delete('/shows', media.deleteAll);

mediaRouter.get('/shows/:id', media.getShow);
mediaRouter.put('/shows/:id', media.editShow);
mediaRouter.delete('/shows/:id', media.deleteShow);

export default mediaRouter;
