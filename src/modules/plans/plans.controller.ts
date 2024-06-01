import { Controller, Get, Post, Put, Delete, Param, Body, Res, HttpStatus, Inject } from '@nestjs/common';
import { PlansStripeService } from '@providers/services/stripe/services/plans.stripe.service';
import { PlansService } from '@modules/plans/plans.service';
import { CreatePlanDto } from '@modules/plans/dto/create-plan.dto';
import { UpdatePlanDto } from '@modules/plans/dto/update-plan.dto';
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
      @Inject(PlansStripeService) private readonly plansStripeService: PlansStripeService,
  ) {
    super(plansService, "plans");
    this.responsesHelper = new ResponsesHelper();
  }

  @Post()
  async creates(@Body() createPlanDto: CreatePlanDto, @Res() res: Response) {
    try {
      const createPlanStripes = await this.plansStripeService.create(createPlanDto);
      const createPlan = await this.plansService.create({stripePlanId: createPlanStripes.id, ...createPlanDto});

      return this.responsesHelper.getResponse({
        res,
        path: "create",
        method: "Post",
        code: HttpStatus.CREATED,
        subject: "plans",
        data: {
          plan: createPlan,
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

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto, @Res() res: Response) {
    try {
      const isFind = await this.plansService.findOne(id);
      const updatePlanStripes = await this.plansStripeService.update(isFind.stripePlanId, updatePlanDto);
      const updatePlan = await this.plansService.update(id, {stripePlanId: updatePlanStripes.id, ...updatePlanDto});

      return this.responsesHelper.getResponse({
        res,
        path: "update",
        method: "Put",
        code: HttpStatus.OK,
        subject: "plans",
        data: {
          plan: updatePlan,
          stripe: updatePlanStripes
        }
      });

    } catch (error) {
      console.error("PlansController > update : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "update",
        method: "Put",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "plans",
        data: error.message
      });
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Res() res: Response) {
    try {
      const isFind = await this.plansService.findOne(id);
      const deletePlanStripes = await this.plansStripeService.delete(isFind.stripePlanId);
      const deletePlan = await this.plansService.remove(id);

      return this.responsesHelper.getResponse({
        res,
        path: "delete",
        method: "Delete",
        code: HttpStatus.OK,
        subject: "plans",
        data: {
          plan: deletePlan,
          stripe: deletePlanStripes
        }
      });

    } catch (error) {
      console.error("PlansController > delete : ", error);

      return this.responsesHelper.getResponse({
        res,
        path: "delete",
        method: "Delete",
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        subject: "plans",
        data: error.message
      });
    }
  }
}
