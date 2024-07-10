import { SupabaseModule } from '@providers/services/supabase/supabase.module';
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { NoteFoldersService } from '@modules/note-folders/note-folders.service';
import { NoteFoldersController } from '@modules/note-folders/note-folders.controller';
import { AuthMiddleware } from '@middleware/auth/auth.middleware';
import { SupabaseService } from '@providers/services/supabase/supabase.service';
import { UsersService } from '@modules/users/users.service';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomersModule } from '@modules/customers/customers.module';
import { UsersModule } from '@modules/users/users.module';

@Module({
  imports: [SupabaseModule, UsersModule, CustomersModule],
  controllers: [NoteFoldersController],
  providers: [NoteFoldersService, SupabaseService, UsersService, CustomersService],
  exports: [NoteFoldersModule]
})
export class NoteFoldersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(NoteFoldersController);
  }
}
