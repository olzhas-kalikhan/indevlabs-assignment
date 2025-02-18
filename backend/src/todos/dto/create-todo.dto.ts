import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoRecordDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  completed: boolean;
  created_at: string;
  modified_at: string;
}
