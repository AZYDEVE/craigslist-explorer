import React, { useEffect, useState } from "react";
import "./post.css";
import {
  getImageUrl,
  imageSize
} from "../../services/imageService";
import {
  convertDate
} from "../../services/helper";
import { Link } from "react-router-dom";

const Post = (props) => {
  const [date, setDate] = useState("");
  const [color, setColor] = useState({});

  const initialSetup = () => {
    // setDate(convertDate(props.post.created));
  };

  useEffect(initialSetup, []);

  return (
    <Link
      className="post-container"
      to={{
        pathname: "/post/" + props.post._id,
        state: { postId: props.post._id },
      }}
    >
      <div className="image" style={{ backgroundImage: `url(${getImageUrl(props.post.images[0], imageSize.MEDIUM)})` }} >

      </div>
      <div className="content">
        <div className="title">
          {props.post.title}
        </div>
        <div className="extra-info">
          <div className='date'>
            {convertDate(props.post.date)}
          </div>
          <div className='bedrooms'>
            {props.post.bedrooms} BR,
          </div>
          <div className='area'>
            {props.post.area} ft²,
          </div>
          <div className='city'>
            {props.post.neighborhood.join(" ")}
          </div>
          <div className='pin'>
            📍
          </div>
        </div>
      </div>
      <div className="price">
        $ {props.post.price}
      </div>
    </Link>
  );
};

export default Post;
