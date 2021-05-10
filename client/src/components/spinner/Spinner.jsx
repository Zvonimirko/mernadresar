import React from "react";
import gif from "../../images/giphy.gif";

const Spinner = () => {
  return (
    <center>
      <img
        src={gif}
        alt="loading"
        style={{ width: "200px", height: "200px" }}
      />
    </center>
  );
};

export default Spinner;
