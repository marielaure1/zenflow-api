import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubscriptionsService } from '@modules/subscriptions/subscriptions.service';
import { CreateSubscriptionDto } from '@modules/subscriptions/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '@modules/subscriptions/dto/update-subscription.dto';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscribesService: SubscriptionsService) {}

  @Post()
  create(@Body() createSubscribeDto: CreateSubscriptionDto) {
    return this.subscribesService.create(createSubscribeDto);
  }

  @Get()
  findAll() {
    return this.subscribesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscribesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscribeDto: UpdateSubscriptionDto) {
    return this.subscribesService.update(+id, updateSubscribeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscribesService.remove(+id);
  }
}
