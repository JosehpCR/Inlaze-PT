import { IsString, IsNotEmpty } from 'class-validator';

export class CreateProjectHttpDto {
  @IsString() @IsNotEmpty()
  name: string;

  @IsString() @IsNotEmpty()
  description: string;
}
