import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';

@Controller('characters') 
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  create(@Body() createCharacterDto: CreateCharacterDto) {
    const character = this.charactersService.create(createCharacterDto)
    if(!character)
    {
      throw new NotFoundException("роль не підходить до сеттінгу");
    }
    return character;
  }

  @Get()
  findAll() {
    return this.charactersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const foundCharacter = this.charactersService.findOne(id);
    if (foundCharacter === null) {
      throw new NotFoundException("Персонажа не знайдено.");
    }
    return foundCharacter;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCharacterDto: UpdateCharacterDto) {
    const updatedCharacter = this.charactersService.update(id, updateCharacterDto);
    if (updatedCharacter === null) {
      throw new NotFoundException("Персонажа не знайдено.");
    }
    return updatedCharacter;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    const isDeleted = this.charactersService.remove(id);
    if (!isDeleted) {
      throw new NotFoundException("Персонажа не знайдено.");
    }
    return { message: "Персонажа видалено." };
  }
}