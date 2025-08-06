import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";
import { useTheme } from "./ThemeContext";
import {useLang} from "../../utils/LangContext.tsx";

export const Contact: React.FC = () => {
    // Используем useTheme() из нашего контекста для определения текущей темы
    const { theme } = useTheme();
    const isDarkTheme = theme === 'dark'; // Булева переменная для удобства

    const { lang } = useLang();
    const sectionRef = useRef(null);
    const [isSectionVisible, setIsSectionVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsSectionVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "XXXX",
        // Добавляем параметр language, если нужно
        // language: "ru"
    });

    const mapContainerStyle = {
        width: "100%",
        height: "450px",
    };

    // Стили для темной карты
    const darkMapStyle = [
        { elementType: "geometry", stylers: [{ color: "#212121" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
        { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#373737" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#8a8a8a" }] },
        { featureType: "transit", elementType: "geometry", stylers: [{ color: "#2f3948" }] },
        { featureType: "water", stylers: [{ color: "#000000" }] },
    ];

    // Стили для светлой карты (более нейтральный или светлый вариант)
    // Это базовый светлый стиль Google Maps, можно настроить через https://mapstyle.withgoogle.com/
    const lightMapStyle = [
        { elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { elementType: "labels.text.fill", stylers: [{ color: "#616161" }] },
        { elementType: "labels.text.stroke", stylers: [{ color: "#f5f5f5" }] },
        { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#757575" }] },
        { featureType: "poi", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
        { featureType: "transit", elementType: "geometry", stylers: [{ color: "#e5e5e5" }] },
        { featureType: "water", stylers: [{ color: "#c9c9c9" }] },
    ];


    const center = { lat: 40.39017, lng: 49.886789 };

    return (
        <section
            id="contact"
            // Основной фон секции и цвет текста
            className={`py-16 px-6 sm:px-12 lg:px-20 font-sans scroll-mt-20 min-h-screen flex items-center justify-center
                       ${isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
        >
            <div className="max-w-6xl w-full mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -30 }}
                    animate={isSectionVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7 }}
                    // Заголовок: основной цвет текста
                    className={`text-4xl sm:text-5xl font-semibold tracking-wide mb-12 text-center
                               ${isDarkTheme ? 'text-white' : 'text-gray-900'}`}
                >
                    {lang === "RU" ? "Контакты" : lang === "AZ" ? "Əlaqə" : "Contacts"}
                </motion.h1>

                <div
                    ref={sectionRef}
                    className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start"
                >
                    {/* Left Column */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={isSectionVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        // Фон карточки, рамка
                        className={`p-8 md:p-10 rounded-2xl shadow-xl
                                   ${isDarkTheme ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-300'}`}
                    >
                        {/* Адрес: второстепенный цвет текста */}
                        <div className={`flex items-center gap-3 text-lg mb-8 text-center md:text-left
                                         ${isDarkTheme ? 'text-gray-300' : 'text-gray-700'}`}>
                            <FaMapMarkerAlt className="text-orange-400 text-xl" />
                            <p>
                                Azərbaycan, Bakı, AZ1030, Xətai rayonu, Babək prospekti 28 С
                            </p>
                        </div>

                        <ul className="space-y-6 text-lg">
                            {[
                                "+994 50 221 52 40",
                                "+994 99 351 54 64",
                                "+994 12 526 01 64",
                            ].map((phone, i) => (
                                <li
                                    key={i}
                                    // Фон элемента списка, ховер-эффект
                                    className={`flex items-center gap-4 p-3 rounded-lg transition duration-300 cursor-pointer group
                                               ${isDarkTheme ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}
                                >
                                    <FaPhone className="text-orange-400 text-xl group-hover:scale-110 transition-transform" />
                                    {/* Цвет ссылки: основной цвет текста, ховер-эффект */}
                                    <a href={`tel:${phone}`}
                                       className={`${isDarkTheme ? 'text-gray-200 hover:text-teal-400' : 'text-gray-800 hover:text-blue-600'}`}>
                                        {phone}
                                    </a>
                                </li>
                            ))}

                            <li className={`flex items-center gap-4 p-3 rounded-lg transition duration-300 cursor-pointer group
                                           ${isDarkTheme ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300'}`}>
                                <FaEnvelope className="text-orange-400 text-xl group-hover:scale-110 transition-transform" />
                                <a
                                    href="mailto:office@khazariasha.az"
                                    className={`hover:underline transition-colors duration-200
                                               ${isDarkTheme ? 'text-gray-200 hover:text-white' : 'text-gray-800 hover:text-gray-900'}`}
                                >
                                    office@khazariasha.az
                                </a>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Right Column: Map */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isSectionVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        // Рамка вокруг карты
                        className={`w-full rounded-xl overflow-hidden shadow-2xl h-[450px]
                                   ${isDarkTheme ? 'border border-gray-700' : 'border border-gray-300'}`}
                    >
                        {isLoaded ? (
                            <GoogleMap
                                options={{
                                    // Динамически применяем стили карты в зависимости от темы
                                    styles: isDarkTheme ? darkMapStyle : lightMapStyle,
                                    disableDefaultUI: true,
                                    zoomControl: true,
                                    mapId: "YOUR_MAP_ID_HERE", // Убедитесь, что ваш Map ID актуален
                                }}
                                mapContainerStyle={mapContainerStyle}
                                center={center}
                                zoom={17}
                            >
                                <MarkerF
                                    position={center}
                                    animation={google.maps.Animation.DROP}
                                    icon={{
                                        // Если логотип должен меняться для светлой/темной темы,
                                        // или его цвет должен адаптироваться, это можно сделать здесь.
                                        // Например, у вас есть темный и светлый логотип.
                                        url: "/static/logo.svg", // Или isDarkTheme ? "/logo-dark.svg" : "/logo-light.svg"
                                        scaledSize: new google.maps.Size(120, 80),
                                    }}
                                    title={"KHAZAR IASHA MMC"}
                                />
                            </GoogleMap>
                        ) : (
                            <div className={`flex items-center justify-center h-full text-lg
                                             ${isDarkTheme ? 'bg-gray-800 text-gray-400' : 'bg-gray-200 text-gray-600'}`}>
                                Карта не загружена...
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};