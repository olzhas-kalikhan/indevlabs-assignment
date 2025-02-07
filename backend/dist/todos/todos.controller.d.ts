import { TodosService, type CreateTodoPayload, type UpdateTodoPayload } from './todos.service';
export declare class TodosController {
    private readonly appService;
    constructor(appService: TodosService);
    findAll(): import("./todos.service").TodoRecord[];
    create(todoPayload: CreateTodoPayload): CreateTodoPayload;
    update(todoPayload: UpdateTodoPayload): {
        modified_at: string;
        id: number;
        name: string;
        completed: boolean;
        created_at: string;
    };
    remove(params: {
        id: string;
    }): number;
}
