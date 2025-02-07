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
export declare class TodosService {
    private _todos;
    private _id_increment;
    findAll(): TodoRecord[];
    create(todo: CreateTodoPayload): CreateTodoPayload;
    update(todo: UpdateTodoPayload): {
        modified_at: string;
        id: number;
        name: string;
        completed: boolean;
        created_at: string;
    };
    remove(id: number): number;
}
export {};
