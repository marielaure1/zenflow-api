import { SupabaseModule } from '@providers/services/supabase/supabase.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { AuthMiddleware } from '@middleware/auth/auth.middleware';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomersModule } from '@modules/customers/customers.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [SupabaseModule, UsersModule, CustomersModule],
  controllers: [NotesController],
  providers: [NotesService, SupabaseService, UsersService, CustomersService],
  exports: [NotesModule]
})
export class NotesModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(NotesController);
  }
}
