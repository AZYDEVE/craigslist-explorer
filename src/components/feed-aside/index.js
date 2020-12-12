import React, { useState, useEffect } from "react";
import "./feed-aside.css";
import { withRouter, Link } from "react-router-dom";
import {
  convertDate
} from "../../services/helper";

// Change the page in router to the correct querystring
// uses react-router linking
// we can restyle this to be in a nav bar

const Aside = (props) => {
  const [id, setId] = useState(undefined);

  // Get Post here
  const initialSetup = () => {
    // Get post id
    if (
      props.location &&
      props.location.state &&
      props.location.state.postId
    ) {
      setId(props.location.state.postId);
    } else if (props.match && props.match.params && props.match.params.postId) {
      setId(props.match.params.postId);
    } else {
      setId(null);
    }
  };

  useEffect(initialSetup, [props.location, props.match]);

  return (
    <div className="aside">
      <div className="date">
        <div>
          {convertDate(Date.now()).split(' ')[0]}
        </div>
        <div>
          {convertDate(Date.now()).split(' ')[1]}
        </div>
      </div>
      <div className="divider"></div>
      <div className="location">
        <div>
          <div>
            San Francisco
        </div>
          <div>
            US, CA
        </div>
        </div>
        <div className="image"></div>
      </div>
      <div className="divider"></div>
      <div className="current">
        <div>
          Lists
        </div>
        <div className="arrow">
          ↓
        </div>
        <div>
          housing
        </div>
        <div className="arrow">
          ↓
        </div>
        <div>
          {
            id ?
              <Link
                className="back"
                to='/'
              >apartments housing for rent</Link>
              :
              "apartments housing for rent"
          }
        </div>
        {
          id ?
            <React.Fragment>
              <div className="arrow">
                ↓
              </div>
              <div>
                {id}
              </div>
            </React.Fragment>
            :
            ""
        }
      </div>
    </div>

  );
};

export default withRouter(Aside);
