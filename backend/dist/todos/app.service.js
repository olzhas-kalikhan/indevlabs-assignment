"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    constructor() {
        this._todos = [];
        this._id_increment = 0;
    }
    getHello() {
        return 'Hello World!';
    }
    findAll() {
        return this._todos;
    }
    create(todo) {
        const date = new Date();
        this._todos.push({
            id: this._id_increment,
            ...todo,
            created_at: date.toISOString(),
            modified_at: date.toISOString(),
        });
        this._id_increment++;
        return todo;
    }
    update(todo) {
        const existingIndex = this._todos.findIndex((t) => t.id === todo.id);
        if (existingIndex != -1)
            throw new common_1.HttpException('Todo item not Found', common_1.HttpStatus.NOT_FOUND);
        this._todos[existingIndex] = {
            ...this._todos[existingIndex],
            ...todo,
            modified_at: new Date().toISOString(),
        };
    }
    remove({ id }) {
        let found = false;
        this._todos = this._todos.filter((t) => {
            found = true;
            return t.id !== id;
        });
        if (!found)
            throw new common_1.HttpException('Todo item not Found', common_1.HttpStatus.NOT_FOUND);
        return id;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map