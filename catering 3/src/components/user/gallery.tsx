// src/components/OrderPage.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useTheme } from "./ThemeContext";
import type {QueryResponse} from "../../utils/ResponseTypes.ts";
import {useLang} from "../../utils/LangContext.tsx";

type GalleryProps = {
  res: QueryResponse
}

export const Gallery: React.FC<GalleryProps> = ({ res }) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const {lang} = useLang();
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const sectionBg = isDarkTheme ? "bg-gray-900" : "bg-gray-50";
  const textColor = isDarkTheme ? "text-gray-200" : "text-gray-800";
  const headingColor = isDarkTheme ? "text-gray-200" : "text-gray-800";

  const cardShadow = isDarkTheme
    ? "shadow-xl shadow-gray-900/40"
    : "shadow-lg shadow-gray-200/50";
  const cardHoverShadow = isDarkTheme
    ? "hover:shadow-2xl hover:shadow-gray-900/60"
    : "hover:shadow-xl hover:shadow-gray-300/60";

  const transitionClass = "transition-all duration-300 ease-in-out";

  const modalOverlayBg = "bg-black/80";
  const modalCloseButtonBg = isDarkTheme
    ? "bg-white/10 hover:bg-white/20"
    : "bg-black/10 hover:bg-black/20";
  const modalCloseButtonText = isDarkTheme ? "text-white" : "text-black";
  const modalImageBorder = isDarkTheme ? "border-gray-700" : "border-gray-300";

  return (
    <section
      id="gallery"
      className={`pt-20 py-10 px-4 md:px-12 lg:px-20 font-sans scroll-mt-20 ${sectionBg} ${textColor}`}
    >
      <motion.h2

        initial={false}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        className={`text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-16 text-center ${headingColor}`}
      >

        {lang == "EN" ? "Our Portfolio" : lang === "AZ" ? "Bizim Portfolio" : "Наше портфолио"}

      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 justify-items-center">
        {res.getGallery.map((gallery, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: i * 0.05,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.3 }}
            className={`relative w-full aspect-[4/3] rounded-lg overflow-hidden cursor-pointer group ${cardShadow} ${cardHoverShadow} ${transitionClass}`}
          >
            <LazyLoadImage
              src={`/static/${gallery.image}`}
              alt={`Галерея Изображение ${i + 1}`}
              effect="blur"
              placeholderSrc={
                isDarkTheme
                  ? "/placeholder-dark.webp"
                  : "/placeholder-light.webp"
              }
              className={`w-full h-full object-cover ${transitionClass} group-hover:scale-103`}
              onClick={() => setActiveImage(`/static/${gallery.image}`)}
              loading="lazy"
            />
            <div
              className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 ${transitionClass} flex items-center justify-center`}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-white text-base font-semibold px-5 py-2 rounded-full bg-white/20 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage(`/static/${gallery.image}`);
                }}
              >
                {gallery.name}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`fixed inset-0 ${modalOverlayBg} z-[100] flex items-center justify-center p-4`}
            onClick={() => setActiveImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={`absolute -top-3 -right-3 sm:-top-4 sm:-right-4 rounded-full p-2 sm:p-3 shadow-md transition-all duration-200 z-10 ${modalCloseButtonBg} ${modalCloseButtonText}`}
                onClick={() => setActiveImage(null)}
                aria-label="Закрыть изображение"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 sm:h-7 sm:w-7"
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
                alt="Полноразмерное изображение галереи"
                className={`max-w-[95vw] max-h-[90vh] w-auto h-auto rounded-lg shadow-2xl border ${modalImageBorder} object-contain`}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
