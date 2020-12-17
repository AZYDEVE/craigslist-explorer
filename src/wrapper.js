import React, { useState, useEffect } from "react";
import { Switch, Route, HashRouter as Router } from "react-router-dom";
import { login, logout } from "./api/user";
import { LoadScript } from "@react-google-maps/api";
import { deleteCookie } from "./services/cookie.service";
import "./index.css";

// views
import Feed from "./views/feed";
import NotFound from "./views/not-found";
import Post from "./views/post";
import Authenticate from "./views/authenticate";

// Components
import Header from "./components/header";
import Footer from "./components/footer";
import FeedAside from "./components/feed-aside";

const App = () => {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [filterNeighborhood, setFilterNeighborhood] = useState(null);

  const getUser = () => {
    login()
      .then((response) => {
        if (response.data) {
          setUser(response.data);
        }
      })
      .catch((err) => {
        console.log("Request to login failed", err);
      });
  };

  const loginSuccess = (data) => {
    setUser(data);
  };

  const logoutUser = () => {
    logout()
      .then((response) => {
        if (response.data && response.data === true) {
          setUser(null);
          // remove cookie
          deleteCookie("connect.sid");
        }
      })
      .catch((err) => {
        console.log("Request to logout failed", err);
      });
  };

  useEffect(getUser, []);

  //Alex :  I like how you use the router to include different components on the page.  
  //For components show on every page, you put outside of the switch tag. 
  //For components show only on a particular page, you put between the Route tag. so good job.  
  // in my project, I have only use router to switch between pages. 
  return (
    <LoadScript googleMapsApiKey="AIzaSyCUt2G6KFrKTpKlUkbUrTIH0SqpgzRX8_0">
      <Router>
        <Header logout={logoutUser} user={user} />
        <div role="main" id="craigslist-body" className="craigslist-body">
          <Switch>
            <Route exact path="/">
              <FeedAside setFilter={setFilterNeighborhood} post={post} />
              <Feed neighborhood={filterNeighborhood} postLoaded={setPost} />
            </Route>
            <Route path="/post/:postId">
              <FeedAside setFilter={setFilterNeighborhood} post={post} />
              <Post postLoaded={setPost} user={user} />
            </Route>
            <Route path="/login">
              <Authenticate loginSuccess={loginSuccess} />
            </Route>
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </LoadScript>
  );
};

export default App;
