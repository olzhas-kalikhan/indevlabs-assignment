import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

export type TodoRecord = {
  id: number;
  name: string;
  completed: boolean;
  created_at: string;
  modified_at: string;
};

type SystemFields = 'created_at' | 'modified_at';

export type CreateTodoPayload = Omit<TodoRecord, 'id' | SystemFields>;
export type UpdateTodoPayload = Omit<TodoRecord, SystemFields>;

const generateData = () =>
  Array.from({ length: 4 }, (_, i) => {
    const isoDate = new Date().toISOString();

    return {
      id: i,
      name: `task: ${i + 1}`,
      completed: false,
      created_at: isoDate,
      modified_at: isoDate,
    };
  });

@Injectable()
export class TodosService {
  private _todos: TodoRecord[] = generateData();
  private _id_increment = this._todos.length;

  findAll() {
    return this._todos.sort(
      (a, b) => -a.created_at.localeCompare(b.created_at),
    );
  }
  create(todo: CreateTodoPayload) {
    const isoDate = new Date().toISOString();
    this._todos.push({
      id: this._id_increment,
      ...todo,
      created_at: isoDate,
      modified_at: isoDate,
    });
    this._id_increment++;
    return todo;
  }
  update(todo: UpdateTodoPayload) {
    const existingIndex = this._todos.findIndex((t) => t.id === todo.id);
    if (existingIndex === -1)
      throw new HttpException('Todo item not Found', HttpStatus.NOT_FOUND);

    const updatedTodo = {
      ...this._todos[existingIndex],
      ...todo,
      modified_at: new Date().toISOString(),
    };

    this._todos[existingIndex] = updatedTodo;

    return updatedTodo;
  }
  remove(id: number) {
    let found = false;

    this._todos = this._todos.filter((t) => {
      if (t.id === id) found = true;
      return t.id !== id;
    });

    if (!found)
      throw new HttpException('Todo item not Found', HttpStatus.NOT_FOUND);

    return id;
  }
}
