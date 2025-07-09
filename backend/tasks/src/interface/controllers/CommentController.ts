import { Controller, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { AddCommentUseCase } from '../../application/use-cases/AddCommentUseCase';
import { JwtAuthGuard } from '../../infrastructure/guards/JwtAuthGuard';
import { AddCommentHttpDto } from '../dtos/AddCommentHttpDto';

@Controller('api/v1/tasks/:taskId/comments')
@UseGuards(JwtAuthGuard)
export class CommentController {
  constructor(private readonly addComment: AddCommentUseCase) {}

  @Post()
  add(@Param('taskId') taskId: string, @Body() dto: AddCommentHttpDto, @Req() req) {
    return this.addComment.execute({
      taskId,
      authorId: req.user?.userId || dto['authorId'] || 'anonymous',
      content: dto.content,
    });
  }
}
