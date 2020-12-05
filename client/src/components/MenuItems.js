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

import { Link } from 'react-router-dom';

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
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/profile/${user.user_info.id}`} to={`/profile/${user.user_info.id}`}>
      <ListItem button>
        <ListItemIcon>
          <FaceIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
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
    <Link style={{ textDecoration: 'none' }} onClick={() => window.location.href=`/feed`} to="/feed">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Feed" />
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