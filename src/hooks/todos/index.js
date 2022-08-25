import { useQuery } from "react-query";
import { getTodos } from "../../remote_data_fetcher/todos";

const key = "todos";

export const useFetchTodoList = () => {
  const { data: getTodosResponse } = useQuery(key, getTodos);

  return {
    todos: getTodosResponse?.data ?? [],
  };
};
