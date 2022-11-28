import { Injectable } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { MessageDto } from './dtos/message.dto';

@Injectable()
export class MessagesService {
  constructor(public MessagesRepo: MessagesRepository) {}

  findAll(): Promise<MessageDto[] | string> {
    return this.MessagesRepo.findAll()
  }

  findOne(id: number): Promise<MessageDto | null> {
    return this.MessagesRepo.findOne(id)
  }

  create(content: string): Promise<MessageDto> {
    return this.MessagesRepo.create(content)
  }
}
