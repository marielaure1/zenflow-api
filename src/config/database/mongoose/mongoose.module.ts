// CONFIGS
import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import settings from '@/common/constants/settings';

// MODULES
import { Client, ClientSchema } from '@modules/clients/entities/client.entity';
import { CustomField, CustomFieldSchema } from '@modules/custom-fields/entities/custom-field.entity';
import { Customer, CustomerSchema } from '@modules/customers/entities/customer.entity';
import { Note, NoteSchema } from '@modules/notes/entities/note.entity';
import { NoteFolder, NoteFolderSchema } from '@modules/note-folders/entities/note-folder.entity';
// import { Notification, NotificationSchema } from '@modules/notifications/entities/notification.entity';
import { Payment, PaymentSchema } from '@modules/payments/entities/payment.entity';
import { Plan, PlanSchema } from '@modules/plans/entities/plan.entity';
import { Project, ProjectSchema } from '@modules/projects/entities/project.entity';
import { Prospect, ProspectSchema } from '@modules/prospects/entities/prospect.entity';
import { Subscription, SubscriptionSchema } from '@modules/subscriptions/entities/subscription.entity';
import { Task, TaskSchema } from '@modules/tasks/entities/task.entity';
import { TaskCategorie, TaskCategorieSchema } from '@modules/task-categories/entities/task-categorie.entity';
import { User, UserSchema } from '@modules/users/entities/user.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(settings.MONGODB_URL),
    MongooseModule.forFeature([
      { name: Client.name, schema: ClientSchema },
      { name: CustomField.name, schema: CustomFieldSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Note.name, schema: NoteSchema },
      { name: NoteFolder.name, schema: NoteFolderSchema },
      // { name: Notification.name, schema: NotificationSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Prospect.name, schema: ProspectSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Task.name, schema: TaskSchema },
      { name: TaskCategorie.name, schema: TaskCategorieSchema },
      { name: User.name, schema: UserSchema },
      
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

