import * as React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import type {Partners} from "../../utils/ResponseTypes.ts";
import {useLang} from "../../utils/LangContext.tsx";


type PartnersResponse = {
    data: Partners[];
}

export const Partners: React.FC<PartnersResponse> = ({data}) => {
  const { theme } = useTheme(); // Получаем текущую тему
  const { lang } = useLang();
  const isDarkTheme = theme === 'dark'; // Удобная переменная для условных классов

  return (
    <section
      id="partners"
      // Основной фон секции и цвет текста
      className={`py-16 px-4 md:px-8 scroll-mt-20 font-sans
                 ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <motion.div
          className="max-w-6xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {opacity: 0, x: -100},
            visible: {opacity: 1, x: 0}
          }}
          transition={{ delay: 0.2, duration: 0.6 }} // Задержка и длительность для всего контейнера
      >
        {/* Заголовок секции */}
        <h2 className={`text-4xl sm:text-5xl font-semibold tracking-wide mb-4 animate-fadeUp
                       ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
            {lang === "EN" ? "Our partners" : lang === "RU" ? "Наши партнёры" : "Bizim tərəfdaşlarımız"}
        </h2>
        {/* Подзаголовок секции */}
        <p className={`text-base md:text-lg mb-10 animate-fadeUp delay-200
                      ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
            {lang === "EN" ? "We are proud to cooperate with leading companies" : lang === "RU" ? "Мы гордимся сотрудничеством с ведущими компаниями" : "Biz aparıcı şirkətlərlə əməkdaşlıq etməkdən qürur duyuruq"}
        </p>

        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={30}
          navigation
          loop
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
          }}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          className="pb-6"
        >
          {data.map((item, index) => (
            <SwiperSlide key={item}>
              <div
                className={`p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center h-32
                           ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}`}
              >
                <img
                  src={`/static/${item.images}`} // Убедитесь, что пути к логотипам верны
                  alt={`Партнёр ${index}`}
                  className="max-h-24 object-contain"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>


        <div className="custom-pagination mt-4 flex justify-center gap-2" />
      </motion.div>
    </section>
  );
};