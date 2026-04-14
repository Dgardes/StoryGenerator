import { Controller, Get, Post, Body, Param, Delete, NotFoundException, Patch } from '@nestjs/common';
import { StoriesService } from './stories.service';
import { CharactersService } from '../characters/characters.service';
import { CreateStoryDto } from './dto/create-story.dto';
import { UpdateStoryDto } from './dto/update-story.dto';

@Controller('stories')
export class StoriesController {
  constructor(
    private readonly storiesService: StoriesService,
    private readonly charactersService: CharactersService, //ін'єкція сервісу персонажів
  ) {}

  @Post()
  create(@Body() createStoryDto: CreateStoryDto) {
    const character = this.charactersService.findOne(createStoryDto.characterId);
    if (!character) {
      throw new NotFoundException("Персонажа для цієї історії не знайдено.");
    }
    return this.storiesService.create(createStoryDto, character);
  }

  @Get()
  findAll() {
    return this.storiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const story = this.storiesService.findOne(id);
    if (!story) throw new NotFoundException("Історію не знайдено.");
    return story;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoryDto: UpdateStoryDto) {
    const updatedStory = this.storiesService.update(id, updateStoryDto);
    if (updatedStory === null) {
      throw new NotFoundException("історію не знайдено.");
    }
    return updatedStory;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const isDeleted = this.storiesService.remove(id);
    if (!isDeleted) throw new NotFoundException("Історію не знайдено.");
    return { message: "Історію видалено." };
  }
}