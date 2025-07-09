import { IsString, IsNotEmpty } from 'class-validator';

export class AddCommentHttpDto {
  @IsString()
  @IsNotEmpty()
  content: string;
}
