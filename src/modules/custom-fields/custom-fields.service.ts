import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomField, CustomFieldDocument } from '@modules/custom-fields/entities/custom-field.entity';
import { CreateCustomFieldDto } from '@modules/custom-fields/dto/create-custom-field.dto';
import { UpdateCustomFieldDto } from '@modules/custom-fields/dto/update-custom-field.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class CustomFieldsService extends AppService<CustomFieldDocument, CreateCustomFieldDto, UpdateCustomFieldDto>{

  constructor(@InjectModel(CustomField.name) private customFieldModel: Model<CustomFieldDocument>) {
    super(customFieldModel);
  }
}
