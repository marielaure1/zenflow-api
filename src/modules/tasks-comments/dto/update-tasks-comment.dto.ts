import { PartialType } from '@nestjs/swagger';
import { CreateTaskCommentDto } from '@modules/tasks-comments/dto/create-tasks-comment.dto';

export class UpdateTaskCommentDto extends PartialType(CreateTaskCommentDto) {}
