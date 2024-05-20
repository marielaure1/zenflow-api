import { Controller, Get, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { PlansStripeService } from '@providers/services/stripe/plans/plans.stripe.service';
import { PlansService } from '@modules/plans/plans.service';
import { CreatePlanDto } from '@modules/plans/dto/create-plan.dto';
import { Plan } from '@modules/plans/entities/plan.entity';
import { AppController } from '@modules/app.controller';
import { ApiTags } from '@nestjs/swagger';
import ResponsesHelper from "@helpers/responses.helpers";
import { Response } from 'express';

@ApiTags('plans')
@Controller('plans')
export class PlansController extends AppController<PlansService, Plan, CreatePlanDto, CreatePlanDto>{
  public responsesHelper: ResponsesHelper;
  
  constructor(
      private readonly plansService: PlansService,
      private readonly plansStripeService: PlansStripeService
  ) {
    super(plansService, "plans");
    this.responsesHelper = new ResponsesHelper();
  }

  @Post()
  async creates(@Body() createPlanDto: CreatePlanDto, @Res() res: Response) {
    try {
      const createPlanStripes = this.plansStripeService.create(createPlanDto);
      // const createPlan = this.plansService.create(createPlanDto);

      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.CREATED,
        subject: "plans",
        data: {
          // plan: createPlan,
          stripe: createPlanStripes
        }
      });

    } catch (error) {
      console.error("PlansController > create : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.INTERNAL_SERVER_ERROR, 
        subject: "plans",
        data: error.message
      });
    }
  }

  @Get()
  async findAlls(@Res() res: Response) {
    try {
      const dataStripe = this.plansStripeService.findAll();
      // const data = this.plansService.findAll();

      return this.responsesHelper.getResponse({
        res,
        path: "findAll",
        method: "Get",
        code: HttpStatus.OK,
        subject: "plans",
        data: {
          // plan: data,
          stripe: dataStripe
        }
      });

    } catch (error) {
      console.error("PlansController > findAll : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "findAll",
        method: "Get",
        code: HttpStatus.INTERNAL_SERVER_ERROR, 
        subject: "plans",
        data: error.message
      });
    }
  }
}
