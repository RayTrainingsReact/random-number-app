import React from "react";

function DigitItem(props) {
  return (
    <div className="flex-item">
      <h1>{props.number.toString().padStart(6, "0")}</h1>
      <h2>{props.numberMeaning}</h2>
    </div>
  );
}

export default DigitItem;
