import { Module } from '@nestjs/common';
import { User, UserSchema } from '@modules/users/entities/user.entity';
import { UsersService } from '@modules/users/users.service';
import { UsersController } from '@modules/users/users.controller';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
