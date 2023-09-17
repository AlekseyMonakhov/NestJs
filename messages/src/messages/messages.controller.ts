import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesServise } from './messages.servise';

@Controller('messages')
export class MessagesController {
  
  constructor(public messagesServise: MessagesServise) {}

  @Get()
  listMessages() {
    return this.messagesServise.findAll();
  }

  @Post()
  createMessage(@Body() body: CreateMessageDto) {
    return this.messagesServise.create(body.content);
  }

  @Get('/:id')
  async getMessage(@Param('id') id: string) {
    const message = await this.messagesServise.findOne(id);

    if (!message) {
      throw new NotFoundException('message not found');
    }

    return message;
  }
}
