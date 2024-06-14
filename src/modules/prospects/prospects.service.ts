import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Prospect, ProspectDocument } from '@modules/prospects/entities/prospect.entity';
import { CreateProspectDto } from '@modules/prospects/dto/create-prospect.dto';
import { UpdateProspectDto } from '@modules/prospects/dto/update-prospect.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class ProspectsService extends AppService<ProspectDocument, CreateProspectDto, UpdateProspectDto>{

  constructor(@InjectModel(Prospect.name) private prospectModel: Model<ProspectDocument>) {
    super(prospectModel);
  }
}
