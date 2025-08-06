import React from "react";
import { motion } from "framer-motion";
import { AnimatedGrid } from "../../utils/cardRenderer.tsx";
import {
  FaFish,
  FaIndustry,
  FaUsers,
  FaShip,
  FaBoxes,
  FaClipboardCheck,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext.tsx";
import type {QueryResponse} from "../../utils/ResponseTypes.ts";
import {useLang} from "../../utils/LangContext.tsx";

// --- Framer Motion Animation Variants ---
const sectionVariants = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2,
      duration: 0.8,
      when: "beforeChildren",
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const paragraphVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const serviceItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

type Request = {

  res: QueryResponse | null

}

const icons = [
  <FaFish/>,
  <FaIndustry/>,
  <FaUsers/>,
  <FaShip/>,
  <FaBoxes/>,
  <FaClipboardCheck/>,
]

export const About: React.FC<Request> = ({ res }) => {
  const { theme } = useTheme();
  const isDarkTheme = theme === "dark";
  const { lang } = useLang();

    return (
    <motion.section
      id="about"
      className={`py-20 px-4 md:px-12 font-sans scroll-mt-20
        ${isDarkTheme ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
      initial={false}
      whileInView="visible"
      variants={sectionVariants}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className={`text-4xl sm:text-5xl font-extrabold tracking-tight mb-8 text-center
            ${isDarkTheme ? "text-white" : "text-gray-900"}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {lang === "EN" ? "About us": lang === "RU" ? "О нас" : "Bizim haqqimizda"}
        </motion.h2>

        <motion.div
          className={`mb-16 p-8 rounded-xl shadow-lg
            ${isDarkTheme ? "bg-gray-800" : "bg-white"}`}
          variants={itemVariants}
        >

          <motion.p
            className={`text-base md:text-lg leading-relaxed text-justify mb-4
              ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}
            variants={paragraphVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >

            {res?.getAbout.heading}

          </motion.p>

        </motion.div>

        <motion.h3
          className={`text-3xl sm:text-4xl font-semibold tracking-tight mb-10 text-center
            ${isDarkTheme ? "text-white" : "text-gray-900"}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {lang === "EN" ? "Our possibilities": lang === "RU" ? "Наши возможности" : "Bizim imkanlarimiz"}

        </motion.h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {res?.getAbout.abilities.split("\n").filter(value => value.trim() != "")
              .map((feature, index) => {
            return (
              <motion.div
                key={index}
                className={`flex items-start gap-4 p-6 rounded-lg shadow-md
                  ${isDarkTheme ? "bg-gray-800" : "bg-white"}
                  ${isDarkTheme ? "border border-gray-700" : "border border-gray-300"}`}
                variants={serviceItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >

                <div className="text-3xl text-orange-400">
                  {icons[index]}
                </div>

                <p
                  className={`text-base md:text-lg leading-relaxed
                    ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}
                >
                  {feature}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.h3
          className={`text-3xl sm:text-4xl font-semibold tracking-tight mb-10 text-center
            ${isDarkTheme ? "text-white" : "text-gray-900"}`}
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {lang === "EN" ? "Our Team": lang === "RU" ? "Наша Команда" : "Bizim Komandamiz"}

        </motion.h3>

        <AnimatedGrid
          items={res?.getAllEmployees}
          renderItem={(item) => (
            <motion.figure
              className={`flex flex-col items-center text-center p-4 rounded-xl shadow-md transition-all duration-300
                ${isDarkTheme ? "bg-gray-800" : "bg-white"}
                ${isDarkTheme ? "hover:bg-gray-700" : "hover:bg-gray-50"}
                ${isDarkTheme ? "border border-gray-700" : "border border-gray-300"}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <img
                src={"/static/" +item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-full shadow-lg mb-4 hover:scale-105 transition-transform duration-300"
              />
              <figcaption className="text-center mt-2">
                <div className="text-lg font-semibold text-orange-400">
                  {item.name}
                </div>
                <div className={`text-sm italic ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
                  {item.position}
                </div>
              </figcaption>


            </motion.figure>
          )}
        />
      </div>
    </motion.section>
  );
};
