import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PropTypes from 'prop-types';

import FaceIcon from '@material-ui/icons/Face';
import GroupIcon from '@material-ui/icons/GroupAdd';
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import SettingsIcon from '@material-ui/icons/Settings';
import MovieIcon from '@material-ui/icons/Movie';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import MicIcon from '@material-ui/icons/Mic';

import { Link } from 'react-router-dom';

const logged_in1 = localStorage.getItem('jwtToken')
const spotify_active = localStorage.getItem('spotify_token')

export const FolderListItems = ({ user }) => (
  <div>
   <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/`} to="/">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    {(logged_in1) ? 
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/profile/${user.user_info.id}`} to={`/profile/${user.user_info.id}`}>
      <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link> : ""}
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/following`} to="/following">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Following" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/discover`} to="/discover">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Discover" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/add`} to="/add">
      <ListItem button>
        <ListItemIcon>
          <MovieIcon />
        </ListItemIcon>
        <ListItemText primary="TV and Films" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/podcasts`} to="/podcasts">
      <ListItem button>
        <ListItemIcon>
          <MicIcon />
        </ListItemIcon>
        <ListItemText primary="Podcasts" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/books`} to="/books">
      <ListItem button>
        <ListItemIcon>
          <MenuBookIcon />
        </ListItemIcon>
        <ListItemText primary="Books" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/music`} to="/music">
      <ListItem button>
        <ListItemIcon>
          <MusicNoteIcon />
        </ListItemIcon>
        <ListItemText primary="Music" />
      </ListItem>
    </Link>
  </div>
);

export const otherFolderListItems = (
  <div>
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/settings`} to="/settings">
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