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

  // @ApiProperty({ description: 'The background color of the note' })
  // @IsNotEmpty()
  // @IsString()
  // background: string;

  // @ApiProperty({ description: 'The text color of the note' })
  // @IsNotEmpty()
  // @IsString()
  // foreground: string;

  @ApiProperty({ description: 'The owner ID of the note' })
  @IsString()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({ description: 'The folder of the note' })
  @IsNotEmpty()
  @IsString()
  folderId?: string;
}

export class UpdateNoteDto extends CreateNoteDto {}
