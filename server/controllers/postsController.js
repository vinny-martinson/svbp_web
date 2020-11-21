import Post from '../models/PostModel.js';
import ObjectID from 'mongodb';

export const getPost = async (req, res) => {
  Post.find().then(posts => res.json(posts));
  };

  export const postPost = async (req, res) => {
    const newPost = new Post({
      text: req.body.text,
      author: 'no author assigned'
    });

    return newPost
    .save()
    .then(post => res.json(post))
    .catch(e => res.status(400).send(e));
 };

 export const deletePost = async (req, res) => {
  Post.findById(req.params.id)
  .then(post =>
    post.remove().then(() =>
      res.json({
        success: true
      })))
      .catch(e => res.status(404).send(e));
    };

export const editPost = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  try {
    return Post.findByIdAndUpdate(
      id,
      { $set: { text: req.body.text, author: req.body.author } },
      { new: true },
      (err, post) => {
        if (err) return handleError(err);
        return res.send(post);
      }
    );
  } catch (e) {
    return res.status(400).send(e);
  }
};
