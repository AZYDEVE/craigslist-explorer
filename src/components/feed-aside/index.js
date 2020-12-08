import React from "react";
import "./feed-aside.css";
import { withRouter } from "react-router-dom";
import {
  convertDate
} from "../../services/helper";

// Change the page in router to the correct querystring
// uses react-router linking
// we can restyle this to be in a nav bar

const Aside = (props) => {
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
          apartments housing for rent
        </div>
      </div>
    </div>

  );
};

export default withRouter(Aside);
