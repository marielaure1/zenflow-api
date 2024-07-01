import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ProspectsService } from './prospects.service';
import { ProspectsController } from './prospects.controller';
import { UsersModule } from '@modules/users/users.module';
import { CustomersModule } from '@modules/customers/customers.module';
import { CustomFieldsModule } from '@modules/custom-fields/custom-fields.module';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomFieldsService } from '@modules/custom-fields/custom-fields.service';
import { AuthMiddleware } from '@middleware/auth/auth.middleware';
import { ClientsController } from '@modules/clients/clients.controller';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { SupabaseModule } from '@providers/services/supabase/supabase.module';

@Module({
  imports: [UsersModule, CustomersModule, CustomFieldsModule, SupabaseModule],
  controllers: [ProspectsController],
  providers: [ProspectsService, UsersService, CustomersService, CustomFieldsService, SupabaseService],
  exports: [ProspectsModule]
})
export class ProspectsModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(ProspectsController);
  }
}
