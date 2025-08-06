import React from 'react';
import { useTheme } from './ThemeContext'; // Импортируем хук для доступа к теме
import { FaSun, FaMoon } from 'react-icons/fa'; // Иконки солнца и луны

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme(); // Получаем текущую тему и функцию переключения
  const isDarkTheme = theme === 'dark'; // Удобная переменная для ясности

  return (
    <button
      onClick={toggleTheme} // При клике вызываем функцию переключения
      className={`relative inline-flex items-center w-16 h-8 rounded-full p-1
                  transition-all duration-300 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-70
                  hover:shadow-lg // Легкое свечение при наведении
                  ${isDarkTheme
                    ? 'bg-gray-100 focus:ring-gray-400' // Темная тема: светлый фон
                    : 'bg-gray-800 focus:ring-gray-500' // Светлая тема: темный фон
                  }`}
      aria-label={isDarkTheme ? "Переключить на светлую тему" : "Переключить на тёмную тему"} // Метка для доступности
    >
      <span
        className={`absolute left-1 w-6 h-6 rounded-full
                    transform transition-all duration-300 ease-in-out
                    flex items-center justify-center
                    ${isDarkTheme
                      ? 'translate-x-8 scale-105 bg-gray-800 text-gray-100 shadow-md' // Темная тема: темный круг вправо, чуть увеличен
                      : 'translate-x-0 scale-100 bg-gray-100 text-gray-800 shadow-sm' // Светлая тема: светлый круг влево
                    }`}
      >
        {isDarkTheme ? (
          <FaSun className="h-4 w-4 transition-transform duration-300" /> // Солнце с плавным переходом
        ) : (
          <FaMoon className="h-4 w-4 transition-transform duration-300" /> // Луна с плавным переходом
        )}
      </span>
    </button>
  );
};