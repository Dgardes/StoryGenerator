# Story Generator

## Опис проекту
Веб-застосунок, призначений для автоматичної генерації художніх історій та зав’язок пригод. Користувач створює  персонажа, обирає сеттінг та роль, після чого система формує автентичний текст за допомогою штучного інтелекту.

## Ідея проекту
Використати можливості Google Gemini API для створення динамічного контенту. Система поєднує введені користувачем параметри персонажа з LLM для отримання персоналізованих художніх текстів.

## Технології
### Бекенд
* Framework: Nest.js.
* Валідація: class-validator, class-transformer.
* Робота з AI: @google/generative-ai.
* Збереження даних: використання модуля fs/promises для реалізації json-сховища.

### Фронтенд
* Library: React 18 (Vite).
* Навігація: React Router DOM.
* Робота з формами: React Hook Form.
* Зв'язка з backend: Axios.
* Стилізація: CSS Modules.

## Структура проекту

```
StoryGenerator/
├── backend/                              
│   ├── dist/                             
│   ├── node_modules/                     # Залежності бекенду
│   └── src/
│       ├── characters/                   # Модуль персонажів
│       │   ├── dto/                      # Об'єкти передачі даних
│       │   │   ├── create-character.dto.ts
│       │   │   └── update-character.dto.ts
│       │   ├── entities/                 # Опис моделей даних
│       │   │   └── character.entity.ts
│       │   ├── characters.controller.ts  # Обробка HTTP-запитів
│       │   ├── characters.module.ts      # Конфігурація модуля
│       │   └── characters.service.ts     # Бізнес-логіка (CRUD)
│       ├── stories/                      # Модуль історій
│       │   ├── dto/
│       │   │   ├── create-story.dto.ts
│       │   │   └── update-story.dto.ts
│       │   ├── entities/
│       │   │   └── story.entity.ts
│       │   ├── gemini.service.ts         # Інтеграція з Google AI
│       │   ├── stories.controller.ts
│       │   ├── stories.module.ts
│       │   └── stories.service.ts
│       ├── app.controller.spec.ts
│       ├── app.controller.ts
│       ├── app.module.ts                 # Головний модуль додатка
│       ├── app.service.ts
│       ├── constants.ts
│       └── main.ts                       # Точка входу
│
├── frontend/                             # React проєкт
│   ├── node_modules/                     # Залежності фронтенду
│   ├── public/                           # Статичні файли
│   └── src/
│       ├── api/                          # Налаштування клієнта API
│       │   └── backendApi.ts
│       ├── assets/                       # Зображення та ресурси
│       │   ├── apocalypselmg.jpg
│       │   ├── cyberpunklmg.jpg
│       │   └── fantasylmg.jpg
│       ├── components/                   # Базові компоненти
│       │   ├── Layout/                   # Компонент обгортки
│       │   │   ├── Layout.module.css
│       │   │   └── Layout.tsx
│       │   └── StoryCard/                # Картка історії в списку
│       │       ├── StoryCard.module.css
│       │       └── StoryCard.tsx
│       ├── pages/                        # Сторінки додатка
│       │   ├── CreateStoryPage/          # Створення історії
│       │   │   ├── CreateStoryPage.module.css
│       │   │   └── CreateStoryPage.tsx
│       │   ├── StoriesPage/              # Список усіх історій
│       │   │   ├── StoriesPage.module.css
│       │   │   └── StoriesPage.tsx
│       │   └── StoryDetails/             # Перегляд та редагування
│       │       ├── StoryDetails.module.css
│       │       └── StoryDetails.tsx
│       ├── types/                        # TypeScript інтерфейси
│       │   ├── character.ts
│       │   └── story.ts
│       ├── App.css                       # Глобальні стилі
│       ├── App.tsx                       # Головний компонент (Router)
│       ├── index.css
│       └── main.tsx                      # Точка входу React
│
└── README.md                             # Документація проєкту
```

## Основні сутності

### Character (Персонаж)
| Поле | Тип | Опис |
| :--- | :--- | :--- |
| id | string | Унікальний ідентифікатор (Timestamp) |
| name | string | Ім'я персонажа |
| age | number | Вік (валідація: позитивне число) |
| gender | string | Стать героя |
| setting | string | Світ гри (fantasy, cyberpunk, apocalypse) |
| role | string | Роль або спеціалізація персонажа |
| description | string | Біографія або коротка передісторія |
| createdAt | Date | Дата та час створення |

### Story (Історія)
| Поле | Тип | Опис |
| :--- | :--- | :--- |
| id | string | Унікальний ідентифікатор історії |
| title | string | Заголовок пригоди |
| content | string | Текст історії |
| characterId | string | id персонажа |
| createdAt | Date | Дата та час генерації |

## API Ендпоінти

### Персонажі
* POST /characters – Створити нового персонажа.
* GET /characters – Отримати список усіх створених персонажів.
* GET /characters/:id – Отримати детальні дані конкретного персонажа.
* PATCH /characters/:id – Оновити дані існуючого персонажа.
* DELETE /characters/:id – Видалити персонажа.

### Історії
* POST /stories – Згенерувати нову історію через Gemini AI (потребує characterId).
* GET /stories – Отримати архів усіх згенерованих історій.
* GET /stories/:id – Переглянути конкретну історію за її ID.
* PATCH /stories/:id – Редагувати заголовок або текст існуючої історії.
* DELETE /stories/:id – Видалити історію з архіву.

## DTO 
### Stories
| Поле | Декоратори валідації | Опис |
| :--- | :--- | :--- |
| `title` | `@IsString`, `@IsNotEmpty`, `@MaxLength(45)` | Назва майбутньої історії |
| `characterId` | `@IsString`, `@IsNotEmpty` | ID персонажа для прив'язки та контексту ШІ |
| `content` | `@IsString`, `@IsOptional`, `@MinLength(10)` | Поле для збереження генерованого тексту |

### Characters
| Поле | Декоратори валідації | Опис |
| :--- | :--- | :--- |
| `name` | `@IsString`, `@IsNotEmpty`, `@MaxLength(45)` | Ім'я персонажа (текст до 45 симв.) |
| `age` | `@IsInt`, `@Min(1)`, `@Max(200)` | Вік (ціле число від 1 до 200) |
| `gender` | `@IsString`, `@IsIn(gender_options)` | Стать (згідно з константами проекту) |
| `setting` | `@IsString`, `@IsIn(settings_config)` | Світ гри (fantasy, cyberpunk, apocalypse) |
| `role` | `@IsString`, `@IsNotEmpty` | Роль або клас героя |
| `description` | `@IsString`, `@IsOptional`, `@MaxLength(200)` | Коротка біографія (опціонально) |

## Інструкція запуску

### Налаштування середовища
В папці backend створити файл .env та додати:
GEMINI_API_KEY=ваш_ключ_gemini
PORT=3000

### Запуск фронтенду
cd /d "шлях_до_папки/frontend"
npm install
npm run dev

### Запуск бекенду
cd /d "шлях_до_папки/backend"
npm install
npm run start:dev