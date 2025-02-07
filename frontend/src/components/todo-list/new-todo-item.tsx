import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../button";
import Checkbox from "../checkbox";
import Input from "../input";
import todoApi from "~/todo-api";
import { useRef } from "react";

export default function NewTodoItem() {
  const queryClient = useQueryClient();
  const formRef = useRef<HTMLFormElement>(null);
  const todoCreateMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      formRef.current?.reset();
    },
  });

  return (
    <form
      ref={formRef}
      className="w-full"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        todoCreateMutation.mutate({
          name: (formData.get("name") as string) ?? "",
          completed: Boolean(formData.get("completed")),
        });
      }}
    >
      <div className="flex items-stretch">
        <Checkbox name="completed" />
        <Input name="name" placeholder="New Todo..." />
        <Button className="block bg-sky-100 ml-2">Add Todo Item</Button>
      </div>
    </form>
  );
}
