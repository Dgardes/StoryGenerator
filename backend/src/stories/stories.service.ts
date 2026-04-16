import { Injectable } from '@nestjs/common';
import { CreateStoryDto } from './dto/create-story.dto';
import { Story } from './entities/story.entity';
import { Character } from '../characters/entities/character.entity';
import { UpdateStoryDto } from './dto/update-story.dto';
import { GeminiService } from './gemini.service';

import * as fs from 'fs/promises';
import * as path from 'path';


@Injectable()
export class StoriesService {
  private stories: Story[] = [];
  //конструктор геміні сервісу

  private readonly filePath = path.resolve(__dirname, '../../stories.json');

  //викликається автоматично при старті додатка
  async onModuleInit() {
    await this.loadFromFile();
  }

  private async loadFromFile() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      this.stories = JSON.parse(data);
    } catch (error) {
      //якщо файлу немає
      this.stories = [];
      await this.saveToFile();
    }
  }

  private async saveToFile() {
    await fs.writeFile(this.filePath, JSON.stringify(this.stories, null, 2), 'utf-8');
  }

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
    await this.saveToFile();
    return newStory;
  }

  findAll() {
    return this.stories;
  }

  findOne(id: string) {
    const story = this.stories.find(s => s.id === id);
    return story ? story : null;
  }

  async update(id: string, updateStoryDto: UpdateStoryDto)
  {
    const index = this.stories.findIndex(story => story.id === id);
    if (index === -1) 
    {
      return null;
    }
    const updatedStory = Object.assign(this.stories[index], updateStoryDto); 
    this.stories[index] = updatedStory; 
    await this.saveToFile();
    return updatedStory;
  }

  async remove(id: string) {
    const index = this.stories.findIndex(s => s.id === id);
    if (index === -1) return false;
    
    this.stories.splice(index, 1);
    await this.saveToFile();
    return true;
  }
}