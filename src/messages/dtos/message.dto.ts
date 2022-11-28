export interface MessagesDto {
  messages: MessageDto[];
}

export interface MessageDto {
  id: number;
  content: string;
}