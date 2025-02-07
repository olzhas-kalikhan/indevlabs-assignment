"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const generateData = () => Array.from({ length: 4 }, (_, i) => {
    const isoDate = new Date().toISOString();
    return {
        id: i,
        name: `task: ${i + 1}`,
        completed: false,
        created_at: isoDate,
        modified_at: isoDate,
    };
});
let TodosService = class TodosService {
    constructor() {
        this._todos = generateData();
        this._id_increment = this._todos.length;
    }
    findAll() {
        return this._todos.sort((a, b) => -a.created_at.localeCompare(b.created_at));
    }
    create(todo) {
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
    update(todo) {
        const existingIndex = this._todos.findIndex((t) => t.id === todo.id);
        if (existingIndex === -1)
            throw new common_1.HttpException('Todo item not Found', common_1.HttpStatus.NOT_FOUND);
        const updatedTodo = {
            ...this._todos[existingIndex],
            ...todo,
            modified_at: new Date().toISOString(),
        };
        this._todos[existingIndex] = updatedTodo;
        return updatedTodo;
    }
    remove(id) {
        let found = false;
        this._todos = this._todos.filter((t) => {
            if (t.id === id)
                found = true;
            return t.id !== id;
        });
        if (!found)
            throw new common_1.HttpException('Todo item not Found', common_1.HttpStatus.NOT_FOUND);
        return id;
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)()
], TodosService);
//# sourceMappingURL=todos.service.js.map