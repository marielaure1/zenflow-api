import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Member, MemberDocument } from '@modules/members/entities/member.entity';
import { CreateMemberDto } from '@modules/members/dto/create-member.dto';
import { UpdateMemberDto } from '@modules/members/dto/update-member.dto';
import { AppService } from '@modules/app.service';

@Injectable()
export class MembersService extends AppService<MemberDocument, CreateMemberDto, UpdateMemberDto>{

  constructor(@InjectModel(Member.name) private memberModel: Model<MemberDocument>) {
    super(memberModel);
  }
}
