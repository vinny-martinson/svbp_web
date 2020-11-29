import React from 'react';
import { Router, Route, Switch, Redirect, withRouter  } from 'react-router-dom';
//import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from "history";
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Categories from "./views/Categories"
import Header from "./components/Header"
import 'fontsource-roboto';
import 'semantic-ui-css/semantic.min.css'
import PostFeed from './views/PostFeedView';
import TabNav from './components/TabNav';
import Tab from './components/Tab';

export const history = createBrowserHistory();


const App = () => {
  return (
    <div>
      <Header />
      <Router history={createBrowserHistory()}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/Feed" component={PostFeed} />
        <Route exact path="/Categories" component={Categories} />
        <Route component={NotFound}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
