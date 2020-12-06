import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

import FaceIcon from '@material-ui/icons/Face';
<<<<<<< HEAD
import FavoriteIcon from '@material-ui/icons/Favorite';
=======
>>>>>>> master
import GroupIcon from '@material-ui/icons/GroupAdd';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';

import { Link } from 'react-router-dom';

export const FolderListItems = ({ user }) => (
  <div>
<<<<<<< HEAD
   <Link style={{ textDecoration: 'none' }} to="/">
=======
   <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/`} to="/">
>>>>>>> master
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
<<<<<<< HEAD
    <Link style={{ textDecoration: 'none' }} to={`/profile/${user.user_info.id}`}>
=======
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/profile/${user.user_info.id}`} to={`/profile/${user.user_info.id}`}>
>>>>>>> master
      <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
<<<<<<< HEAD
    <ListItem button>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Following" />
    </ListItem>
    <Link style={{ textDecoration: 'none' }} to="/discover">
=======
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/following`} to="/following">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Following" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/discover`} to="/discover">
>>>>>>> master
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Discover" />
      </ListItem>
    </Link>
<<<<<<< HEAD
=======
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/feed`} to="/feed">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Feed" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/add`} to="/add">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="IMDB" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/podcasts`} to="/podcasts">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Podcasts" />
      </ListItem>
    </Link>
>>>>>>> master
  </div>
);

export const otherFolderListItems = (
  <div>
<<<<<<< HEAD
    <ListItem button>
      <ListItemIcon>
        <FavoriteIcon />
      </ListItemIcon>
      <ListItemText primary="Favorited Posts" />
    </ListItem>
    <Link style={{ textDecoration: 'none' }} to="/settings">
=======
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/settings`} to="/settings">
>>>>>>> master
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </Link>
  </div>
);

FolderListItems.propTypes = {
  user: PropTypes.object.isRequired
};