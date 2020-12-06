import mongoose from 'mongoose';

/**
 * Saved Media Database Schema.
 * @global
 */
const SavedMediaSchema = mongoose.Schema({
	title: { type: String },
	id: { type: String },
	type: { type: String }
});

export default mongoose.model('saved_media', SavedMediaSchema);
