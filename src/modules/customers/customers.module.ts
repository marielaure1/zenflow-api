import { Module } from '@nestjs/common';
import { CustomersService } from '@modules/customers/customers.service';
import { CustomersController } from '@modules/customers/customers.controller';
import { DatabaseModule } from '@config/database/mongoose/mongoose.module';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomersController],
  providers: [CustomersService],
  exports: [CustomersModule]
})
export class CustomersModule {}
