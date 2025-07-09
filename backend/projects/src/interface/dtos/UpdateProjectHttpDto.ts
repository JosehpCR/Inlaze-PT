import { IsString, IsOptional } from 'class-validator';

export class UpdateProjectHttpDto {
  @IsString()
  id: string;

  @IsString() @IsOptional()
  name?: string;

  @IsString() @IsOptional()
  description?: string;
}
