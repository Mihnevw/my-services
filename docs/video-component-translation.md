# Video Component Multilingual Support

This document outlines how multilingual support has been implemented for video components in our website.

## Components Updated

The following components have been updated to support both English and Bulgarian translations:

1. `VideoPlayer.tsx` - The main video player component using video.js
2. `IntroAnimation.tsx` - The animated introduction component that simulates a video player

## Implementation Details

### Subtitle Files

Both components now support language-specific subtitle files:

- `/public/subtitles.vtt` - English subtitles
- `/public/subtitles_bg.vtt` - Bulgarian subtitles

The appropriate subtitle file is loaded based on the current language selection.

### Language Context Integration

Both video components now use the `useLanguage` hook from the language context to:

1. Determine which subtitle file to load
2. Translate UI elements
3. Set the correct language for text-to-speech functionality

### VideoPlayer Component

The VideoPlayer component was updated to:

- Load language-specific subtitle files
- Set the correct subtitle track language and label
- Use the language context for UI translations
- Pass the language speech code to the text-to-speech functionality

### IntroAnimation Component

The IntroAnimation component was updated to:

- Load language-specific subtitle files
- Provide fallback subtitles in both languages
- Translate all UI elements using the language context
- Pass the language speech code to the Speakit library

## Text-to-Speech Support

The text-to-speech functionality now supports both English and Bulgarian:

- The `language.speechCode` is passed to the speech synthesis API (`en-US` for English, `bg-BG` for Bulgarian)
- The Speakit library has been enhanced to select the most appropriate voice for each language:
  - First tries to find a Google voice for the specified language
  - Falls back to any available voice for the language if no Google voice is found
  - Uses the default voice only if no language-specific voice is available
- Speech uses the correct pronunciation for each language, making the audio sound more natural
- UI elements indicate the current text-to-speech status in the selected language

### Text-to-Speech Implementation

The implementation involves updates to three key files:

1. `hooks/useTextToSpeech.ts` - Updated to accept and pass the language parameter
2. `lib/speakit.ts` - Enhanced to properly select voices based on language code
3. Video components - Updated to pass the current language code to the speech functions

## Usage Example

```jsx
// The components automatically use the current language from context
<VideoPlayer src="/intro.mp4" />

// or
<IntroAnimation />
```

## Maintenance

When adding new subtitles or modifying existing ones:

1. Update both language versions of the subtitle files
2. Ensure timing is consistent between language versions
3. Keep translations contextually appropriate rather than literal

For supporting additional languages:

1. Add the language to the `LANGUAGES` array in `contexts/language-context.tsx` with the correct speech code
2. Create corresponding subtitle files (e.g., `subtitles_fr.vtt` for French)
3. Add translations to the language context 