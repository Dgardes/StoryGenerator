import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { CharactersModule } from '../characters/characters.module';
import { GeminiService } from './gemini.service';

@Module({
  imports: [CharactersModule], //імпрт сервісу персонажів
  controllers: [StoriesController],
  providers: [StoriesService, GeminiService], //реестрація геміні сервісу
  
})
export class StoriesModule {}
