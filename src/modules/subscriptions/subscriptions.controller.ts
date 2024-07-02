import { Controller, Post, Put, Delete, Param, Body, Res, HttpStatus, Inject, Get, UseGuards, Req } from '@nestjs/common';
import { SubscriptionsService } from '@modules/subscriptions/subscriptions.service';
import { CustomersStripeService } from '@providers/services/stripe/services/customers.stripe.service';
import { SubscriptionsStripeService } from '@providers/services/stripe/services/subscriptions.stripe.service';
import { CreateSubscriptionDto } from '@modules/subscriptions/dto/create-subscription.dto';
import { UpdateSubscriptionDto } from '@modules/subscriptions/dto/update-subscription.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import ResponsesHelper from '@helpers/responses.helpers';
import { Response } from 'express';
import { CustomersService } from "@modules/customers/customers.service";
import { UsersService } from '@modules/users/users.service';
import { PlansService } from '@modules/plans/plans.service';
import { AuthGuard } from '@guards/auth.guard';

@ApiTags('subscriptions')
@Controller('subscriptions')
export class SubscriptionsController {
  public responsesHelper: ResponsesHelper;

  constructor(
    private readonly subscriptionsService: SubscriptionsService,
    @Inject(CustomersStripeService) private readonly stripeCustomersService: CustomersStripeService,
    @Inject(CustomersService) private readonly customersService: CustomersService,
    @Inject(UsersService) private readonly usersService: UsersService,
    @Inject(PlansService) private readonly plansService: PlansService,
    @Inject(SubscriptionsStripeService) private readonly stripeSubscriptionsService: SubscriptionsStripeService,
  ) {
    this.responsesHelper = new ResponsesHelper();
  }

