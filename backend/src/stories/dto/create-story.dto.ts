import 
{
  IsString,
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  MaxLength,
  IsOptional,
  IsIn,
  Length,
  MinLength,
} from "class-validator";

export class CreateStoryDto 
{
  @IsString({ message: "Назва історії має бути рядком"})
  @IsNotEmpty({ message: "Назва історії не може бути порожньою"})
  @MaxLength(45, { message: "Назва не може перевищувати 45 символів"})
  title: string;
  
  @IsString({ message: "ID персонажа має бути рядком"})
  @IsNotEmpty({ message: "ID персонажа обов'язковий для зв'язку"})
  characterId: string;

  @IsString({ message: "Контент має бути рядком" })
  @IsOptional()
  @MinLength(10, { message: "Історія занадто коротка" })
  content?: string;
}