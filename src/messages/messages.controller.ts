import { 
  Controller,
  Get,
  Post,
  Param,
  Body,
  NotFoundException
} from '@nestjs/common';
import { MessagesService } from './messages.service'
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessageDto } from './dtos/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get()
  async messagesList(): Promise<MessageDto[] | string> {
    const messages = await this.messagesService.findAll()
    return messages.length ?
      messages :
      'Non ci sono messaggi?'
  }

  @Get(':id')
  async findMessageById(
    @Param('id') id: string
  ): Promise<MessageDto | never> {
    const message = await this.messagesService.findOne(+id)

    if(!message) {
      throw new NotFoundException('Messaggio non trovato!');
    }

    return message
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto): Promise<MessageDto> {
    const { content } = body
    return this.messagesService.create(content)
  }
}
