import React from 'react';
import { Router, Route, Switch, Redirect, withRouter  } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header"
import 'fontsource-roboto';
import 'semantic-ui-css/semantic.min.css'
import PostFeed from './views/PostFeedView';
import ProfilePage from './views/ProfilePage';
import Login from './components/Login'
import Signup from './components/Signup'
import DiscoverPage from './views/DiscoverPage';
import FollowingPage from './views/FollowingPage';

export const history = createHistory();

const App = () => {
  return (
    <div>
      <Router history={history}>
      <Switch>
        <Route exact path="/" component={PostFeed} />
        <Route path="/Home" component={Home} />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Profile/:id" component={ProfilePage} />
        <Route path="/following" component={FollowingPage} />
        <Route path="/discover" component={DiscoverPage} />
        <Route component={NotFound}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;