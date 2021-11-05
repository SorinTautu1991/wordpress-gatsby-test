import React from "react";

const PostTemplate = ({ pageContext }) => {
  return (
    <div>
      <h1>{pageContext.title}</h1>
    </div>
  );
};

export default PostTemplate;
