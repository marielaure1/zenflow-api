import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsMongoId()
  customerID: string;

  @IsNotEmpty()
  @IsMongoId()
  memberId: string;
}
