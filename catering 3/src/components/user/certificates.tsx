import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import {useLang} from "../../utils/LangContext.tsx";
import type {Certificates} from "../../utils/ResponseTypes.ts";


type CertificatesProps = {

    data: Certificates[]

}

export const Certificates: React.FC<CertificatesProps> = ({ data }) => {

  const { theme } = useTheme(); // Получаем текущую тему
  const isDarkTheme = theme === 'dark'; // Удобная переменнаяconst
    const { lang } = useLang();
  // Убедитесь, что пути к изображениям сертификатов верны
  // Например, если они в src/assets/certs/, то '/assets/certs/cert1.jpeg'
  const certificates = ["/certs/cert1.jpeg", "/certs/cert2.jpeg"];
  const [activeImage, setActiveImage] = useState<string | null>(null);



  return (
      <section
          id="certificates"
          // Основной фон секции и цвет текста
          className={`py-20 px-4 md:px-10 font-sans scroll-mt-20
                     ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
      >
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              // Заголовок: основной цвет текста
              className={`text-4xl sm:text-5xl font-semibold tracking-wide mb-4
                         ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
          >
              {lang === 'EN' ? "Our Certificates" :
                  lang === 'RU' ? "Наши сертификаты" :
                      "Sertifikatlarimiz"}
          </motion.h2>

          <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              // Подзаголовок: второстепенный цвет текста
              className={`text-base md:text-lg mb-12 max-w-3xl mx-auto
                         ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}
          >
              {lang === 'EN' ? "“Xəzər İaşə” meets international ISO standards and guarantees high quality and safety." :
                  lang === 'RU' ? "“Xəzər İaşə” соответствует международным стандартам ISO и гарантирует высокое качество и безопасность." :
                      "“Xəzər İaşə” beynəlxalq ISO standartlarına uyğun gəlir və yüksək keyfiyyətlə təhlükəsizliyi təmin edir."}

          </motion.p>

          <div className="flex justify-center gap-8 flex-wrap">
            {data.map((certificate, index) => {
              return (
                  <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }} // Убрал 'hidden'/'visible' варианты, так как transition задан прямо здесь
                      whileInView={{ opacity: 1, y: 0 }} // Вместо animate="visible"
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                      viewport={{ once: true }} // Важно для whileInView
                      onClick={() => setActiveImage("/static/"+certificate.images)}
                      // Граница карточки сертификата
                      className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:cursor-pointer
                                 ${isDarkTheme ? 'border border-gray-700' : 'border border-gray-300'}`}
                  >
                    <img
                        src={"/static/"+certificate.images}
                        alt={`Сертификат ${index + 1}`}
                        className="w-64 h-80 object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                    />
                  </motion.div>
              );
            })}
          </div>
        </div>

        {activeImage && (
            <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
              <div className="relative">
                <button
                    // Стиль кнопки закрытия модального окна
                    className={`absolute -top-4 -right-4 rounded-full p-2 shadow-lg transition
                               ${isDarkTheme ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-200'}`}
                    onClick={() => setActiveImage(null)}
                    aria-label="Закрыть"
                >
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                  >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <img
                    src={activeImage}
                    alt="Сертификат"
                    // Рамка вокруг увеличенного изображения
                    className={`max-w-full max-h-[90vh] rounded-xl shadow-2xl border-4
                               ${isDarkTheme ? 'border-gray-300' : 'border-gray-500'}`} // Меняем цвет рамки
                />
              </div>
            </div>
        )}
      </section>
  );
};