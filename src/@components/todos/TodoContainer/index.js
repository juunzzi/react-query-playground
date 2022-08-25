import { useFetchTodoList } from "../../../hooks/todos";
import TodoList from "../TodoList";

const TodoContainer = () => {
  const { todos } = useFetchTodoList();

  return (
    <div>
      <TodoList todos={todos}></TodoList>
    </div>
  );
};

export default TodoContainer;
