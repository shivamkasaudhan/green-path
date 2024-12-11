import { changeLanguage } from 'i18next';
import React from 'react';

const languages = [
    { code: 'en', lang: "English" },
    { code: 'hi', lang: "Hindi" }
];

const LanguageSelector = () => {
    return (
        <div className=" justify-end flex space-x-4 end-0">
            {languages.map((lng) => (
                <button key={lng.code} onClick={() => changeLanguage(lng.code)}>
                    {lng.lang}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;
