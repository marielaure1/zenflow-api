import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlanDto } from '@modules/plans/dto/create-plan.dto';
import { UpdatePlanDto } from '@modules/plans/dto/update-plan.dto';
import { Plan, PlanDocument } from '@modules/plans/entities/plan.entity';
import { AppService } from '@modules/app.service';

@Injectable()
export class PlansService extends AppService<PlanDocument, CreatePlanDto, UpdatePlanDto>{

  constructor(
    @InjectModel(Plan.name) private plansModel: Model<PlanDocument>
  ) {
    super(plansModel);
  }

}
