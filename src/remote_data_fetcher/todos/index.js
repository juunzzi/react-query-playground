import { client } from "..";

export const getTodos = () => client.get("/todos");

export const getTodo = (id) => client.get(`/todos/${id}`);
