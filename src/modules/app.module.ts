// CONFIGS
import { Module } from '@nestjs/common';
import { AppController } from '@modules/app.controller';
import { AppService } from '@modules/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@config/database/mongoose/mongoose.module';
import { StripeModule } from '@providers/services/stripe/stripe.module';
import { FirebaseModule } from '@providers/services/firebase/firebase.module';
import settings from "@constants/settings";

// MODULES
import { AuthModule } from '@modules/auth/auth.module';
// import { ChatsModule } from '@modules/chats/chats.module';
import { ClientsModule } from '@modules/clients/clients.module';
import { CustomFieldsModule } from '@modules/custom-fields/custom-fields.module';
import { CustomersModule } from '@modules/customers/customers.module';
// import { ForumsModule } from '@modules/forums/forums.module';
// import { LogsModule } from '@modules/logs/logs.module';
// import { MemberModule } from '@modules/members/members.module';
// import { MessageModule } from '@modules/messages/messages.module';
// import { NoteFoldersModule } from '@modules/note-folders/note-folders.module';
// import { NotesModule } from '@modules/notes/notes.module';
// import { NoteTagsModule } from '@modules/note-tags/note-tags.module';
// import { NotificationsModule } from '@modules/notifications/notifications.module';
import { PaymentsModule } from '@modules/payments/payments.module';
// import { PermissionsModule } from '@modules/permissions/permissions.module';
// import { PermissionCategoriesModule } from '@modules/permission-categories/permission-categories.module';
// import { PermissionUsersModule } from '@modules/permission-users/permission-users.module';
// import { PlanningEventsModule } from '@modules/planning-events/planning-events.module';
import { PlansModule } from '@modules/plans/plans.module';
// import { PostsModule } from '@modules/posts/posts.module';
import { ProjectsModule } from '@modules/projects/projects.module';
import { ProspectsModule } from '@modules/prospects/prospects.module';
// import { ResourcesModule } from '@modules/resources/resources.module';
// import { SettingsModule } from '@modules/settings/settings.module';
import { SubscriptionsModule } from '@modules/subscriptions/subscriptions.module';
import { TasksModule } from '@modules/tasks/tasks.module';
import { TaskCategoriesModule } from '@modules/task-categories/task-categories.module';
import { TaskCommentsModule } from '@modules/task-comments/task-comments.module';
// import { TeamsModule } from '@modules/teams/teams.module';
// import { ThreadsModule } from '@modules/threads/threads.module';
import { UsersModule } from '@modules/users/users.module';
import { SupabaseModule } from '@providers/services/supabase/supabase.module';





@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env'
    }),
    FirebaseModule.forRootAsync(),
    DatabaseModule,
    SupabaseModule,
    StripeModule,
    AuthModule,
    // ChatsModule,
    ClientsModule,
    CustomFieldsModule,
    CustomersModule,
    // ForumsModule,
    // LogsModule,
    // MemberModule,
    // MessageModule,
    // NoteFoldersModule,
    // NotesModule,
    // NoteTagsModule,
    // NotificationsModule,
    PaymentsModule,
    // PermissionsModule,
    // PermissionCategoriesModule,
    // PermissionUsersModule,
    // PlanningEventsModule,
    PlansModule,
    // PostsModule,
    ProjectsModule,
    ProspectsModule,
    // ResourcesModule,
    // SettingsModule,
    SubscriptionsModule,
    TasksModule,
    TaskCategoriesModule,
    TaskCommentsModule,
    // TeamsModule,
    // ThreadsModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
  exports: [AppModule]
})
export class AppModule {}
