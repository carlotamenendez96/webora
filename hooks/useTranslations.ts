
import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';

export const useTranslations = () => useContext(LanguageContext);
