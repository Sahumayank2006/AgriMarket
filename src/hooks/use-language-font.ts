import { useContext } from 'react';
import { LanguageContext } from '@/contexts/language-context';

export const useLanguageFont = () => {
  const { lang } = useContext(LanguageContext);

  const getFontClass = (weight: 'light' | 'medium' = 'light'): string => {
    const fontMap = {
      en: weight === 'light' ? 'font-inter-light' : 'font-inter-medium',
      hi: weight === 'light' ? 'font-hindi-light' : 'font-hindi-medium',
      mr: weight === 'light' ? 'font-marathi-light' : 'font-marathi-medium',
      bn: weight === 'light' ? 'font-bengali-light' : 'font-bengali-medium',
      te: weight === 'light' ? 'font-telugu-light' : 'font-telugu-medium',
      ta: weight === 'light' ? 'font-tamil-light' : 'font-tamil-medium',
    };

    return fontMap[lang] || fontMap.en;
  };

  const getFontFamily = (): string => {
    const fontFamilyMap = {
      en: 'Inter',
      hi: 'Hind',
      mr: 'Hind', 
      bn: 'Hind Siliguri',
      te: 'Hind Guntur',
      ta: 'Hind Madurai',
    };

    return fontFamilyMap[lang] || fontFamilyMap.en;
  };

  return {
    lang,
    getFontClass,
    getFontFamily,
    lightFont: getFontClass('light'),
    mediumFont: getFontClass('medium'),
  };
};
