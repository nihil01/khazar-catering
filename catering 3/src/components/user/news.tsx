import React from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

const sectionVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1,
      duration: 0.6,
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
};

interface NewsItem {
  id: number;
  title: string;
  date: string;
  description: string;
  image: string;
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: 'Новая функция в приложении',
    date: '27 июля 2025',
    description:
      'Мы добавили переключение темы для улучшения пользовательского опыта. Теперь вы можете выбирать между светлой и темной темой.',
    image: '/news/news1.jpeg',
  },
  {
    id: 2,
    title: 'Обновление безопасности',
    date: '25 июля 2025',
    description:
      'Улучшены меры безопасности для защиты ваших данных. Мы внедрили новые протоколы шифрования и усилили аутентификацию пользователей.',
    image: '/news/news2.jpeg',
  },
  {
    id: 3,
    title: 'Планы на будущее',
    date: '20 июля 2025',
    description:
      'Анонсированы новые функции, которые появятся в следующем релизе. В скором времени ожидайте улучшения производительности.',
    image: '/news/news3.jpeg',
  },
  {
    id: 4,
    title: 'Запуск нового модуля',
    date: '18 июля 2025',
    description:
      'Представляем новый модуль для интеграции с внешними сервисами. Этот модуль значительно упрощает взаимодействие.',
    image: '/news/news4.jpeg',
  },
];

export const News: React.FC = () => {
  const { theme } = useTheme();
  const isDarkTheme = theme === 'dark';

  return (
    <motion.section
      className={`pt-20 py-10 px-4 sm:px-6 lg:px-8 font-sans scroll-mt-20
                  ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}
      aria-labelledby="news-heading"
      initial={false} // <-- Отключили скрытое состояние
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.1 }}
    >
      <motion.h2
        id="news-heading"
        className={`text-3xl sm:text-4xl font-extrabold text-center mb-12
                    ${isDarkTheme ? 'text-teal-300' : 'text-teal-600'}`}
        variants={headingVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Новости
      </motion.h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {newsItems.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id}>
            <motion.article
              className={`flex flex-col rounded-xl overflow-hidden shadow-md cursor-pointer
                          hover:shadow-xl transition-all duration-300 border
                          ${isDarkTheme
                            ? 'bg-gray-800 text-gray-100 border-gray-700'
                            : 'bg-white text-gray-900 border-gray-200'
                          }`}
              aria-labelledby={`news-title-${item.id}`}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative w-full h-40">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-t-xl"
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://via.placeholder.com/400x250?text=Image+Not+Found';
                  }}
                />
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3
                  id={`news-title-${item.id}`}
                  className={`text-lg font-semibold mb-2 line-clamp-2
                              ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
                >
                  {item.title}
                </h3>
                <p
                  className={`text-sm font-semibold mb-2
                              ${isDarkTheme ? 'text-gray-300' : 'text-gray-500'}`}
                >
                  {item.date}
                </p>
                <p
                  className={`text-sm font-medium flex-grow line-clamp-4
                              ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  {item.description}
                </p>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </motion.section>
  );
};
