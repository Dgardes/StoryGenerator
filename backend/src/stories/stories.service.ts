import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './entities/story.entity';
import { Character } from '../characters/entities/character.entity';
import { UpdateStoryDto } from './dto/update-story.dto';
import { GeminiService } from './gemini.service';

@Injectable()
export class StoriesService {
  private stories: Story[] = [];
  //конструктор геміні сервісу
  constructor(private readonly geminiService: GeminiService) {}

  //асинхронний метод
  async create(createStoryDto: CreateStoryDto, character: Character) {
    
    //виклик запиту на створення контенту
    const aiContent = await this.geminiService.generateStory(createStoryDto.title, character );
    
    const newStory: Story = {
      id: Date.now().toString(),
      title: createStoryDto.title,
      content: aiContent,
      character: character,
      createdAt: new Date(),
    };
    this.stories.push(newStory);
    return newStory;
  }

  findAll() {
    return this.stories;
  }

  findOne(id: string) {
    const story = this.stories.find(s => s.id === id);
    return story ? story : null;
  }

  update(id: string, updateStoryDto: UpdateStoryDto)
  {
    const index = this.stories.findIndex(story => story.id === id);
    if (index === -1) 
    {
      return null;
    }
    const updatedStory = Object.assign(this.stories[index], updateStoryDto); 
    this.stories[index] = updatedStory; 
    return updatedStory;
  }

  remove(id: string) {
    const index = this.stories.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    this.stories.splice(index, 1);
    return true;
  }
}