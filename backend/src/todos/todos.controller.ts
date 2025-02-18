import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { TodosService } from './todos.service';
import type { CreateTodoRecordDto } from './dto/create-todo.dto';
import type { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly appService: TodosService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }

  @Post()
  create(@Body(ValidationPipe) createTodoDto: CreateTodoRecordDto) {
    return this.appService.create(createTodoDto);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe) updateTodoDto: UpdateTodoDto,
  ) {
    return this.appService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.appService.remove(id);
  }
}
