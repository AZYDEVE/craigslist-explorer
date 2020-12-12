import React, { useState, useEffect } from 'react';
import './index.css';
import { Switch, Route, HashRouter as Router } from "react-router-dom";

import { login, logout, test } from './api/user'

// views
import Feed from "./views/feed";
import NotFound from "./views/not-found";
import Post from "./views/post";
import Authenticate from "./views/authenticate";

// Components
import Header from "./components/header";
import Footer from "./components/footer";
import FeedAside from "./components/feed-aside";

function App() {
  const [user, setUser] = useState(null);

  const getUser = () => {
    login()
      .then((response) => {
        console.log('initial get user', response.data);
        if (response.data) {
          setUser(response.data);
        }
      }).catch((err) => {
        console.log('Request to login failed', err);
      })
  }

  const loginSuccess = (data) => {
    setUser(data);
  }

  const logoutUser = () => {
    logout().then((response) => {
      if (response.data && response.data === true) {
        setUser(null);
      }
    }).catch((err) => {
      console.log('Request to logout failed', err);
    })
  }

  useEffect(getUser, []);

  return (
    <Router>
      <Header logout={logoutUser} user={user} />
      <div role="main" id="craigslist-body" className="craigslist-body">
        <Switch>
          <Route exact path="/">
            <FeedAside />
            <Feed />
          </Route>
          <Route path="/post/:postId" >
            <FeedAside />
            <Post />
          </Route>
          <Route path="/login" >
            <Authenticate loginSuccess={loginSuccess} />
          </Route>
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
}

export default App;