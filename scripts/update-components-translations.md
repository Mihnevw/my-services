# Guide to Update All Components with Translations

This guide explains how to update all components in your application to use the multilingual translation system correctly.

## Prerequisites

Make sure your application is set up with the Language Context system as described in `docs/multilingual-system.md`.

## Steps to Update a Component

For each component that contains text that should be translatable:

1. Add the client directive if it's not already present
   ```tsx
   "use client"
   ```

2. Import the useLanguage hook
   ```tsx
   import { useLanguage } from "@/contexts/language-context"
   ```

3. Use the hook within your component
   ```tsx
   export default function MyComponent() {
     const { t } = useLanguage()
     
     // rest of component
   }
   ```

4. Replace all hardcoded text with the translation function
   ```tsx
   // Change this:
   <h1>Welcome</h1>
   
   // To this:
   <h1>{t("welcome")}</h1>
   ```

5. Make sure all translation keys are defined in the translations object in `contexts/language-context.tsx` for all supported languages.

## Example Component Transformation

### Before:

```tsx
import React from "react"

export default function ExampleComponent() {
  return (
    <div>
      <h1>Welcome to My Website</h1>
      <p>This is a great place to learn about our services.</p>
      <button>Learn More</button>
    </div>
  )
}
```

### After:

```tsx
"use client"

import React from "react"
import { useLanguage } from "@/contexts/language-context"

export default function ExampleComponent() {
  const { t } = useLanguage()
  
  return (
    <div>
      <h1>{t("welcomeToWebsite")}</h1>
      <p>{t("learnAboutServices")}</p>
      <button>{t("learnMore")}</button>
    </div>
  )
}
```

## Components to Update

The following components have already been updated:

1. `components/navbar.tsx`
2. `components/hero.tsx`
3. `components/about.tsx`
4. `components/footer.tsx`
5. `components/services-preview.tsx`
6. `components/contact.tsx`

The following components still need to be updated:

1. `components/intro-animation.tsx`
2. `components/services.tsx`
3. `components/projects.tsx`
4. `components/pricing.tsx`
5. `components/testimonials.tsx`
6. `components/blog-preview.tsx`
7. `components/blog.tsx`
8. `components/target-audience.tsx`
9. All components under `components/auth/`
10. All components under `components/profile/`

## Adding New Translation Keys

When you need to add new translation keys:

1. Open `contexts/language-context.tsx`
2. Locate the `translations` object
3. Add the new key and its translation for each language:

```tsx
export const translations: { [lang: string]: TranslationDict } = {
  en: {
    // Existing translations...
    newKey: "New translation text in English",
  },
  bg: {
    // Existing translations...
    newKey: "Нов превод на български език",
  },
}
```

## Testing Your Changes

After updating a component, test it by:

1. Running the development server
2. Checking the component with each supported language
3. Verifying that all text changes correctly when switching languages

## Common Issues and Solutions

1. **Text not changing when language changes**
   - Ensure you're using the `t()` function for all text
   - Check that the translation key exists in all language dictionaries

2. **"useLanguage must be used within a LanguageProvider" error**
   - Make sure the component is within the LanguageProvider in the component tree
   - Check that you've added the "use client" directive if necessary

3. **Translation keys not found**
   - Ensure that all keys used with the `t()` function are defined in the translations object
   - Check for typos in key names 