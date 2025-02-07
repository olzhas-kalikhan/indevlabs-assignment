import { useQuery } from "@tanstack/react-query";
import todoApi, { TodoItem } from "~/todo-api";
import TodoListItem from "./list-item";
import NewTodoItem from "./new-todo-item";
import { useEffect } from "react";


/* to test local storage turn off BE server it will load last BE response data.  */
/* to use local storage without BE I would change implementation for todos state. */

const retrieveLocalTodos = (): TodoItem[] => {
  const localTodos = localStorage.getItem("todos");
  return localTodos ? JSON.parse(localTodos) : [];
};

export default function TodoList() {
  const { data: todos } = useQuery({
    queryKey: ["todos"],
    queryFn: todoApi.getTodos,
    initialData: retrieveLocalTodos(),
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="py-4 max-w-2xl flex flex-col justify-center items-center mx-auto">
      <h1 className="mx-auto text-4xl my-4">Todos</h1>
      <NewTodoItem />
      {todos.length > 0 ? (
        <ul className="w-full mt-4 border rounded p-6">
          {todos.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </ul>
      ) : (
        <p className="pt-4 text-xl">No tasks to display</p>
      )}
    </div>
  );
}
