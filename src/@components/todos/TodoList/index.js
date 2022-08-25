import TodoItem from "../TodoItem";

const TodoList = (props) => {
  const { todos } = props;

  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo}></TodoItem>
      ))}
    </div>
  );
};

export default TodoList;
