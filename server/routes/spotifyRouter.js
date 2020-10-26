import * as spotify from '../controllers/spotifyController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const usersRouter = express.Router();

//logon routes
// usersRouter.post('/signup', users.signup);
usersRouter.get('/callback', spotify.callback);
usersRouter.get('/auth', spotify.auth);
usersRouter.get('/podcasts', spotify.podcasts)


export default usersRouter;
