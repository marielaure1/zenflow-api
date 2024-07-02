// CONFIGS
import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from '@modules/app.controller';
import { AppService } from '@modules/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@config/database/mongoose/mongoose.module';
import { StripeModule } from '@providers/services/stripe/stripe.module';
import settings from "@constants/settings";

// MODULES
import { ClientsModule } from '@modules/clients/clients.module';
import { CustomFieldsModule } from '@modules/custom-fields/custom-fields.module';
import { CustomersModule } from '@modules/customers/customers.module';
import { NotesModule } from '@modules/notes/notes.module';
// import { NotificationsModule } from '@modules/notifications/notifications.module';
import { PaymentsModule } from '@modules/payments/payments.module';
import { PlansModule } from '@modules/plans/plans.module';
import { ProjectsModule } from '@modules/projects/projects.module';
import { ProspectsModule } from '@modules/prospects/prospects.module';
import { SubscriptionsModule } from '@modules/subscriptions/subscriptions.module';
import { TasksModule } from '@modules/tasks/tasks.module';
import { TaskCategoriesModule } from '@modules/task-categories/task-categories.module';
import { UsersModule } from '@modules/users/users.module';
import { SupabaseModule } from '@providers/services/supabase/supabase.module';
import { AuthMiddleware } from '@middleware/auth/auth.middleware';
import { CustomersController } from './customers/customers.controller';
import { ClientsController } from './clients/clients.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    DatabaseModule,
    StripeModule,
    ClientsModule,
    CustomFieldsModule,
    CustomersModule,
    NotesModule,
    // NotificationsModule,
    PaymentsModule,
    PlansModule,
    ProjectsModule,
    ProspectsModule,
    SubscriptionsModule,
    TasksModule,
    TaskCategoriesModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
  exports: [AppModule]
})
export class AppModule {
 
}
