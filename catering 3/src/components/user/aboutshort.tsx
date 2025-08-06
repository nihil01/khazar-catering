import * as React from "react";
import { FaTruck, FaClipboardList, FaUtensils, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import {TypewriterText} from "../../utils/TypeWriter.tsx";
import { useTheme } from "./ThemeContext.tsx";
import type {AboutShort} from "../../utils/ResponseTypes.ts";
import {useLang} from "../../utils/LangContext.tsx";

type AboutShortResponse =  {

    data: AboutShort

}

// Обновляем fadeLeft, добавляя delay внутри 'visible'
const fadeLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: (custom: number = 0) => ({ // Добавляем 'custom' пропс для delay
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: custom // Используем custom для задержки
        }
    })
};

// Обновляем fadeUp, добавляя delay внутри 'visible'
const fadeUp = {
    hidden: { opacity: 0, y: 100 },
    visible: (custom: number = 0) => ({ // Добавляем 'custom' пропс для delay
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            delay: custom
        }
    })
};

export const AboutShort: React.FC<AboutShortResponse> = ({ data }) => {
    const { theme } = useTheme();
    const { lang } = useLang()
    const isDarkTheme = theme === 'dark';

    const translations = {
        EN: [
            {
                title: "Food Delivery",
                text: "Fast and reliable delivery to your location",
            },
            {
                title: "Custom Menu",
                text: "We create a menu tailored to your taste and preferences",
            },
            {
                title: "Delicious Offers",
                text: "Varied and appetizing dishes for every day",
            },
            {
                title: "24/7 Service",
                text: "We're always available — anytime, any day",
            }
        ],
        RU: [
            {
                title: "Доставка еды",
                text: "Быстрая и надёжная доставка до вашего объекта",
            },
            {
                title: "Индивидуальное меню",
                text: "Составим меню по вашему вкусу и предпочтениям",
            },
            {
                title: "Вкусные предложения",
                text: "Разнообразные и аппетитные блюда на каждый день",
            },
            {
                title: "24/7 Обслуживание",
                text: "Мы всегда на связи — в любое время, в любой день",
            }
        ],
        AZ: [
            {
                title: "Yemək çatdırılması",
                text: "Sürətli və etibarlı çatdırılma xidmətimiz var",
            },
            {
                title: "Fərdi menyu",
                text: "Zövqünüzə uyğun menyu tərtib edirik",
            },
            {
                title: "Ləzzətli təkliflər",
                text: "Hər gün üçün müxtəlif və iştahaaçan yeməklər",
            },
            {
                title: "24/7 Xidmət",
                text: "İstənilən vaxt, istənilən gün xidmətinizdəyik",
            }
        ]
    } as const;

    const icons = [
        <FaTruck className="text-4xl text-orange-400 mb-3" />,
        <FaClipboardList className="text-4xl text-blue-400 mb-3" />,
        <FaUtensils className="text-4xl text-green-400 mb-3" />,
        <FaClock className="text-4xl text-purple-400 mb-3" />
    ];

    const cards = translations[lang];

    return (
        <section className={`px-6 py-16 font-sans
                            ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
                 id="aboutshort">
            {/* Header */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeLeft}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h3 className={`text-3xl font-bold text-center mb-4
                                ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>

                    {lang === "EN" ? "About Us" : lang === "RU" ? "О нас" : "Haqqimizda"}
                </h3>

                <h4 className={`text-xl sm:text-2xl font-normal mt-3
                               ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                    {data.subtext}
                </h4>
            </motion.div>

            {/* Main Text */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                // Передаем задержку через custom пропс
                custom={0.2} // <-- Вот как мы передаем задержку теперь
                variants={fadeLeft}
                className={`mb-12 max-w-4xl mx-auto text-center leading-relaxed text-base
                            ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}
            >
                <p>
                    <span className={`font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>{data.description}</span>
                </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-5xl mx-auto mb-20">
                {cards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.2 * index}
                        variants={fadeUp}
                        className={`flex flex-col items-center p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300
                        ${isDarkTheme ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'}`}
                    >
                        {icons[index]}
                        <h5 className={`text-lg font-semibold ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>
                            {card.title}
                        </h5>
                        <p className={`text-sm mt-1 ${isDarkTheme ? 'text-gray-400' : 'text-gray-600'}`}>
                            {card.text}
                        </p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0.3}
                variants={fadeLeft}
                className={`max-w-5xl mx-auto space-y-10
                            ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}
            >
                <h3 className={`text-3xl font-bold text-center mb-4
                                ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}>

                    {lang === "EN" ? "Our services" : lang === "RU" ? "Что мы предлагаем" : "Xidmətlərimiz"}

                </h3>

                <div className="space-y-4">
                    {data.services?.split("\n").filter(line => line.trim() !== "").map((line, index) => (
                        <div key={index} className="flex items-start gap-2">
                            <span className="text-orange-400 font-bold text-lg">{index + 1}.</span>
                            <TypewriterText text={line}/>
                        </div>
                    ))}
                </div>

            </motion.div>
        </section>
    );
};