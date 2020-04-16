import React from "react";

const QuakeTile = ({ id, magnitude, location, when }) => {
  return (
    <div>
      <h3>quake {id}</h3>
      <p>Location {location}</p>
      <p>magnitude {magnitude}</p>
      <p>when {when}</p>
    </div>
  );
};

export default QuakeTile;
