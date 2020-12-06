import mongoose from 'mongoose';

/**
 * Review Database Schema.
 * @global
 */
const ReviewSchema = mongoose.Schema({
	username: { type: String },
	media_id: { type: String },
	comment: { type: String }
});

export default mongoose.model('review', ReviewSchema);
