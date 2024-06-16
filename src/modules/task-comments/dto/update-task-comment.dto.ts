import { PartialType } from '@nestjs/swagger';
import { CreateTaskCommentDto } from '@modules/task-comments/dto/create-task-comment.dto';

export class UpdateTaskCommentDto extends PartialType(CreateTaskCommentDto) {}
