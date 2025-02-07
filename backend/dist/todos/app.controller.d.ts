import { AppService, type CreateTodoPayload, type DeleteTodoPayload, type UpdateTodoPayload } from './todo.service';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    findAll(): import("./todo.service").TodoRecord[];
    create(todoPayload: CreateTodoPayload): CreateTodoPayload;
    update(todoPayload: UpdateTodoPayload): void;
    remove(todoPayload: DeleteTodoPayload): number;
}