  @ApiOperation({ summary: 'Create a new subscription' })
  @ApiResponse({ status: 201, description: 'The subscription has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBearerAuth()
  @Post()
  async create(@Body() createSubscriptionDto: CreateSubscriptionDto, @Res() res: Response) {
    try {
      const getCustomer = await this.customersService.findOne(createSubscriptionDto.customer.toString());
      const isFindUsers = await this.usersService.findOne(getCustomer.user._id?.toString());
      const isFindPlan = await this.plansService.findOne(createSubscriptionDto.plan.toString());

      const stripeSubscription = await this.stripeSubscriptionsService.createSubscription({
        customer: getCustomer.stripeCustomerId,
        items: [{ plan: isFindPlan.stripePlanId }],
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });

      const createSubscription = await this.subscriptionsService.create({
        stripeCustomerId: getCustomer.stripeCustomerId,
        stripeSubscriptionId: stripeSubscription.id,
        ...createSubscriptionDto
      });

      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.CREATED,
        subject: "subscriptions",
        data: {
          subscription: createSubscription,
          stripeCustomer: getCustomer,
          stripeSubscription: stripeSubscription
        }
      });

    } catch (error) {
      console.error("SubscriptionsController > create : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "subscriptions",
        data: error.message
      });
    }
  }

  @ApiOperation({ summary: 'Get all subscriptions' })
  @ApiResponse({ status: 200, description: 'Return all subscriptions.' })
  @ApiResponse({ status: 404, description: 'Subscriptions not found.' })
  @ApiBearerAuth()
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const subscriptions = await this.subscriptionsService.findAll();

      if (!subscriptions || subscriptions.length === 0) {
        return this.responsesHelper.getResponse({
          res,
          path: "findAll",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "subscriptions",
          data: "Subscriptions not found"
        });
      }

      return this.responsesHelper.getResponse({
        res,
        path: "findAll",
        method: "Get",
        code: HttpStatus.OK,
        subject: "subscriptions",
        data: subscriptions
      });
    } catch (error) {
      console.error("SubscriptionsController > findAll : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "findAll",
        method: "Get",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "subscriptions",
        data: error.message
      });
    }
  }

  @ApiOperation({ summary: 'Get a subscription by id' })
  @ApiResponse({ status: 200, description: 'Return a subscription.' })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  @ApiBearerAuth()
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const subscription = await this.subscriptionsService.findOne(id);

      if (!subscription) {
        return this.responsesHelper.getResponse({
          res,
          path: "findOne",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "subscriptions",
          data: "Subscription not found"
        });
      }

      return this.responsesHelper.getResponse({
        res,
        path: "findOne",
        method: "Get",
        code: HttpStatus.OK,
        subject: "subscriptions",
        data: subscription
      });
    } catch (error) {
      console.error("SubscriptionsController > findOne : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "findOne",
        method: "Get",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "subscriptions",
        data: error.message
      });
    }
  }

  @ApiOperation({ summary: 'Update a subscription by id' })
  @ApiResponse({ status: 200, description: 'The subscription has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  @ApiBearerAuth()
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto, @Res() res: Response) {
    try {
      const subscription = await this.subscriptionsService.findOne(id);

      if (updateSubscriptionDto.customer) {
        await this.stripeCustomersService.updateCustomer(subscription.stripeCustomerId, updateSubscriptionDto.customer);
      }

      const updateSubscription = await this.subscriptionsService.update(id, updateSubscriptionDto);

      return this.responsesHelper.getResponse({
        res,
        path: "update",
        method: "Put",
        code: HttpStatus.OK,
        subject: "subscriptions",
        data: {
          subscription: updateSubscription
        }
      });

    } catch (error) {
      console.error("SubscriptionsController > update : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "update",
        method: "Put",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "subscriptions",
        data: error.message
      });
    }
  }

  @ApiOperation({ summary: 'Delete a subscription by id' })
  @ApiResponse({ status: 200, description: 'The subscription has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const subscription = await this.subscriptionsService.findOne(id);

      await this.stripeSubscriptionsService.cancelSubscription(subscription.stripeSubscriptionId);
      await this.stripeCustomersService.deleteCustomer(subscription.stripeCustomerId);

      const deleteSubscription = await this.subscriptionsService.remove(id);

      return this.responsesHelper.getResponse({
        res,
        path: "delete",
        method: "Delete",
        code: HttpStatus.OK,
        subject: "subscriptions",
        data: {
          subscription: deleteSubscription
        }
      });

    } catch (error) {
      console.error("SubscriptionsController > delete : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "delete",
        method: "Delete",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "subscriptions",
        data: error.message
      });
    }
  }

  @ApiOperation({ summary: 'Get the subscription of the current user' })
  @ApiResponse({ status: 200, description: 'Return the subscription of the current user.' })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  @UseGuards(AuthGuard)
  @Get("me")
  async findMySubscription(@Res() res: Response, @Req() req: Request) {
    const customer = req['customer'];
 
    try {
      const data = await this.subscriptionsService.findWhere({where: {customer: customer._id.toString() }});
      if (!data || data.length === 0) {
        throw new Error("Not Found");
      }
      return this.responsesHelper.getResponse({
        res,
        path: "findMySubscription",
        method: "Get",
        code: HttpStatus.OK,
        subject: "subscriptions",
        data: data[0],
      });
    } catch (error) {
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "findMySubscription",
          method: "Get",
          code: HttpStatus.NOT_FOUND,
          subject: "subscriptions",
          data: error.message,
        });
      } else {
        console.error("AppController > findMySubscription : ", error);
        return this.responsesHelper.getResponse({
          res,
          path: "findMySubscription",
          method: "Get",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "subscriptions",
          data: error.message,
        });
      }
    }
  }

  @ApiOperation({ summary: 'Cancel a subscription by id' })
  @ApiResponse({ status: 200, description: 'The subscription has been successfully canceled.' })
  @ApiResponse({ status: 404, description: 'Subscription not found.' })
  @Delete('cancel-subscription/:subscriptionId')
  async cancelSubscription(@Param('subscriptionId') subscriptionId: string, @Res() res: any) {
    try {
      const cancelSubscription = await this.stripeSubscriptionsService.cancelSubscription(subscriptionId);

      return this.responsesHelper.getResponse({
        res,
        path: "cancelSubscription",
        method: "Delete",
        code: HttpStatus.OK,
        subject: "subscriptions",
        data: cancelSubscription,
      });
      
    } catch (error) {
      console.error("AppController > cancelSubscription : ", error);
      if (error.message === "Not Found") {
        return this.responsesHelper.getResponse({
          res,
          path: "cancelSubscription",
          method: "Delete",
          code: HttpStatus.NOT_FOUND,
          subject: "subscriptions",
          data: error.message,
        });
      } else {
        return this.responsesHelper.getResponse({
          res,
          path: "cancelSubscription",
          method: "Delete",
          code: HttpStatus.INTERNAL_SERVER_ERROR,
          subject: "subscriptions",
          data: error.message,
        });
      }
    }
  }
}
