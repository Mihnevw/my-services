# Multilingual System Documentation

## Overview

This project uses a custom React Context-based multilingual system that supports English (en) and Bulgarian (bg) languages. The system is built to be simple, efficient, and easy to extend.

## Components

### 1. Language Context (`contexts/language-context.tsx`)

The core of the multilingual system is the Language Context, which provides:

- Current language management (e.g., "en" or "bg")
- A method to change the language (`setLanguage`)
- A translation function (`t("key")`) for accessing translations

### 2. Language Provider

The Language Provider wraps the entire application and provides these key features:

- Loads translations for the selected language
- Saves language preferences in localStorage
- Falls back to the default language (English) when needed
- Automatically detects browser language preferences

### 3. Translation Dictionary

All translations are stored in a structured object in `contexts/language-context.tsx`:

```typescript
export const translations: { [lang: string]: TranslationDict } = {
  en: {
    home: "Home",
    about: "About",
    // ...more translations
  },
  bg: {
    home: "Начало",
    about: "За мен",
    // ...more translations
  }
}
```

Translations are organized by feature or module for easy maintenance.

### 4. Language Selector Component (`components/language-selector.tsx`)

A dropdown UI component that allows users to switch between languages. It:

- Displays the current language with its flag
- Shows a list of available languages to select from
- Updates the language in the Language Context when a new language is selected

### 5. Speech Support

The system supports text-to-speech functionality via the `speak` function, which uses the current language's speech settings.

## How to Use

### 1. Accessing Translations in Components

Import the `useLanguage` hook and use the `t` function:

```jsx
import { useLanguage } from "@/contexts/language-context";

function MyComponent() {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t("welcome")}</h1>
      <p>{t("heroDescription")}</p>
    </div>
  );
}
```

### 2. Changing the Language

Import the `useLanguage` hook and use the `setLanguage` function:

```jsx
import { useLanguage, LANGUAGES } from "@/contexts/language-context";

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  
  return (
    <button onClick={() => setLanguage(language.code === "en" ? LANGUAGES[1] : LANGUAGES[0])}>
      Switch to {language.code === "en" ? "Bulgarian" : "English"}
    </button>
  );
}
```

### 3. Adding New Translations

To add new translations, update the `translations` object in `contexts/language-context.tsx`:

```typescript
export const translations: { [lang: string]: TranslationDict } = {
  en: {
    // Existing translations...
    newFeature: "New Feature",
    newFeatureDescription: "This is a description for the new feature"
  },
  bg: {
    // Existing translations...
    newFeature: "Нова функционалност",
    newFeatureDescription: "Това е описание на новата функционалност"
  }
}
```

### 4. Using Nested Keys

The translation system supports dot notation for nested keys:

```jsx
// If your translations are structured like:
// {
//   en: {
//     features: {
//       title: "Features",
//       description: "Description of features"
//     }
//   }
// }

// You can access them with:
const title = t("features.title");
```

## Best Practices

1. **Use consistent key structure**: Organize translation keys logically by section or feature
2. **Avoid string concatenation**: Use complete sentences in translations to maintain proper grammar
3. **Handle pluralization**: Create separate keys for singular and plural forms
4. **Provide fallbacks**: The system uses English as a fallback if a translation is missing
5. **Use descriptive keys**: Name your keys descriptively to make maintenance easier
6. **Group related translations**: Keep related translations together in the dictionary
7. **Update all languages**: When adding a new key, add it to all language dictionaries

## Adding a New Language

To add a new language:

1. Add the language to the `LANGUAGES` array in `contexts/language-context.tsx`:

```typescript
export const LANGUAGES: Language[] = [
  // Existing languages...
  {
    code: "fr",
    name: "Français",
    flag: "🇫🇷",
    speechCode: "fr-FR",
  },
];
```

2. Add translations for the new language to the `translations` object:

```typescript
export const translations: { [lang: string]: TranslationDict } = {
  // Existing languages...
  fr: {
    home: "Accueil",
    about: "À propos",
    // Add all other translations
  }
}
```

3. Test thoroughly to ensure all translations are provided 