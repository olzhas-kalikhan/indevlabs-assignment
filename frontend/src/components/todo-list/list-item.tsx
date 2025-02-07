import todoApi, { TodoItem } from "~/todo-api";
import Checkbox from "../checkbox";
import Input from "../input";
import Button from "../button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChangeEventHandler, useCallback, useMemo, useState } from "react";
import { debounce } from "~/utils";

const DeleteTodoButton = ({ id }: { id: number }) => {
  const queryClient = useQueryClient();

  const todoDeleteMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleClick = () => {
    todoDeleteMutation.mutate(id);
  };

  return (
    <Button className="ml-2 bg-red-200" onClick={handleClick}>
      Delete
    </Button>
  );
};

export default function TodoListItem({ todo }: { todo: TodoItem }) {
  const queryClient = useQueryClient();
  const todoUpdateMutation = useMutation({
    mutationFn: todoApi.updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const [todoState, setTodoState] = useState(todo);
  const updateTodo = useCallback((newTodo: TodoItem) => {
    todoUpdateMutation.mutate(newTodo);
  }, []);

  const [updateTodoDebounced] = useMemo(
    () => debounce(updateTodo, 1000),
    [updateTodo]
  );

  const handleCheckboxChange = () => {
    setTodoState((prev) => {
      const newState = { ...prev, completed: !prev.completed };
      updateTodoDebounced(newState);
      return { ...prev, completed: !prev.completed };
    });
  };

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTodoState((prev) => {
      const newState = { ...prev, name: e.target?.value ?? "" };
      updateTodoDebounced(newState);
      return newState;
    });
  };

  return (
    <li key={todo.id} className="flex items-stretch py-1">
      <Checkbox
        name="completed"
        checked={todoState.completed}
        onChange={handleCheckboxChange}
      />
      <Input
        name="name"
        value={todoState.name}
        onChange={handleInputChange}
        className={(todoState.completed && "bg-lime-200") || ""}
      />
      <DeleteTodoButton id={todo.id} />
    </li>
  );
}
