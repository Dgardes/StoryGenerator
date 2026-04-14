import { gender_options, settings_config } from "../../constants";

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
} from "class-validator";


export class CreateCharacterDto {
  @IsString({ message: "Ім'я має бути рядком"})
  @IsNotEmpty({ message: "Ім'я не може бути порожнім"})
  @MaxLength(45, { message: "Ім'я не може перевищувати 45 символів"})
  name: string;
  
  @IsInt({ message: "вік повинен бути цілим числом"})
  @IsNotEmpty({ message: "вік повинен бути заповнений"})
  @Min(1, { message: "вік не може бути менше року"})
  age: number;
  
  @IsString({ message: "Гендер повинен бути рядком"})
  @IsNotEmpty({ message: "Гендер повинен бути вказаний"})
  @Length(3, 20)
  @IsIn(gender_options, { message: "Гендер повинен бути одним з наступних: " + gender_options.join(", ")})
  gender: string;
  
  @IsString({ message: "Сеттінг повинен бути рядком"})
  @IsNotEmpty({ message: "Сеттінг повинен бути вказаний"})
  @IsIn(Object.keys(settings_config), { message: "Сеттінг повинен бути одним з наступних: " + Object.keys(settings_config).join(", ")})
  setting: string;
  
  @IsString({ message: "Роль повинна бути рядком"})
  @IsNotEmpty({ message: "Роль повинна бути вказана"})
  role: string;
  
  @IsString()
  @IsOptional()
  @MaxLength(200, { message: "Опис не повинен перевищувати 200 символів"})
  description: string;
  
}
