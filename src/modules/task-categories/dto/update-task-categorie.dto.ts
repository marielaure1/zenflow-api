import { PartialType } from '@nestjs/swagger';
import { CreateTaskCategorieDto } from '@modules/task-categories/dto/create-task-categorie.dto';

export class UpdateTaskCategorieDto extends PartialType(CreateTaskCategorieDto) {}
