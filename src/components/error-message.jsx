import React from "react";

function ErrorMessage(props) {
  return (
    <div className="flex-item red">
      <h1>Number cannot be bigger than {props.maxNumber}</h1>
    </div>
  );
}

export default ErrorMessage;
