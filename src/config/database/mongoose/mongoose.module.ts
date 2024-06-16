// CONFIGS
import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import settings from '@/common/constants/settings';

// MODULES
// import { Chat, ChatSchema } from '@modules/chats/entities/chat.entity';
import { Client, ClientSchema } from '@modules/clients/entities/client.entity';
import { CustomField, CustomFieldSchema } from '@modules/custom-fields/entities/custom-field.entity';
import { Customer, CustomerSchema } from '@modules/customers/entities/customer.entity';
// import { Forum, ForumSchema } from '@modules/forums/entities/forum.entity';
// import { Log, LogSchema } from '@modules/logs/entities/log.entity';
// import { Member, MemberSchema } from '@modules/members/entities/member.entity';
// import { Message, MessageSchema } from '@modules/messages/entities/message.entity';
// import { NoteFolder, NoteFolderSchema } from '@modules/note-folders/entities/note-folder.entity';
// import { Notes, NotesSchema } from '@modules/notes/entities/note.entity';
// import { NoteTag, NoteTagSchema } from '@modules/note-tags/entities/note-tag.entity';
// import { Notification, NotificationSchema } from '@modules/notifications/entities/notification.entity';
import { Payment, PaymentSchema } from '@modules/payments/entities/payment.entity';
// import { Permission, PermissionSchema } from '@modules/permissions/entities/permission.entity';
// import { PermissionCategorie, PermissionCategorieSchema } from '@modules/permission-categories/entities/permission-categorie.entity';
// import { PermissionUser, PermissionUserSchema } from '@modules/permission-users/entities/permission-user.entity';
// import { PlanningEvent, PlanningEventSchema } from '@modules/planning-events/entities/planning-event.entity';
import { Plan, PlanSchema } from '@modules/plans/entities/plan.entity';
// import { Post, PostSchema } from '@modules/posts/entities/post.entity';
import { Project, ProjectSchema } from '@modules/projects/entities/project.entity';
// import { Prospect, ProspectSchema } from '@modules/prospects/entities/prospect.entity';
// import { Resource, ResourceSchema } from '@modules/resources/entities/resource.entity';
// import { Setting, SettingSchema } from '@modules/settings/entities/setting.entity';
import { Subscription, SubscriptionSchema } from '@modules/subscriptions/entities/subscription.entity';
import { Task, TaskSchema } from '@modules/tasks/entities/task.entity';
import { TaskCategorie, TaskCategorieSchema } from '@modules/task-categories/entities/task-categorie.entity';
import { TaskComment, TaskCommentSchema } from '@modules/task-comments/entities/task-comment.entity';
// import { Team, TeamSchema } from '@modules/teams/entities/team.entity';
// import { Thread, ThreadSchema } from '@modules/threads/entities/thread.entity';
import { User, UserSchema } from '@modules/users/entities/user.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(settings.MONGODB_URL),
    MongooseModule.forFeature([
      // { name: Chat.name, schema: ChatSchema },
      { name: Client.name, schema: ClientSchema },
      { name: CustomField.name, schema: CustomFieldSchema },
      { name: Customer.name, schema: CustomerSchema },
      // { name: Forum.name, schema: ForumSchema },
      // { name: Log.name, schema: LogSchema },
      // { name: Member.name, schema: MemberSchema },
      // { name: Message.name, schema: MessageSchema },
      // { name: NoteFolder.name, schema: NoteFolderSchema },
      // { name: Note.name, schema: NoteSchema },
      // { name: NoteTag.name, schema: NoteTagSchema },
      // { name: Notification.name, schema: NotificationSchema },
      { name: Payment.name, schema: PaymentSchema },
      // { name: Permission.name, schema: PermissionSchema },
      // { name: PermissionCategorie.name, schema: PermissionCategorieSchema },
      // { name: PermissionUser.name, schema: PermissionUserSchema },
      // { name: PlanningEvent.name, schema: PlanningEventSchema },
      { name: Plan.name, schema: PlanSchema },
      // { name: Post.name, schema: PostSchema },
      { name: Project.name, schema: ProjectSchema },
      // { name: Prospect.name, schema: ProspectSchema },
      // { name: Resource.name, schema: ResourceSchema },
      // { name: Setting.name, schema: SettingSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Task.name, schema: TaskSchema },
      { name: TaskCategorie.name, schema: TaskCategorieSchema },
      { name: TaskComment.name, schema: TaskCommentSchema },
      // { name: Team.name, schema: TeamSchema },
      // { name: Thread.name, schema: ThreadSchema },
      { name: User.name, schema: UserSchema },
      
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

