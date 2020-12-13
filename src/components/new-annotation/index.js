import React, { useState, useEffect } from "react";
import { addAnnotation } from "../../api/posts";
import "./new-annotation.css";

const NewAnnotation = (props) => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(undefined);
  const [postId, setPostId] = useState(undefined);

  const initialSetup = () => {
    setPostId(props.postId);
  };

  useEffect(initialSetup, [props.postId]);

  const handleClick = () => {
    var payload = {
      postId: postId,
      message: message,
    };

    addAnnotation(payload)
      .then((response) => {
        if (response.status === 200) {
          // link to post page
          const data = response.data;
          props.success(data);
          // clear data
          setMessage("");
        } else if (response.status === 202) {
          setError(response.data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div id={props.id} className="new-annotation">
      <h3>Add Annotation:</h3>
      <textarea
        id="message"
        alt="message"
        name="message"
        aria-label="New annotation message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
      ></textarea>
      <button aria-label="Add Annotation to post" onClick={handleClick}>
        Submit
        </button>
      <div>{error ? error : ""}</div>
    </div>
  );

};

export default NewAnnotation;
