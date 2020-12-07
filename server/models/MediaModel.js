import mongoose from 'mongoose';

/**
 * Media Database Schema.
 * @global
 */
const MediaSchema = new mongoose.Schema({
    imdbID: String,
    title: String,
    likers: [String],
    likesCount: Number,
    reviews: [{
      type: mongoose.Schema.Types.ObjectId, ref: 'Post'
    }],
    type: String,
    poster: String,
    genre: String,
    pages: Number,
    publishedDate: String,
    description: String,
    author: String
  });

  export default mongoose.model('Media', MediaSchema);