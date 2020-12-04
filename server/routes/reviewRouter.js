import * as review from '../controllers/reviewController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const reviewRouter = express.Router();


reviewRouter.post('/save', review.save)

export default reviewRouter;
