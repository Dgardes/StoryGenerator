export interface Character {
    id: string;
    name: string;
    age: number;
    gender: string;
    setting: string;
    role: string;
    description?: string;
    createdAt: Date;
}

export interface CreateCharacterDto {
    name: string;
    age: number;
    gender: string;
    setting: string;
    role: string;
    description?: string;
}