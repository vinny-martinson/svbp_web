import React from 'react';
import { Router, Route, Switch, Redirect, withRouter  } from 'react-router-dom';

import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header"
import 'fontsource-roboto';
import 'semantic-ui-css/semantic.min.css'
import PostFeed from './views/PostFeedView';

import { createBrowserHistory } from "history";



const App = () => {
  return (
    <div>
      <Header />
      <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Feed" component={PostFeed} />
        <Route component={NotFound}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;