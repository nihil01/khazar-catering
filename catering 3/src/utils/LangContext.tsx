// LangContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
// Импортируйте вашу реальную функцию getData
import { getData } from "../graphql/client.ts";
import type {QueryResponse} from "./ResponseTypes.ts"; // Предполагается, что это ваш путь

type LangContextType = {
    lang: string;
    setLang: (lang: string) => void;
    data: QueryResponse | null;
    loading: boolean;
};

const LangContext = createContext<LangContextType>({
    lang: "AZ",
    setLang: () => {},
    data: null,
    loading: true,
});

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLangState] = useState<string>("AZ");
    const [data, setData] = useState<QueryResponse | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async (selectedLang: string): Promise<void> => {
        setLoading(true);
        try {
            const response = await getData(selectedLang);
            setData(response?.data ?? null);
        } catch (err) {
            console.error("Ошибка загрузки данных:", err);
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    // 1. Читаем из localStorage при первом монтировании
    useEffect(() => {
        const storedLang = localStorage.getItem("lang") || "AZ";
        setLangState(storedLang);
        // Важно: Не вызываем fetchData здесь, так как она будет вызвана в следующем useEffect
    }, []);

    // 2. Запускаем fetchData каждый раз, когда 'lang' меняется (включая первое значение из localStorage)
    useEffect(() => {
        fetchData(lang);
    }, [lang]); // Зависимость от 'lang' - это ключ к повторным запросам

    // 3. Функция для изменения языка (и сохранения в localStorage)
    const setLang = (newLang: string) => {
        setLangState(newLang); // Обновляем состояние React
        localStorage.setItem("lang", newLang); // Сохраняем в localStorage
    };

    return (
        <LangContext.Provider value={{ lang, setLang, data, loading }}>
            {children}
        </LangContext.Provider>
    );
};

export const useLang = () => useContext(LangContext);