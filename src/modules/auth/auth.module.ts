import { Module } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { UsersService } from '@modules/users/users.service';
import { TeamService } from '@modules/team/team.service';
import { UserDocument } from '@modules/users/entities/user.entity';
import { AuthController } from '@modules/auth/auth.controller';
import { UsersModule } from '@modules/users/users.module';
import { TeamModule } from '@modules/team/team.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@modules/auth/guard/auth.guard'
import { APP_GUARD } from '@nestjs/core';
import { User, UserSchema } from '@modules/users/entities/user.entity';
// import { Team, TeamSchema } from '@modules/team/entities/team.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UsersModule,
    TeamModule,
    // JwtModule.register({
    //   global: true,
    //   secret: process.env.JWT_SECRET,
    //   signOptions: { expiresIn: '60s' },
    // }),
    // MongooseModule.forFeature([{ name: Team.name, schema: TeamSchema }]),
MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    UsersService,
    TeamService,
  ],
})
export class AuthModule {}

