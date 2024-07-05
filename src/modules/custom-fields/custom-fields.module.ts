import { MiddlewareConsumer, Module } from '@nestjs/common';
import { CustomFieldsService } from './custom-fields.service';
import { CustomFieldsController } from './custom-fields.controller';
import { UsersModule } from '@modules/users/users.module';
import { CustomersModule } from '@modules/customers/customers.module';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';
import { AuthMiddleware } from '@middleware/auth/auth.middleware';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { SupabaseModule } from '@providers/services/supabase/supabase.module';

@Module({
  imports: [UsersModule, CustomersModule, SupabaseModule],
  controllers: [CustomFieldsController],
  providers: [CustomFieldsService, UsersService, CustomersService, SupabaseService],
  exports: [CustomFieldsModule]
})
export class CustomFieldsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(CustomFieldsController);
  }
}
