// src/components/Footer.tsx
import React from 'react';
import { FaInstagram, FaFacebook } from "react-icons/fa";
import {Link} from "wouter";


export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
      <footer className="bg-gray-800 text-gray-400 py-8 px-6 sm:px-12 lg:px-20 font-sans">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* Левая часть: текст + админ-ссылка */}
              <div className="text-center sm:text-left">
                  <p>&copy; Xəzər İaşə 2012—{currentYear}.</p>
                  <Link
                      to="/admin"
                      className="text-gray-500 text-xs opacity-40 hover:opacity-80 transition-opacity block mt-1"
                      style={{ userSelect: "text" }}
                  >
                      Admin panel
                  </Link>
              </div>

              {/* Центр: Соцсети */}
              <div className="flex gap-6 text-2xl">
                  <a
                      href="https://instagram.com/khazariasha.az/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors duration-200"
                  >
                      <FaInstagram />
                  </a>
                  <a
                      href="https://www.facebook.com/share/4me5PwZXrw8oZkGz/?mibextid=qi2Omg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors duration-200"
                  >
                      <FaFacebook />
                  </a>
              </div>

              {/* Правая часть: Логотип */}
              <div className="w-20 sm:w-24">
                  <img
                      src="/static/logo.svg"
                      className="w-full h-auto object-contain"
                      alt="Logotip"
                  />
              </div>
          </div>
      </footer>
  );
};