import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './entities/story.entity';
import { Character } from '../characters/entities/character.entity';
import { UpdateStoryDto } from './dto/update-story.dto';

@Injectable()
export class StoriesService {
  private stories: Story[] = [];

  create(createStoryDto: CreateStoryDto, character: Character) {
    const newStory: Story = {
      id: Date.now().toString(),
      title: createStoryDto.title,
      content: "згенерована історія",
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