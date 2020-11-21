import React from 'react';
import PostFeed from '../components/PostFeed';
import CreatePost from '../components/CreatePost';

const PostFeedView = () => (
  <div>
    <CreatePost />
    <PostFeed />
  </div>
);

export default PostFeedView;