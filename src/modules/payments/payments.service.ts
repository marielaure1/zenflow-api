import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Module, Injectable} from '@nestjs/common';
import { PaymentsStripeService } from '@providers/services/stripe/services/payments.stripe.service';
import { CreatePaymentDto } from '@modules/payments/dto/create-payment.dto';
import { UpdatePaymentDto } from '@modules/payments/dto/update-payment.dto';
import { Payment, PaymentDocument } from '@modules/payments/entities/payment.entity';
import { AppService } from '@modules/app.service';
import settings from '@constants/settings';
@Injectable()
export class PaymentsService extends AppService<PaymentDocument, CreatePaymentDto, UpdatePaymentDto>{

  constructor(
    @InjectModel(Payment.name) private paymentsModel: Model<PaymentDocument>
  ) {
    super(paymentsModel);
  }
  

}
