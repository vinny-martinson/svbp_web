const PostSchema = new Schema({
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
module.exports = mongoose.model('Post', PostSchema);