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
  }
});
export default mongoose.model('Post', PostSchema);