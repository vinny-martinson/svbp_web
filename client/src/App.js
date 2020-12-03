import React from 'react';
import { Router, Route, Switch, Redirect, withRouter  } from 'react-router-dom';

import createHistory from 'history/createBrowserHistory';

//import createHistory from 'history/createBrowserHistory';

import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Categories from "./views/Categories"
import Header from "./components/Header"
import 'fontsource-roboto';
import 'semantic-ui-css/semantic.min.css'
import PostFeed from './views/PostFeedView';

import ProfilePage from './views/ProfilePage';
import Login from './components/Login'
import Signup from './components/Signup'
import DiscoverPage from './views/DiscoverPage';
import SettingsPage from './views/SettingsPage';

import FollowingPage from './views/FollowingPage';

import TabNav from './components/TabNav';
import Tab from './components/Tab';

export const history = createHistory();

const App = () => {
  return (
    <div>
        <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/Feed" component={PostFeed} />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/profile/:id" component={ProfilePage} />
        <Route path="/following" component={FollowingPage} />
        <Route path="/discover" component={DiscoverPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route component={NotFound}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
