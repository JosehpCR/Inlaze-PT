import { IsUUID, IsString, IsNotEmpty, IsISO8601 } from 'class-validator';

export class CreateTaskHttpDto {
  @IsUUID() projectId: string;
  @IsString() @IsNotEmpty() title: string;
  @IsString() description: string;
  @IsISO8601() dueDate: string;
}
