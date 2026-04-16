import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from "@google/genai";

@Injectable()
export class GeminiService {
  private ai: any;

  constructor() {
    //ініціалізація клієнту
    this.ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }

  async generateStory(title: string, character: any): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-lite",
        contents: [
          {
            role: "user",
            parts: [{
              text: "Напиши художню зав'язку історії українською мовою на основі наступних даних:\n" +
                    "Назва: " + title + ".\n" +
                    "Світ: " + character.setting + ".\n" +
                    "Герой: " + character.name + " (" + character.role + ").\n" +
                    "Опис: " + (character.description || "звичайний герой") + ".\n\n" +
                    "ПРАВИЛА ОФОРМЛЕННЯ:\n" +
                    "1. Пиши ТІЛЬКИ текст історії.\n" +
                    "2. НЕ пиши заголовки (наприклад, 'Назва:', 'Герой:', 'Зав'язка:').\n" +
                    "3. НЕ використовуй Markdown (ніяких зірочок ** чи решіток ##).\n" +
                    "4. Розділяй текст на логічні абзаци порожнім рядком.\n" +
                    "5. Закінчи історію відкрито."
            }]
          }
        ],
      });
      //дістаємо відповідь
      return response.text || "ШІ не зміг згенерувати текст.";

    } catch (error: any) {
      console.error("Помилка SDK Gemini:", error);
      
      
      return "Помилка: " + (error.message || "Unknown Error");
    }
  }
}