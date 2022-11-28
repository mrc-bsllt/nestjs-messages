import { readFile, writeFile } from 'fs/promises';
import { MessageDto, MessagesDto } from './dtos/message.dto';

export class MessagesRepository {
  async findAll(): Promise<MessageDto[] | string> {
    const { messages } = await this.getParsedMessages()
    
    return messages
  }

  async findOne(id: number): Promise<MessageDto | null> {
    const { messages } = await this.getParsedMessages()

    const message = messages.filter(m => m.id === id)
    return message[0] || null
  }

  async create(content: string): Promise<MessageDto> {
    const { messages } = await this.getParsedMessages()
    
    const id = messages.length || 0
    const newMessage = {
      id,
      content
    }

    messages.push(newMessage)
    await writeFile('storage/messages.json', JSON.stringify({ messages }))

    return newMessage
  }

  private async getParsedMessages(): Promise<MessagesDto> {
    return JSON.parse(
      await readFile('storage/messages.json', 'utf8')
    )
  }
}