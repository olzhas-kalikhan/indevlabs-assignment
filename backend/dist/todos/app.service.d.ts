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
export type DeleteTodoPayload = Pick<TodoRecord, 'id'>;
export declare class AppService {
    private _todos;
    private _id_increment;
    getHello(): string;
    findAll(): TodoRecord[];
    create(todo: CreateTodoPayload): CreateTodoPayload;
    update(todo: UpdateTodoPayload): void;
    remove({ id }: DeleteTodoPayload): number;
}
export {};
