// src/contexts/ThemeContext.tsx
import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Определяем типы для контекста
interface ThemeContextType {
  theme: 'dark' | 'white'; // Возможные значения темы
  toggleTheme: () => void; // Функция для переключения темы
}

// Создаем контекст. undefined - это значение по умолчанию, пока провайдер не готов.
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Создаем провайдер темы
export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Инициализируем состояние темы.
  // Сначала пытаемся получить тему из localStorage.
  // Если там пусто или не 'white', по умолчанию будет 'dark'.
  const [theme, setTheme] = useState<'dark' | 'white'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'white' ? 'white' : 'dark';
  });

  // Этот эффект запускается при изменении `theme`.
  // Он сохраняет выбранную тему в localStorage
  // и добавляет/удаляет соответствующий класс ('dark-theme' или 'white-theme') на <body>.
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.classList.remove('dark-theme', 'white-theme'); // Удаляем оба класса
    document.body.classList.add(`${theme}-theme`); // Добавляем нужный класс
  }, [theme]); // Зависит от состояния `theme`

  // Функция для переключения темы с 'dark' на 'white' и обратно.
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'white' : 'dark'));
  };

  return (
    // Передаем текущую тему и функцию переключения всем дочерним компонентам.
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Пользовательский хук для легкого доступа к контексту темы в любом компоненте.
export const useTheme = () => {
  const context = useContext(ThemeContext);
  // Проверяем, что хук используется внутри ThemeProvider, иначе выбрасываем ошибку.
  if (context === undefined) {
    throw new Error('useTheme должен использоваться внутри ThemeProvider');
  }
  return context;
};