import mongoose from 'mongoose';
import User from '../models/UserModel.js';
import config from '../config/config.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

function initMongoose() {
  mongoose.connect(config.db.uri, { useNewUrlParser: true });
  let db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
}

export const svbp = async (req, res) => {
  res.status(200).json({
    we_are: "GUAPOS"
  })
}

function signJWT(payload, res) {
  jwt.sign(payload, "herbs", { expiresIn: 360000 }, (err, token) => {
    if (err) {
      console.log("JWT error signing", err);
      throw err;
    }
    res.status(200).json({
      token
    });
  }
  );
}

function buildPayload(user) {
  return {
    user_info: {
      username: user.username,
      id: user.id,
      email: user.email,
      is_premium: user.is_premium,
      is_admin: user.is_admin,
      avatarColor: user.avatarColor,
      following: user.following,
      followers: user.followers
    }
  }
}

export const signup = async (req, res) => {
  initMongoose()
  let save_user
  save_user = new User({
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    is_admin: req.body.is_admin,
    is_premium: req.body.is_premium,
    avatarColor: Math.floor(Math.random() * 18) + 1,
    following: [],
    followers: []
  });


  const salt = await bcrypt.genSalt(10);
  save_user.password = await bcrypt.hash(req.body.password, salt);
  save_user.save(function (err, save_user) {
    console.log('saved =>', save_user);
    console.log('err =>', err);
  });

  const payload = buildPayload(save_user)
  signJWT(payload, res)
};

export const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let user = await User.findOne({
    email
  });
  if (!user) {
    return res.status(400).json({
      message: "User does not exist!"
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({
      message: "Incorrect password!"
    });
  }
  const payload = buildPayload(user)
  console.log(payload);
  signJWT(payload, res)
};

export const getUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({ _id: id });
    if (user) {
      res.json({ user });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
};

export const getAll = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
}

export const addFollowing = async (req, res) => {
  const { id } = req.params;

  if (!req.body.idToFollow) {
    return res.status(404).json({ message: 'No ID found' });
  }

  try {
    await User.findByIdAndUpdate(
      id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.status(201).json(doc);
      }
    );
  } catch (e) {
    return res.status(500).json(e);
  }

  return res.status(500).json();
}


export const addFollower = async (req, res) => {
  const { id } = req.params;

  if (!req.body.followerId) {
    return res.status(404).json({ message: 'No ID found' });
  }

  try {
    await User.findByIdAndUpdate(
      id,
      { $addToSet: { followers: req.body.followerId } },
      { new: true, upsert: true },
      (err, doc) => {
        if (err) {
          return res.status(400).json(err);
        }
        return res.status(201).json(doc);
      }
    );
  } catch (e) {
    return res.status(500).json(err);
  }

  return res.status(500).json();
}

export const unfollow = async (req, res) => {
    const { id } = req.params;
  
    if (!req.body.idToUnfollow) {
      return res.status(404).json({ message: 'No ID found' });
    }
    try {
      await User.findByIdAndUpdate(
        id,
        { $pull: { following: req.body.idToUnfollow } },
        { new: true, upsert: true },
        (err, doc) => {
          if (err) {
            return res.status(400).json(err);
          }
          return res.status(200).json(doc);
        }
      );
    } catch (e) {
      return res.status(500).json(err);
    }
}

export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          bio: req.body.bio || '',
          email: req.body.email,
          name: req.body.name
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true },
      (err) => {
        if (err != null && err.name === 'MongoError' && err.code === 11000) {
          return res
            .status(500)
            .send({ message: 'This email is already in use.' });
        }
      }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    const token = jwt.sign(
      {
        avatarColor: user.avatarColor,
        bio: user.bio,
        name: user.name,
        email: user.email,
        userId: user._id
      },
      process.env.REACT_APP_JWT_KEY || require('../secrets').jwtKey,
      {
        expiresIn: '1h'
      }
    );

    return res.json({ user, token });
    
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};

