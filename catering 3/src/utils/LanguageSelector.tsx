import React from "react";
import { useLang } from "./LangContext"; // Импорт контекста

const LANGUAGES = [
    { code: "AZ", label: "AZ", flag: "🇦🇿" },
    { code: "RU", label: "RU", flag: "🇷🇺" },
    { code: "EN", label: "EN", flag: "🇺🇸" },
];

const LanguageSelector: React.FC = () => {
    const { lang, setLang } = useLang();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setLang(e.target.value);
    };

    return (
        <div className="relative">
            <select
                value={lang}
                onChange={handleChange}
                className="bg-gray-700 text-white text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 cursor-pointer"
            >
                {LANGUAGES.map((langOption) => (
                    <option
                        key={langOption.code}
                        value={langOption.code}
                        className="text-black bg-white"
                    >
                        {langOption.flag} {langOption.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
