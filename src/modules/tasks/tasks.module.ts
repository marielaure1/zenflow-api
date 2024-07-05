import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { AuthMiddleware } from '@middleware/auth/auth.middleware';
import { SupabaseModule } from '@providers/services/supabase/supabase.module';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';

@Module({
  imports: [SupabaseModule],
  controllers: [TasksController],
  providers: [TasksService, SupabaseService, UsersService, CustomersService],
  exports: [TasksModule]
})
export class TasksModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(TasksController);
  }
}
