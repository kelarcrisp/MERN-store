import React from "react";
export const Spinner = () => {
  return (
    <div className="SpinnerContainer">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};
