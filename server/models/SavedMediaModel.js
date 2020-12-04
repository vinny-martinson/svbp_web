import mongoose from 'mongoose';

const SavedMediaSchema = mongoose.Schema({
	title: { type: String },
	id: { type: String },
	type: { type: String }
});

export default mongoose.model('saved_media', SavedMediaSchema);
