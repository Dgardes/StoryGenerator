import type { Character } from "./character";

export interface Story {
    id: string;
    title: string;
    content: string;
    character: Character;
    createdAt: Date;
}

export interface CreateStoryDto {
  title: string;
  character: {
    name: string;
    age: number;
    gender: string;
    setting: string;
    role: string;
    description?: string;
  };
}