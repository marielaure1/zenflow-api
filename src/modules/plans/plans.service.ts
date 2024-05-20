import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { Plan, PlanDocument } from '@modules/plans/entities/plan.entity';
import { ConfigService } from '@nestjs/config';
import { AppService } from '@modules/app.service';

@Injectable()
export class PlansService extends AppService<PlanDocument, CreatePlanDto, UpdatePlanDto>{

  constructor(
    @InjectModel(Plan.name) private plansModel: Model<PlanDocument>
  ) {
    super(plansModel);
  }

}
