import { IsUUID } from 'class-validator';

export class AssignTaskHttpDto {
  @IsUUID()
  userId: string;
}
