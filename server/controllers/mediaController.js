import Media from '../models/MediaModel.js';
import pkg from 'mongodb';

const { ObjectID } = pkg.ObjectID;

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
        type: req.body.type
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

export const getMedia = async (req, res) => {
  const { id } = req.params;

  try {
    const medium = await Media.findOne({ imdbID: id });
    if (medium) {
      res.json({ medium });
    } else {
      res.status(404).json({ message: 'medium not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};
export const editMedia = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if (req.body.action === 'like') {
    try {
      return Media.findByIdAndUpdate(
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
      return Media.findByIdAndUpdate(
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

  try {
    return Media.findByIdAndUpdate(
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
