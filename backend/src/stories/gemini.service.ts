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
              text: "Напиши коротку цікаву зав'язку історії українською мовою.\n" +
                    "Назва: " + title + ".\n" +
                    "Світ: " + character.setting + ".\n" +
                    "Герой: " + character.name + " (" + character.role + ").\n" +
                    "Опис: " + (character.description || "звичайний герой") + ".\n\n" +
                    "Історія має бути художньою та закінчуватися відкрито."
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