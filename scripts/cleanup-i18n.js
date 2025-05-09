/**
 * MANUAL CLEANUP INSTRUCTIONS
 * 
 * This is a guide to help you clean up the duplicate i18n implementation.
 * We've consolidated all translations into the custom LanguageContext system.
 * 
 * Files to remove:
 * 1. src/components/LanguageSwitcher.tsx
 * 2. lib/i18n.ts
 * 3. src/locales/en.json
 * 4. src/locales/bg.json
 * 
 * You can remove these files manually, or run the following commands in your terminal:
 * 
 * ```bash
 * # Remove unnecessary files
 * rm src/components/LanguageSwitcher.tsx
 * rm lib/i18n.ts
 * rm src/locales/en.json
 * rm src/locales/bg.json
 * 
 * # If the directories are empty after removal, remove them too
 * rmdir src/locales 2>/dev/null || true
 * ```
 * 
 * PACKAGE CLEANUP:
 * 
 * Remove these packages if they're not used elsewhere in the project:
 * 
 * ```bash
 * npm uninstall i18next react-i18next i18next-browser-languagedetector i18next-http-backend
 * ```
 * 
 * This will help reduce bundle size and avoid confusion with multiple translation systems.
 */

// No actual code to run - this is just a guide for manual cleanup
console.log('Please read this file for manual cleanup instructions.'); 