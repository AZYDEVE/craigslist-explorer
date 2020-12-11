import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Switch, Route, HashRouter as Router } from "react-router-dom";

// views
import Feed from "./views/feed";
import NotFound from "./views/not-found";
import Post from "./views/post";

// Components
import Header from "./components/header";
import Footer from "./components/footer";
import FeedAside from "./components/feed-aside";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
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
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
