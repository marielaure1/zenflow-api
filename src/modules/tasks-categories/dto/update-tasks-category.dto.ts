import { PartialType } from '@nestjs/swagger';
import { CreateTaskCategoryDto } from './create-tasks-category.dto';

export class UpdateTaskCategoryDto extends PartialType(CreateTaskCategoryDto) {}
