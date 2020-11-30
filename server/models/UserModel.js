import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	bio: { type: String },
	avatarColor: { type: Number, required: true },
	is_premium: { type: Boolean, required: true, default: false },
	followers: { type: [String] },
	following: { type: [String] },
	createdAt: { type: Date, default: Date.now() }
});

export default mongoose.model('user', UserSchema);
