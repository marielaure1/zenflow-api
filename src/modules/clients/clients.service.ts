import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Client, ClientDocument } from '@modules/clients/entities/client.entity';
import { CreateClientDto } from '@modules/clients/dto/create-client.dto';
import { UpdateClientDto } from '@modules/clients/dto/update-client.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class ClientsService extends AppService<ClientDocument, CreateClientDto, UpdateClientDto>{

  constructor(@InjectModel(Client.name) private clientModel: Model<ClientDocument>) {
    super(clientModel);
  }
  
}
