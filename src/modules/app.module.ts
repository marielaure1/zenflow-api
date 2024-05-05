import { Module } from '@nestjs/common';
import { AppController } from '@modules/app.controller';
import { AppService } from '@modules/app.service';
import { UsersModule } from '@modules/users/users.module';
import { ClientsModule } from './clients/clients.module';
import { TeamModule } from './team/team.module';

@Module({
  imports: [UsersModule, ClientsModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
