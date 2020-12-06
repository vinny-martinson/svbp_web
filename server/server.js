//dependencies
import path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import config from './config/config.js';
import usersRouter from './routes/usersRouter.js';
import podcastsRouter from './routes/podcastsRouter.js';
import spotifyRouter from './routes/spotifyRouter.js';
import postRouter from './routes/postsRouter.js';
import imdbRouter from './routes/imdbRouter.js';
import mediaRouter from './routes/mediaRouter.js';


import saveMediaRouter from './routes/saveMediaRouter.js';
import reviewRouter from './routes/reviewRouter.js';

import cors from 'cors';
import cookieParser from 'cookie-parser';

/** connect to database */
mongoose.connect(config.db.uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
	console.log(`Successfully connected to mongoose database.`)
});

//
/** initialize app */
const app = express();

//enable request logging for development debugging
app.use(morgan('dev'));

//body parsing middleware
app.use(bodyParser.urlencoded({
	extended: true
}));

//parses json files
app.use(bodyParser.json());

//https://enable-cors.org/server_expressjs.html
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use(cors());

app.use('/api/web/users', usersRouter);
app.use('/api/web/podcasts', podcastsRouter);
app.use('/api/web/spotify', spotifyRouter);
app.use('/api/web/posts', postRouter);
app.use('/api/web/av', mediaRouter);
app.use('/api/web/imdb', imdbRouter);

app.use('/api/web/save_media', saveMediaRouter);
app.use('/api/web/reviews', reviewRouter);


// app.use(express.static('./public'))
//    .use(cors())
//    .use(cookieParser());

app.use('/', express.static('../client/build')).use(cors()).use(cookieParser());
app.use(express.static('../client/build')).use(cors()).use(cookieParser());

app.all('/*', (req, res) => {
	// res.status(201).json({message: "nothing here!"});
	res.sendFile(path.resolve("../client/build/index.html"));
});

/** App PORT */
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`App now listening on port ${PORT}`));
