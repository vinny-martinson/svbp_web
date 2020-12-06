import React from 'react';
import { Router, Route, Switch, Redirect, withRouter  } from 'react-router-dom';

// import createHistory from 'history/createBrowserHistory';

// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history'

import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Categories from "./views/Categories"
import Header from "./components/Header"
import 'fontsource-roboto';
import 'semantic-ui-css/semantic.min.css';
import PostFeed from './views/PostFeedView';
import ProfilePage from './views/ProfilePage';
import Login from './components/Login';
import Signup from './components/Signup';
import DiscoverPage from './views/DiscoverPage';

import ProfilePage from './views/ProfilePage';
import Login from './components/Login'
import Signup from './components/Signup'
import DiscoverPage from './views/DiscoverPage';
import SettingsPage from './views/SettingsPage';
import PodcastsPage from './views/SpotifyPodcasts';
import FollowingPage from './views/FollowingPage';

import MainPage from './views/MainPage';
import DetailPage from './views/DetailPage';
import AddPage from './views/AddPage';

import TabNav from './components/TabNav';
import Tab from './components/Tab';

// export const history = createHistory();
export const history = createBrowserHistory();

const App = () => {
  console.log("HISTORY");
  console.log(history);
  return (
    <div>

        <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Feed" component={PostFeed} />

        <Route exact path="/shows/:id" component={DetailPage} />
        <Route exact path="/add" component={AddPage} />
        <Route exact path="/detail" component={DetailPage} />
        <Route exact path="/Login" component={Login} />
        <Route exact path="/Signup" component={Signup} />
        <Route exact path="/profile/:id" component={ProfilePage} />
        <Route exact path="/following" component={FollowingPage} />
        <Route exact path="/discover" component={DiscoverPage} />
        <Route exact path="/podcasts" component={PodcastsPage} />
        <Route exact path="/settings" component={SettingsPage} />
        <Route component={NotFound}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
