import { useEffect, useState } from "react";
import { useFetchTodoList } from "../../../hooks/todos";
import Counter from "../../commons/Counter";
import TodoList from "../TodoList";

const TodoContainer = () => {
  const [count, setCount] = useState(0);

  const { todos, isStale } = useFetchTodoList();

  const up = () => {
    setCount((prev) => prev + 1);
  };

  const down = () => {
    setCount((prev) => prev - 1);
  };

  useEffect(() => {
    // console.log("TODOCONTAINER MOUNT");

    return () => {
      // console.log("TODOCONTAINER UNMOUNT");
    };
  }, []);

  console.log(isStale ? "구식의 쿼리 데이터" : "새로운 쿼리 데이터");

  return (
    <div>
      <Counter count={count} up={up} down={down}></Counter>
      <TodoList todos={todos}></TodoList>
    </div>
  );
};

export default TodoContainer;
