import Media from '../models/MediaModel.js';
import pkg from 'mongodb';



const { ObjectID } = pkg.ObjectID;

// mediaRouter.get('/shows', media.getAll);

/** @module  */
/**
 * Get all media.
 * @method
 * @param {string} text - Post text
 * @param {string} avatarColor - Avatar.
 * @param {string} comments - String comments.
 * @param {string} authorId - Author.
 * @param {string} likers - Who liked this post.
 * @param {string} likesCount - Number of likes.
 * @param {string} timestamp - Time and data.
 * @return {string} The blended color.
 */
export const getAll = async (req, res) => {
    const posts = await Post.find();
    res.status(200).json(posts);
};

// mediaRouter.post('/shows', media.add);
// mediaRouter.put('/shows', media.updateAll);
// mediaRouter.delete('/shows', media.deleteAll);

// mediaRouter.get('/shows/:id', media.getShow);
// export const getShow = async (req, res) => {
//     const posts = await Post.find();
//     res.status(200).json(posts);
// };

// mediaRouter.put('/shows/:id', media.editShow);
// mediaRouter.delete('/shows/:id', media.deleteShow);


/**
 * Creat new post.
 * @method
 * @param {string} text - Post text
 * @param {string} avatarColor - Avatar.
 * @param {string} comments - String comments.
 * @param {string} authorId - Author.
 * @param {string} likers - Who liked this post.
 * @param {string} likesCount - Number of likes.
 * @param {string} timestamp - Time and data.
 */
export const postPost = async (req, res) => {
  const newPost = new Post({
    text: req.body.text,
    avatarColor: req.body.avatarColor || 0,
    comments: [],
    authorId: req.body.authorId,
    likers: [],
    likesCount: 0,
    timestamp: new Date().getTime()
  });

  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};

/**
 * Delete post.
 * @method
 * @param {string} id - Post id
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await post.remove();
    return res.json({ success: true });
  } catch (err) {
    return res.status(404).send(err);
  }
};

/**
 * Edit post.
 * @method
 * @param {string} id - Post id
 * @param {string} action - Like, unline, add, delete.
 */
export const editPost = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (req.body.action === 'like') {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $inc: { likesCount: 1 },
          $addToSet: { likers: req.body.id }
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }
  if (req.body.action === 'unlike') {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $inc: { likesCount: -1 },
          $pull: { likers: req.body.id }
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  if (req.body.action === 'addComment') {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $push: {
            comments: {
              commenterId: req.body.commenterId,
              text: req.body.text,
              timestamp: new Date().getTime()
            }
          }
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  if (req.body.action === 'deleteComment') {
    try {
      return Post.findByIdAndUpdate(
        id,
        {
          $pull: {
            comments: {
              _id: req.body.commentId
            }
          }
        },
        { new: true },
        (err, post) => {
          if (err) return res.status(400).send(err);
          return res.send(post);
        }
      );
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  if (req.body.action === 'editComment') {
    try {
      return Post.findById(id, (err, post) => {
        const { comments } = post;
        const theComment = comments.find(comment =>
          comment._id.equals(req.body.commentId));

        if (!theComment) return res.status(404).send('Comment not found');
        theComment.text = req.body.text;

        return post.save((error) => {
          if (error) return res.status(500).send(error);
          return res.status(200).send(post);
        });
      });
    } catch (err) {
      return res.status(400).send(err);
    }
  }

  try {
    return Post.findByIdAndUpdate(
      id,
      { $set: { text: req.body.text } },
      { new: true },
      (err, post) => {
        if (err) return res.status(400).send(err);
        return res.send(post);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
