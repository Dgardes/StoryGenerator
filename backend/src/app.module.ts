import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { StoriesModule } from './stories/stories.module';
import { ConfigModule } from '@nestjs/config'
import * as dotenv from 'dotenv';
dotenv.config(); //завантажить ключ до того, як NestJS почне збирати модулі

@Module({
  imports: [CharactersModule, StoriesModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
