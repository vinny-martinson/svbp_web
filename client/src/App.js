import React from 'react';
import { Router, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Home from "./views/Home/Home";
import NotFound from "./views/NotFound";
import Header from "./components/Header";
import 'fontsource-roboto';
import 'semantic-ui-css/semantic.min.css';
import PostFeed from './views/PostFeedView';
import ProfilePage from './views/ProfilePage';
import Login from './components/Login';
import Signup from './components/Signup';
import DiscoverPage from './views/DiscoverPage';

import {UserContext} from './Context/UserContext';
import { createBrowserHistory } from "history";
import SwitchHeaders from './components/SwitchHeaders';


class App extends React.Component {
  setCurrUser = (currUser) => {
    this.setState({ currUser });
  };

  state = {
    currUser: {
      fullName: 'Benji',
      username: 'Labonte',
      email: 'Benji@gmail.com',
      bio: '',
      // avatarColor: { type: Number, required: true },
      is_premium: false,
      followers: "0",
      following: "0",
      // createdAt: { type: Date, default: Date.now()
      loggedIn: false
    },
    setCurrUser: this.setCurrUser,
  }
  

  render() {
    const user = { name: 'Benji', loggedIn: true }
    return (
      <div>
        <UserContext.Provider value={this.state}>
          <Router history={createBrowserHistory()}>
            <SwitchHeaders/>
            <Switch>
              <Route exact path="/" component={PostFeed} />
              <Route path="/Home" component={Home} />
              <Route path="/Login" component={Login} />
              <Route path="/Signup" component={Signup} />
              <Route path="/Profile/:id" component={ProfilePage} />
              <Route path="/discover" component={DiscoverPage} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </UserContext.Provider>
      </div>
    );
  }
}

export default App;