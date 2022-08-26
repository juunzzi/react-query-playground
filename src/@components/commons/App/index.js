import React, { useState } from "react";
import TodoContainer from "../../todos/TodoContainer";

const App = () => {
  const [isShow, setIsShow] = useState(true);

  const toggle = () => {
    setIsShow((prev) => !prev);
  };
  return (
    <div>
      <button onClick={toggle}>MOUNT/UNMOUNT TODOCONTAINER</button>
      {isShow && <TodoContainer />}
    </div>
  );
};

export default App;
