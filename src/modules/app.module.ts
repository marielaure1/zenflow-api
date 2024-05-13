import { Module } from '@nestjs/common';
import { AppController } from '@modules/app.controller';
import { AppService } from '@modules/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
// import { ProjectsModule } from '@modules/projects/projects.module';
import { TeamModule } from '@modules/team/team.module';
import { UsersModule } from '@modules/users/users.module';
import { ClientsModule } from '@modules/clients/clients.module';
import { AuthModule } from '@modules/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.dev',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    // ProjectsModule,
    TeamModule,
    UsersModule,
    ClientsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
  exports: [AppModule]
})
export class AppModule {}
