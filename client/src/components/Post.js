import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
<<<<<<< HEAD
import classnames from 'classnames';
=======
>>>>>>> master
import * as moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
<<<<<<< HEAD
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Modal from '@material-ui/core/Modal';
import UpdatePost from './UpdatePost';
=======
import LikeIcon from '@material-ui/icons/ThumbUp';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Collapse from '@material-ui/core/Collapse';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Rating from '@material-ui/lab/Rating';

import Comments from './Comments';
import classnames from 'classnames';
import EditModal from './EditModal';
>>>>>>> master
import UserAvatar from './UserAvatar';

const options = ['Edit', 'Delete'];
const ITEM_HEIGHT = 48;

const styles = theme => ({
  card: {
    margin: '20px auto',
    width: '95%'
  },
  actions: {
    display: 'flex'
  },
<<<<<<< HEAD
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: '50%',
    left: '50%',
    outline: 'none',
    transform: 'translate(-50%, -50%)'
  },
  spacing: {
    marginBottom: '10px'
=======
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: 'rotate(180deg)'
>>>>>>> master
  }
});

class Post extends Component {
  state = {
    anchorEl: null,
    avatarColor: 18,
    expanded: false,
    modalOpen: false,
    name: ''
  };

  componentDidMount = () => {
    const { authorId, getUser } = this.props;
    getUser(authorId).then((res) => {
      this.setState({
        avatarColor: res.payload.user.avatarColor,
        name: res.payload.user.username
      });
    });
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };
  
  render() {
    const {
<<<<<<< HEAD
      text,
      _id,
      author,
      authorId,
      avatarColor,
      timestamp,
      classes,
      deletePost,
      updatePost
    } = this.props;
    const { anchorEl, modalOpen } = this.state;
=======
      _id,
      reviewId,
      reviewTitle,
      type,
      date,
      rating,
      author,
      addComment,
      deleteComment,
      editComment,
      authorId,
      classes,
      getUser,
      deletePost,
      editPost,
      comments,
      likers,
      likesCount,
      signedInUserId,
      text,
      timestamp,
      updatePostLikes
    } = this.props;
    const { anchorEl, avatarColor, expanded, modalOpen, name } = this.state;
>>>>>>> master
    const open = Boolean(anchorEl);
    const relativeTime = moment(timestamp).fromNow();

    console.log("author " + author);
    return (
      <Card className={classes.card}>
        <CardHeader
<<<<<<< HEAD
          avatar={<UserAvatar author={author} authorId={authorId} avatarColor={avatarColor}/>}
          action={
            <div>
              <IconButton
                aria-label="More"
                aria-owns={open ? 'long-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="long-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={this.handleClose}
                PaperProps={{
                  style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: 200
                  }
                }}
              >
                {options.map(option => (
                  <MenuItem
                    key={option}
                    onClick={() =>
                      this.handleClose() ||
                      (option === 'Delete' ? deletePost(_id) : null) ||
                      (option === 'Edit' ? this.handleModalOpen() : null)
                    }
                  >
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          }
          title={author}
=======
          avatar={<UserAvatar author={name} authorId={authorId} avatarColor={avatarColor} getUser={getUser} />}
          action={
            authorId !== signedInUserId ? null : (
              <div>
                <IconButton
                  aria-label="More"
                  aria-owns={open ? 'long-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: 200
                    }
                  }}
                >
                  {options.map(option => (
                    <MenuItem
                      key={option}
                      onClick={() =>
                        this.handleClose() ||
                        (option === 'Delete' ? deletePost(_id) : null) ||
                        (option === 'Edit' ? this.handleModalOpen() : null)
                      }
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )
          }
          title={((type === 'movie' || type === 'series') ?  (<Link className={classes.link} to={`/profile/${authorId}`}>
          {name} reviewed {reviewTitle} </Link>): (<Link className={classes.link} to={`/profile/${authorId}`}>
      {name} </Link>))}
>>>>>>> master
          subheader={relativeTime}
        />
        <CardContent>
        {rating ? (<Rating name="half-rating-read" defaultValue={rating} precision={0.5} size="small" readOnly />
        ) : (null)}
        <Typography>{text}</Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
<<<<<<< HEAD
          <IconButton aria-label="Like">
            <FavoriteIcon />
            </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
        </CardActions>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={modalOpen}
          onClose={this.handleModalClose}
        >
          <div className={classes.paper}>
            <Typography
              variant="title"
              id="modal-title"
              className={classes.spacing}
            >
              Edit this post
            </Typography>
            <Typography variant="subheading" id="modal-description">
              <UpdatePost
                id={_id}
                text={text}
                author={author}
                updatePost={updatePost}
                handleModalClose={this.handleModalClose}
              />
            </Typography>
          </div>
        </Modal>
=======
          <div>
            <IconButton
              onClick={() =>
                (likers.includes(signedInUserId)
                  ? updatePostLikes('unlike', _id, signedInUserId)
                  : updatePostLikes('like', _id, signedInUserId))
              }
              aria-label="Like"
            >
              <LikeIcon
                style={
                  likers.includes(signedInUserId) ? { color: '#3f51b5' } : null
                }
              />
            </IconButton>
            {likesCount}
          </div>
          <div style={{ marginLeft: '20px' }}>
            <IconButton onClick={this.handleExpandClick}>
              <CommentIcon />
            </IconButton>
            {comments.length}
          </div>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Comments
            editComment={editComment}
            addComment={addComment}
            comments={comments}
            commenterId={signedInUserId}
            deleteComment={deleteComment}
            getUser={getUser}
            postId={_id}
            signedInUserId={signedInUserId}
          />
        </Collapse>
        <EditModal
          _id={_id}
          editPost={editPost}
          handleModalClose={this.handleModalClose}
          modalOpen={modalOpen}
          text={text}
        />
>>>>>>> master
      </Card>
    );
  }
}
<<<<<<< HEAD
Post.propTypes = {
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  avatarColor: PropTypes.number.isRequired,
=======

Post.defaultProps = {
  comments: []
};

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  reviewId: PropTypes.string,
  addComment: PropTypes.func.isRequired,
  comments: PropTypes.array,
>>>>>>> master
  classes: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  signedInUserId: PropTypes.string.isRequired,
  likers: PropTypes.array.isRequired,
  likesCount: PropTypes.number.isRequired,
  editComment: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  deletePost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  updatePostLikes: PropTypes.func.isRequired
};
export default withStyles(styles)(Post);