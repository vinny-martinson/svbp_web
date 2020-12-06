import * as users from '../controllers/usersController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const usersRouter = express.Router();

/** @module */

//logon routes
usersRouter.post('/signup', users.signup);
usersRouter.post('/signin', users.signin);
usersRouter.get('/svbp', users.svbp);
usersRouter.get('/profile/:id', users.getUser);
usersRouter.patch('/profile/:id', users.updateUser);
usersRouter.get('/', users.getAll);
usersRouter.patch('/following/:id', users.addFollowing);
usersRouter.patch('/followers/:id', users.addFollower);
usersRouter.patch('/unfollowing/:id', users.unfollow);
usersRouter.patch('/unfollowers/:id', users.unfollowers);
export default usersRouter;
