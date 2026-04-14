import { Module } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { StoriesController } from './stories.controller';
import { CharactersModule } from '../characters/characters.module';

@Module({
  imports: [CharactersModule], //імпрт 
  controllers: [StoriesController],
  providers: [StoriesService],
  
})
export class StoriesModule {}
