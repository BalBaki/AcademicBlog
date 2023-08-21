import { useTranslation } from 'react-i18next';

function Language() {
    const { i18n } = useTranslation();

    const handleLanguageClick = (lang) => {
        i18n.language !== lang && i18n.changeLanguage(lang);
    };

    return (
        <div className="flex flex-row-reverse dark:text-white">
            <div className="p-2 cursor-pointer" onClick={() => handleLanguageClick('tr')}>
                Tr
            </div>
            <div className="p-2 cursor-pointer" onClick={() => handleLanguageClick('en')}>
                Eng
            </div>
        </div>
    );
}

export default Language;
