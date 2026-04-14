import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCharacterDto } from './dto/create-character.dto';
import { UpdateCharacterDto } from './dto/update-character.dto';
import { Character } from './entities/character.entity';
import { settings_config } from '../constants';

@Injectable()
export class CharactersService {

  private characters: Character[] = [];

  create(createCharacterDto: CreateCharacterDto) {
    
    const allowedRoles = settings_config[createCharacterDto.setting];
    if (!allowedRoles.includes(createCharacterDto.role))
    {
      return null;
    }
    
    const newCharacter: Character =
    {
      id: Date.now().toString(),
      name: createCharacterDto.name,
      age: createCharacterDto.age,
      gender: createCharacterDto.gender,
      setting: createCharacterDto.setting,
      role: createCharacterDto.role,
      description: createCharacterDto.description,
      createdAt: new Date()
    }
    this.characters.push(newCharacter);
    return newCharacter;
  }

  findAll() {
    return this.characters;
  }

  findOne(id: string) {
    const character = this.characters.find(c => c.id === id);
    if (!character) 
    {
      return null;
    }  
    return character;
  }

  update(id: string, updateCharacterDto: UpdateCharacterDto) {
    const index = this.characters.findIndex(c => c.id === id);
    if (index === -1) 
    {
      return null;
    }
    const updatedCharacter = Object.assign(this.characters[index], updateCharacterDto); 
    this.characters[index] = updatedCharacter; 
    return updatedCharacter;
  }

  remove(id: string) {
    const character = this.characters.find(c => c.id === id);
    if (!character)
    {
      return false;
    }
    this.characters = this.characters.filter(c => c.id !== id)
    return true;
  }
}
