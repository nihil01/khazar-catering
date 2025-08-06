// src/components/NewsDetail.tsx
import React, { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

// Интерфейс для структуры новости (ОБЯЗАТЕЛЬНО должен быть определен здесь)
interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

// Данные о новостях (скопируйте их из News.tsx, чтобы они были доступны здесь)
const newsItems: NewsItem[] = [ // Явно указываем тип массива
  {
    id: 1,
    title: 'Новая функция в приложении',
    date: '27 июля 2025',
    description: 'Мы добавили переключение темы для улучшения пользовательского опыта. Теперь вы можете выбирать между светлой и темной темой, чтобы сделать работу с приложением более комфортной для ваших глаз в любое время суток. Это позволит персонализировать внешний вид приложения в соответствии с вашими предпочтениями и условиями освещения.',
    image: '/news/news1.jpeg',
  },
  {
    id: 2,
    title: 'Обновление безопасности',
    date: '25 июля 2025',
    description: 'Улучшены меры безопасности для защиты ваших данных. Мы внедрили новые протоколы шифрования и усилили аутентификацию пользователей, чтобы обеспечить максимальную конфиденциальность и предотвратить несанкционированный доступ. Ваша безопасность является нашим главным приоритетом.',
    image: '/news/news2.jpeg',
  },
  {
    id: 3,
    title: 'Планы на будущее',
    date: '20 июля 2025',
    description: 'Анонсированы новые функции, которые появятся в следующем релизе. В скором времени ожидайте улучшения производительности, расширение интеграции с другими сервисами и новые инструменты для аналитики. Мы постоянно работаем над тем, чтобы наше приложение становилось ещё мощнее и удобнее для вас.',
    image: '/news/news3.jpeg',
  },
  {
    id: 4,
    title: 'Запуск нового модуля',
    date: '18 июля 2025',
    description: 'Представляем новый модуль для интеграции с внешними сервисами. Этот модуль значительно упрощает взаимодействие с популярными сторонними платформами, позволяя вам автоматизировать рабочие процессы и обмениваться данными без лишних усилий. Ожидайте повышения эффективности и гибкости.',
    image: '/news/news4.jpeg',
  },
];

// Варианты анимации для страницы детали
const pageVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const NewsDetail: React.FC = () => {
  const [match, params] = useRoute("/news/:id");
  // ИСПРАВЛЕНИЕ: Укажите тип для useState
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null); // <-- Здесь мы говорим TypeScript, что newsItem может быть NewsItem ИЛИ null
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  useEffect(() => {
    if (match && params.id) {
      const foundItem = newsItems.find(item => item.id === parseInt(params.id));
      if (foundItem) {
        setNewsItem(foundItem);
        // Прокрутка к началу страницы при загрузке
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setNewsItem(null); // Новость не найдена
      }
    }
  }, [ match, params?.id ]);

  if (!newsItem) {
    return (
      <motion.div
        className={`flex items-center justify-center min-h-screen py-20 px-4 text-center
                    ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <p className="text-xl">Новость не найдена.</p>
      </motion.div>
    );
  }

  return (
    <motion.section
      className={`py-20 px-4 sm:px-6 lg:px-8 font-sans scroll-mt-20
                  ${isDarkTheme ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      aria-labelledby="news-detail-heading"
    >
      <div className="max-w-4xl mx-auto">
        <Link href="/news" className={`inline-flex items-center mb-6 text-lg font-medium
                                       ${isDarkTheme ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'}`}>
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Все новости
        </Link>

        <motion.article
          className={`rounded-xl overflow-hidden shadow-lg p-6
                      ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'}`}
          variants={pageVariants}
        >
          <div className="mb-6 rounded-lg overflow-hidden">
            <img
              src={newsItem.image}
              alt={newsItem.title}
              className="w-full h-auto object-cover max-h-96"
              onError={(e) => {
                console.error(`Failed to load image: ${newsItem.image}`);
                e.currentTarget.src = 'https://via.placeholder.com/800x400?text=Image+Not+Found';
              }}
            />
          </div>
          <h1
            id="news-detail-heading"
            className={`text-3xl sm:text-4xl font-extrabold mb-4
                        ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
          >
            {newsItem.title}
          </h1>
          <p className={`text-sm font-semibold mb-6
                        ${isDarkTheme ? 'text-gray-400' : 'text-gray-500'}`}>
            {newsItem.date}
          </p>
          <p className={`text-base leading-relaxed whitespace-pre-line
                        ${isDarkTheme ? 'text-gray-200' : 'text-gray-700'}`}>
            {newsItem.description}
          </p>
        </motion.article>
      </div>
    </motion.section>
  );
};