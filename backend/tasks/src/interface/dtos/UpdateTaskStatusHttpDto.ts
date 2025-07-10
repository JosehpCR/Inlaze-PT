import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateTaskStatusHttpDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
