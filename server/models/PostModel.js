import mongoose from 'mongoose';

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
  type: { 
    type: String,
  },
  reviewId: {
    type: String,
  },
  reviewTitle: {
    type: String
  },
  rating: {
    type: Number
  },
  date: {
    type: Date
  },
  timestamp: {
    type: Number,
    required: true
  }
});
export default mongoose.model('Post', PostSchema);