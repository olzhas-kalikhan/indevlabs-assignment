import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import type { CreateTodoRecordDto } from './dto/create-todo.dto';
import type { UpdateTodoDto } from './dto/update-todo.dto';

export type TodoRecord = {
  id: number;
  name: string;
  completed: boolean;
  created_at: string;
  modified_at: string;
};

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
    return this._todos
      .sort((a, b) => -a.created_at.localeCompare(b.created_at))
      .map((todo) => ({
        id: todo.id,
        name: todo.name,
        completed: todo.completed,
      }));
  }
  create(createTodoDto: CreateTodoRecordDto) {
    const isoDate = new Date().toISOString();
    this._todos.push({
      ...createTodoDto,
      id: this._id_increment,
      created_at: isoDate,
      modified_at: isoDate,
    });
    this._id_increment++;
    return createTodoDto;
  }
  update(id: number, updateTodoDto: UpdateTodoDto) {
    const existingIndex = this._todos.findIndex((t) => t.id === id);
    if (existingIndex === -1)
      throw new HttpException('Todo item not Found', HttpStatus.NOT_FOUND);

    const updatedTodo = {
      ...this._todos[existingIndex],
      ...updateTodoDto,
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
