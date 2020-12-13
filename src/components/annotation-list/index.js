import React from "react";
import Annotation from "../annotation";

function PostList(props) {
  const posts = props.annotations;
  const listItems = posts.map((annotation, index) => (
    <Annotation
      key={annotation._id || index}
      annotation={annotation}
    />
  ));
  return <React.Fragment>{listItems}</React.Fragment>;
}

export default PostList;
