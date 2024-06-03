import { Module } from '@nestjs/common';
import { AppController } from '@modules/app.controller';
import { AppService } from '@modules/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from '@config/database/mongoose/mongoose.module';
import { StripeModule } from '@providers/services/stripe/stripe.module';

import { ProjectsModule } from '@modules/projects/projects.module';
// import { TeamModule } from '@modules/team/team.module';
import { UsersModule } from '@modules/users/users.module';
import { CustomersModule } from '@modules/customers/customers.module';
import { ClientsModule } from '@modules/clients/clients.module';
import { PlansModule } from '@modules/plans/plans.module';
import { TasksModule } from '@modules/tasks/tasks.module';
import { TasksCommentsModule } from '@modules/tasks-comments/tasks-comments.module';
import { TasksCategoriesModule } from '@modules/tasks-categories/tasks-categories.module';
import { AuthModule } from '@modules/auth/auth.module';
import { SubscriptionsModule } from '@modules/subscriptions/subscriptions.module';
import settings from "@constants/settings";
import { FirebaseModule } from '@providers/services/firebase/firebase.module';
import { PaymentsModule } from '@modules/payments/payments.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    FirebaseModule.forRootAsync(),
    DatabaseModule,
    StripeModule,
    ProjectsModule,
    TasksModule,
    TasksCategoriesModule,
    TasksCommentsModule,
    // TeamModule,
    PlansModule,
    UsersModule,
    CustomersModule,
    SubscriptionsModule,
    // ClientsModule,
    AuthModule,
    PaymentsModule
  ],
  controllers: [],
  providers: [],
  exports: [AppModule]
})
export class AppModule {}
