import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CharactersModule } from './characters/characters.module';
import { StoriesModule } from './stories/stories.module';
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [CharactersModule, StoriesModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
