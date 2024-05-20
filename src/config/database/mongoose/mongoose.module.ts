import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User, UserSchema } from '@modules/users/entities/user.entity';
import { Customer, CustomerSchema } from '@modules/customers/entities/customer.entity';
import settings from '@/common/constants/settings';

@Global()
@Module({
  imports: [
    MongooseModule.forRoot(settings.MONGODB_URL),
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  exports: [MongooseModule],
})
export class DatabaseModule {}

