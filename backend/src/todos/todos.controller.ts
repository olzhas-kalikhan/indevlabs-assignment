import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  TodosService,
  type CreateTodoPayload,
  type UpdateTodoPayload,
} from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly appService: TodosService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Post()
  create(@Body() todoPayload: CreateTodoPayload) {
    return this.appService.create(todoPayload);
  }

  @Put()
  update(@Body() todoPayload: UpdateTodoPayload) {
    return this.appService.update(todoPayload);
  }

  @Delete(':id')
  remove(@Param() params: { id: string }) {
    return this.appService.remove(parseInt(params.id));
  }
}
