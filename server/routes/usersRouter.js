import * as users from '../controllers/usersController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const usersRouter = express.Router();

//logon routes
usersRouter.post('/signup', users.signup);
usersRouter.post('/signin', users.signin);
usersRouter.get('/svbp', users.svbp);


export default usersRouter;
