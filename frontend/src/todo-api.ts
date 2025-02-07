import axios from "axios";

const TODOS_PATH = "/api/todos";

export type TodoItem = {
  id: number;
  name: string;
  completed: boolean;
};

const getTodos = async () => {
  const response = await axios.get<TodoItem[]>(TODOS_PATH);
  return response.data;
};

const getTodo = async () => {
  return fetch(TODOS_PATH, {
    method: "GET",
  });
};

const updateTodo = async (todo: TodoItem) => {
  return axios.put(TODOS_PATH, todo);
};

const createTodo = async (todo: Omit<TodoItem, "id">) => {
  return axios.post(TODOS_PATH, todo);
};
const deleteTodo = async (id: number) => {
  return axios.delete(`${TODOS_PATH}/${id}`);
};

export default {
  getTodos,
  getTodo,
  updateTodo,
  createTodo,
  deleteTodo,
};
