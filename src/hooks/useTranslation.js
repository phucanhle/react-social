import { useSelector } from 'react-redux';
import { translations } from '../translations';

export const useTranslation = () => {
    const currentLanguage = useSelector((state) => state.language.currentLanguage);

    const t = (key) => {
        const keys = key.split('.');
        let value = translations[currentLanguage];

        for (const k of keys) {
            value = value?.[k];
            if (!value) return key;
        }

        return value;
    };

    return { t, currentLanguage };
}; 