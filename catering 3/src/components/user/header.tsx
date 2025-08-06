import React, {useState} from "react";
import {Link} from "wouter";
import {ThemeToggle} from "./ThemeToggle";
import LanguageSelector from "../../utils/LanguageSelector.tsx";

interface Language {
    lang: "AZ" | "EN" | "RU",
}

const Header: React.FC<Language> = ({lang}) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const translations = {

        EN: {

            main: "Main page",
            about: "About us",
            gallery: "Gallery",
            contacts: "Contacts",
            news: "News",
            order: "Make order",

        },

        RU: {

            main: "Главная страница",
            about: "О нас",
            gallery: "Галерея",
            contacts: "Контакты",
            news: "Новости",
            order: "Сделать заказ"

        },

        AZ: {

            main: "Əsas səhifə",
            about: "Haqqımızda",
            gallery: "Qalereya",
            contacts: "Əlaqələr",
            news: "Xəbərlər",
            order: "Sifariş etmək"

        }

    } as const;

    const navLinks = [
        {label: translations[lang].main, href: "/"},
        {label: translations[lang].about, href: "/about"},
        {label: translations[lang].gallery, href: "/gallery"},
        {label: translations[lang].contacts, href: "/contact"}
    ];

    return (
        <header className="w-full fixed top-0 left-0 z-50 bg-gray-900/70 backdrop-blur-md text-white font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <img src={"/static/logo.svg"} alt="Logo" className="h-10 w-auto"/>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center justify-center flex-1 gap-6 text-sm font-medium">
                    <LanguageSelector/>
                    <nav className="flex gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="relative px-2 py-1 text-center group hover:text-orange-400 transition-colors duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {link.label}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-[3.3px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center gap-4">
                    <Link
                        href="/orderpage" // <-- исправленный маршрут
                        className="px-4 py-2 rounded-md font-semibold text-sm transition-colors bg-gray-700 text-white hover:bg-gray-600"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        {translations[lang].order}
                    </Link>
                    <ThemeToggle/>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle/>
                    <button
                        className="p-2 text-theme-primary"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Переключить мобильное меню"
                    >
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            {mobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-gray-900/70 backdrop-blur-md border-t border-gray-600/30">
                    <nav className="flex flex-col items-center gap-4 py-4 text-sm font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="relative px-4 py-2 text-center group hover:text-orange-400 transition-colors duration-200"
                            >
                                {link.label}
                                <span
                                    className="absolute bottom-0 left-0 w-0 h-[2px] bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        ))}
                        <LanguageSelector/>

                        <Link
                            href="/orderpage"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-2 px-4 py-2 rounded-md font-semibold text-sm transition-colors bg-gray-700 text-white hover:bg-gray-600"
                        >
                            {translations[lang].order}
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
