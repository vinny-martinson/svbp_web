import mongoose from 'mongoose';

const ReviewSchema = mongoose.Schema({
	username: { type: String },
	media_id: { type: String },
	comment: { type: String }
});

export default mongoose.model('review', ReviewSchema);
