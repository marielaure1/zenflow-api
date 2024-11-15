import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Res, Req, HttpStatus } from '@nestjs/common';
import { PaymentsService } from '@modules/payments/payments.service';
import { CreatePaymentDto } from '@modules/payments/dto/create-payment.dto';
import { UpdatePaymentDto } from '@modules/payments/dto/update-payment.dto';
import { Payment, PaymentDocument } from '@modules/payments/entities/payment.entity';
import { AppController } from '@modules/app.controller';
import { ApiTags } from '@nestjs/swagger';
import ResponsesHelper from "@helpers/responses.helpers";
import { Response } from 'express';
import { PaymentsStripeService } from '@providers/services/stripe/services/payments.stripe.service';
import settings from '@constants/settings';
import { log } from 'console';
import {CreateCheckoutSessionDto} from "@modules/payments/dto/create-checkout-session.dto"
import { WebhookStripeService } from '@providers/services/stripe/services/webhook.stripe.service';


@ApiTags('payments')
@Controller('payments')
export class PaymentsController extends AppController<PaymentDocument, CreatePaymentDto, CreatePaymentDto>{
  public responsesHelper: ResponsesHelper;
  
  constructor(
      private readonly paymentsService: PaymentsService,
      private readonly webhookStripeService: WebhookStripeService,
      @Inject(PaymentsStripeService) private readonly paymentsStripeService: PaymentsStripeService,
  ) {
    super(paymentsService, "payments");
    this.responsesHelper = new ResponsesHelper();
  }

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() createCheckoutSessionDto: CreateCheckoutSessionDto, @Res() res: Response, @Req() req: Request) {
    const test = createCheckoutSessionDto;
    const createEphemeralKey = await this.paymentsStripeService.createEphemeralKey(test.customerId)
    const paymentIntent = await this.paymentsStripeService.createPaymentIntent({
      amount: test.amount,
      currency: test.currency,
      customer: test.customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return this.responsesHelper.getResponse({
      res,
      path: "createCheckoutSession",
      method: "Post",
      code: HttpStatus.CREATED,
      subject: "payment",
      data: {
        paymentIntent: paymentIntent.client_secret,
      ephemeralKey: createEphemeralKey.secret,
      customer: test.customerId
      }
    });
  }

  // @Post()
  // async handleWebhook(@Body() event: any, @Res() res: Response) {
  //   try {
  //     const handledEvent = await this.webhookStripeService.handleEvent(event);
  //     res.status(HttpStatus.OK).send({ received: true, handledEvent });
  //   } catch (error) {
  //     res.status(HttpStatus.BAD_REQUEST).send({ error: error.message });
  //   }
  // }
}
