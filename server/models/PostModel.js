import mongoose from 'mongoose';

/**
 * Post Database Schema.
 * @global
 */
const PostSchema = mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true
  },
  authorId: {
    type: String,
    required: true
  },
  avatarColor: {
    type: Number,
    required: true
  },
  comments: {
    type: [
      {
        commenterId: String,
        text: String,
        timestamp: Number
      }
    ],
    required: true
  },
  likers: {
    type: [String],
  },
  likesCount: {
    type: Number,
    required: true
  },
  timestamp: {
    type: Number,
    required: true
  }
});
export default mongoose.model('Post', PostSchema);