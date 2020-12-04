import * as spotify from '../controllers/spotifyController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const usersRouter = express.Router();

/** @module */

//logon routes
// usersRouter.post('/signup', users.signup);
usersRouter.get('/callback', spotify.callback);
usersRouter.get('/auth', spotify.auth);

usersRouter.get('/podcasts', spotify.podcasts)
usersRouter.get('/search', spotify.search)
usersRouter.get('/current_playing', spotify.current_playing)
usersRouter.get('/playlists', spotify.playlists)
usersRouter.get('/recommendations', spotify.recommendations)
usersRouter.get('/genres', spotify.genres)

/** Routing /callback | /auth | /podcasts | /search | /playlists | /genres | /recommendations | /current_playing */
export default usersRouter;
