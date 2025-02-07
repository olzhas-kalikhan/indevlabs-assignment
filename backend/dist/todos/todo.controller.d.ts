import { TodoService, type CreateTodoPayload, type DeleteTodoPayload, type UpdateTodoPayload } from './todo.service';
export declare class TodoController {
    private readonly appService;
    constructor(appService: TodoService);
    findAll(): import("./todo.service").TodoRecord[];
    create(todoPayload: CreateTodoPayload): CreateTodoPayload;
    update(todoPayload: UpdateTodoPayload): void;
    remove(todoPayload: DeleteTodoPayload): number;
}
