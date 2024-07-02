import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ description: 'The title of the note' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ description: 'The content of the note' })
  @IsNotEmpty()
  @IsString()
  content: string;
}

export class UpdateNoteDto extends CreateNoteDto {}
