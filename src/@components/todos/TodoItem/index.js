const TodoItem = (props) => {
  const { todo } = props;

  const { id, title, completed } = todo;

  return (
    <div>
      <div>{completed}</div>
      <div>{id}</div>
      <div>{title}</div>
    </div>
  );
};

export default TodoItem;
