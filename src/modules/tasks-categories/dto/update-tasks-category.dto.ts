import { PartialType } from '@nestjs/swagger';
import { CreateTasksCategoryDto } from './create-tasks-category.dto';

export class UpdateTasksCategoryDto extends PartialType(CreateTasksCategoryDto) {}
