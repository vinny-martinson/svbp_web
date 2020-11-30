import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
  text: {
    type: String,
    trim: true,
    required: true
  },
  author: {
    type: String,
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
  timestamp: {
    type: Number,
    required: true
  }
});
export default mongoose.model('Post', PostSchema);