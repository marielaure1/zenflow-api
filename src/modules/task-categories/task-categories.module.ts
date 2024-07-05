import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TaskCategoriesService } from '@modules/task-categories/task-categories.service';
import { TaskCategoriesController } from '@modules/task-categories/task-categories.controller';
import { TasksService } from '@modules/tasks/tasks.service';
import { TasksModule } from '@modules/tasks/tasks.module';
import { AuthMiddleware } from '@middleware/auth/auth.middleware';
import { SupabaseModule } from '@providers/services/supabase/supabase.module';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';

@Module({ 
  imports: [TasksModule, SupabaseModule],
  controllers: [TaskCategoriesController],
  providers: [TaskCategoriesService, TasksService, SupabaseService, UsersService, CustomersService],
  exports: [TaskCategoriesModule]
})
export class TaskCategoriesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TaskCategoriesController);
  }
}
