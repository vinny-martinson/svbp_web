import Post from '../models/PostModel.js';
import pkg from 'mongodb';

const { ObjectID } = pkg.ObjectID;

export const getPost = async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
};

export const postPost = async (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    author: req.body.author || 'Anonymous',
    avatarColor: req.body.avatarColor || 0,
    authorId: req.body.authorId,
    timestamp: new Date().getTime()
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const deletePost = async (req, res) => {
  try {
    console.log(req.params.id);
    const post = await Post.findById(req.params.id);
    await post.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
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
