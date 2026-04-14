import { Character } from "../../characters/entities/character.entity";

export class Story 
{
    id: string;
    title: string;
    content: string;
    character: Character;
    createdAt: Date;
}
