import React from "react";
import "./annotation.css";
import {
  convertDate
} from "../../services/helper";

const Annotation = (props) => {
  return (
    <div className="annotation-item">
      <div className='date'>
        {convertDate(props.annotation.date)}
      </div>
      <div className="message">
        {props.annotation.message}
      </div>
    </div>
  );
};

export default Annotation;
