import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Post from './Post';

class PostList extends Component {
    render() {
      const { posts, deletePost, updatePost } = this.props;
      return (
        <div>
          {posts.map(post => (
            <Post
              key={post._id}
              _id={post._id}
              author={post.author}
              authorId={post.authorId}
              avatarColor={post.avatarColor}
              text={post.text}
              timestamp={post.timestamp}
              deletePost={id => deletePost(id)}
              updatePost={(id, text, author) => updatePost(id, text, author)}
            />
          ))}
        </div>
      );
    }
  }

PostList.defaultProps = {
  posts: []
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired
    })
  ),
  deletePost: PropTypes.func.isRequired
};

export default PostList;