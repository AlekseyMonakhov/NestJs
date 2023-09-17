import { Module } from '@nestjs/common';
import { MessagesController } from './messages.controller';
import { MessagesServise } from './messages.servise';
import { MessageRepository } from './messages.repository';


@Module({
  controllers: [MessagesController],
  providers: [MessagesServise, MessageRepository]
})
export class MessagesModule {}
