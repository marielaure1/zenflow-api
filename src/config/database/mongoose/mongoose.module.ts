import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from '@modules/users/entities/user.entity';
import { Customer, CustomerSchema } from '@modules/customers/entities/customer.entity';
import { Plan, PlanSchema } from '@modules/plans/entities/plan.entity';
import { Subscription, SubscriptionSchema } from '@modules/subscriptions/entities/subscription.entity';
import settings from '@/common/constants/settings';
import { Payment, PaymentSchema } from '@modules/payments/entities/payment.entity';
import { Task, TaskSchema } from '@modules/tasks/entities/task.entity';
import { TaskComment, TaskCommentSchema } from '@modules/tasks-comments/entities/tasks-comment.entity';
import { TaskCategory, TaskCategorySchema } from '@modules/tasks-categories/entities/tasks-category.entity';
import { Project, ProjectSchema } from '@modules/projects/entities/project.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(settings.MONGODB_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Customer.name, schema: CustomerSchema },
      { name: Plan.name, schema: PlanSchema },
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: Payment.name, schema: PaymentSchema },
      { name: Project.name, schema: ProjectSchema },
      { name: Task.name, schema: TaskSchema },
      { name: TaskComment.name, schema: TaskCommentSchema },
      { name: TaskCategory.name, schema: TaskCategorySchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

