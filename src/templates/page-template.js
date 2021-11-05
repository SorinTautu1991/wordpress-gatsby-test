import React from "react";

const PageTemplate = ({ pageContext }) => {
  return (
    <div>
      <h1>{pageContext.title}</h1>
    </div>
  );
};

export default PageTemplate;
