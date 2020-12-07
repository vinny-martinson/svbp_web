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
export const addMedia = async (req, res) => {
  console.log(req.query);
  try {
    const obj = await Media.findOne({ imdbID: req.body.imdbID });
    if (obj) {
      //console.log(obj);
      res.json({ obj });
    } else {
      console.log("post")
      const newMedium = new Media({
        imdbID: req.body.imdbID,
        title: req.body.title,
        reviews: [],
        likers: [],
        likesCount: 0,
        type: req.body.type,
        poster: req.body.poster,
        genre: req.body.genre,
        pages: req.body.pages,
        publishedDate: req.body.publishedDate,
        description: req.body.description,
        author: req.body.author
      });
    
      try {
        const post = await newMedium.save();
        return res.status(201).json(post);
      } catch (err) {
        console.log(err);
        return res.status(400).send(err);
      }
    }
  } catch (err) {
    res.status(500).json({ err });
    console.log(err)
  }
};


/**
 * Delete post.
 * @method
 * @param {string} id - Post id
 */
export const getMedia = async (req, res) => {
  try {
    const medium = await Media.findOne({ imdbID: req.params.id });
    if (medium) {
      res.json({ medium });
    } else {
      res.status(404).json({ message: 'medium not found' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ err });
  }
};

/**
 * Edit post.
 * @method
 * @param {string} id - Post id
 * @param {string} action - Like, unline, add, delete.
 */
export const editMedia = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  console.log(req.body);

  if (req.body.action === 'like') {
    try {
      return Media.findOneAndUpdate(
        {imdbID: id},
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
      return Media.findOneAndUpdate(
        {imdbID: id},
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

  try {
    return Media.Media.findOneAndUpdate(
      {imdbID: id},
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
