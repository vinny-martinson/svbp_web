import * as posts from '../controllers/postsController.js';
import express from 'express'; 
const postRouter = express.Router();

/** @module */

//posts routes
postRouter.get('/', posts.getPost);
postRouter.post('/', posts.postPost);
postRouter.delete('/:id', posts.deletePost);
postRouter.patch('/:id', posts.editPost);

/** Routing / | /:id */
export default postRouter;
