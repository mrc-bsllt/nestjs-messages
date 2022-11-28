import { 
  IsString,
  Length
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @Length(5)
  content: string;
}