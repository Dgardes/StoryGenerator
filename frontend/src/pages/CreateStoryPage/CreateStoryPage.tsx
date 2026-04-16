import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { CreateStoryDto } from "../../types/story";
import styles from "./CreateStoryPage.module.css";
import { characterApi } from "../../api/backendApi";

interface CreateStoryPageProps {
  onAdd: (dto: CreateStoryDto) => Promise<void>;
}

interface StoryFormData {
  title: string;
  charName: string;
  charAge: number;
  charGender: string;
  charSetting: "fantasy" | "cyberpunk" | "apocalypse";
  charRole: string;
  charDescription?: string;
}

const rolesBySetting: Record<string, string[]> = {
    fantasy: ["knight", "mage", "archer", "thief"],
    cyberpunk: ["netrunner", "corporate", "mercenary", "android"],
    apocalypse: ["looter", "mechanic", "survivor", "medic"]
};

export default function CreateStoryPage({ onAdd }: CreateStoryPageProps) {
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { isSubmitting } } = useForm<StoryFormData>({
    defaultValues: { charSetting: "fantasy" }
  });

  //watch дозволяє стежити за вибором сеттингу в реальному часі
  const selectedSetting = watch("charSetting");

  const onSubmit = async function(data: StoryFormData) {
  try {
    const characterDto = {
      name: data.charName,
      age: Number(data.charAge),
      gender: data.charGender,
      setting: data.charSetting,
      role: data.charRole,
      description: data.charDescription || ""
    };

    //запит на створення персонажа
    const savedCharacter = await characterApi.create(characterDto);
    console.log("Персонаж створений з ID:", savedCharacter.id);

    const storyDto: any = {
      title: data.title,
      characterId: savedCharacter.id
    };

    //запит на створення історії
    await onAdd(storyDto); 
    
    navigate("/");
  } catch (e) {
    console.error(e);
    alert("Сталася помилка на одному з етапів створення");
  }
};

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Нова історія</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <input {...register("title", { required: true })} placeholder="Назва історії" />
        
        <div className={styles.grid}>

          <input {...register("charName", { required: true })} placeholder="Ім'я героя" />
          <input type="number" {...register("charAge", { 
              required: "Вік обов'язковий", 
              min: { value: 1, message: "Вік не може бути менше 1" }, 
            })} 
            placeholder="Вік" 
          />
          
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" value="Чоловік" {...register("charGender")} defaultChecked /> Чоловік
            </label>
            <label>
              <input type="radio" value="Жінка" {...register("charGender")} /> Жінка
            </label>
          </div>

          <select {...register("charSetting")}>
            <option value="fantasy">Фентезі</option>
            <option value="cyberpunk">Кіберпанк</option>
            <option value="apocalypse">Апокаліпсис</option>
          </select>

          <select {...register("charRole", { required: true })}>
            <option value="">Оберіть роль</option>
            {rolesBySetting[selectedSetting]?.map(role => ( <option key={role} value={role}>{role}</option> ))}
          </select>
        </div>

        <textarea 
          {...register("charDescription")} 
          placeholder="Короткий опис персонажа або передісторія (необов'язково)"
          className={styles.textarea}
        />

        <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
          {isSubmitting ? "Історія створюється" : "Згенерувати історію"}
        </button>
      </form>
    </div>
  );
}