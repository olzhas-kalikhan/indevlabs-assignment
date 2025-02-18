import { PartialType } from '@nestjs/mapped-types';
import { CreateTodoRecordDto } from './create-todo.dto';

export class UpdateTodoDto extends PartialType(CreateTodoRecordDto) {}
