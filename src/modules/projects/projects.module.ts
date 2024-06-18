import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { TasksModule } from '@modules/tasks/tasks.module';
import { TasksService } from '@modules/tasks/tasks.service';
import { TaskCategoriesModule } from '@modules/task-categories/task-categories.module';
import { TaskCategoriesService } from '@modules/task-categories/task-categories.service';
import { UsersModule } from '@modules/users/users.module';
import { CustomersModule } from '@modules/customers/customers.module';
import { CustomFieldsModule } from '@modules/custom-fields/custom-fields.module';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomFieldsService } from '@modules/custom-fields/custom-fields.service';
@Module({
  imports: [TasksModule, TaskCategoriesModule, UsersModule, CustomersModule, CustomFieldsModule],
  controllers: [ProjectsController],
  providers: [ProjectsService, TasksService, TaskCategoriesService, UsersService, CustomersService, CustomFieldsService],
  exports: [ProjectsModule],
})
export class ProjectsModule {}
