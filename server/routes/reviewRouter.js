import * as review from '../controllers/reviewController.js';
import express from 'express'; 
import validateToken from '../utils/auth.js';
const reviewRouter = express.Router();

/** @module */

reviewRouter.post('/save', review.save)

/** Routing /save */
export default reviewRouter;
