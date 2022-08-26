import React from "react";

const Counter = (props) => {
  const { count, up, down } = props;
  return (
    <div>
      <button onClick={up}>UP</button>
      <div>{count}</div>
      <button onClick={down}>DOWN</button>
    </div>
  );
};

export default Counter;
