import React, { useState } from "react";
import { Hero } from "./Hero.tsx";
import { About } from "./About.tsx";
import { AboutShort } from "./Aboutshort.tsx";
import { Partners } from "./Partners.tsx";
import { Certificates } from "./Certificates.tsx";
import { Team } from "./team.tsx";
import { Gallery } from "./gallery.tsx";
import { NewsPage } from "./NewsPage.tsx";

export const AdminPage: React.FC = () => {
  const [baseUrl] = useState<string>("/api/v1/add");
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState<boolean>(false);
  const [isHaqqimizdaDropdownOpen, setIsHaqqimizdaDropdownOpen] = useState<boolean>(false);
  const [, setIsContactsDropdownOpen] = useState<boolean>(false);

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return <Hero baseUrl={baseUrl} />;
      case "aboutshort":
        return <AboutShort baseUrl={baseUrl} />;
      case "partners":
        return <Partners baseUrl={baseUrl} />;
      case "certificates":
        return <Certificates baseUrl={baseUrl} />;
      case "gallery":
        return <Gallery baseUrl={baseUrl} />;
      case "about":
        return <About baseUrl={baseUrl} />;
      case "team":
        return <Team baseUrl={baseUrl} />;
      case "news":
        return <NewsPage baseUrl={baseUrl} />;
      default:
        return <Hero baseUrl={baseUrl} />;
    }
  };

  const handleSectionSelect = (section: string) => {
    setActiveSection(section);
    setIsMainDropdownOpen(false);
    setIsHaqqimizdaDropdownOpen(false);
    setIsContactsDropdownOpen(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Боковая панель */}
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <nav className="flex-1 p-4 space-y-2">
          {/* Меню Əsas səhifə */}
          <div className="relative">
            <button
              onClick={() => {
                setIsMainDropdownOpen(!isMainDropdownOpen);
                setIsHaqqimizdaDropdownOpen(false);
                setIsContactsDropdownOpen(false);
              }}
              className="w-full text-left p-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition duration-200"
            >
              Əsas səhifə
            </button>
            {isMainDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-full bg-gray-700 rounded-md shadow-lg z-10">
                {["hero", "aboutshort", "partners", "certificates"].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => handleSectionSelect(section)}
                      className={`w-full text-left p-2 capitalize text-white hover:bg-gray-600 ${
                        activeSection === section ? "bg-blue-600" : "bg-gray-700"
                      }`}
                    >
                      {section === "aboutshort" ? "About Short" : section}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Меню Haqqımızda */}
          <div className="relative">
            <button
              onClick={() => {
                setIsHaqqimizdaDropdownOpen(!isHaqqimizdaDropdownOpen);
                setIsMainDropdownOpen(false);
                setIsContactsDropdownOpen(false);
              }}
              className="w-full text-left p-2 rounded-md bg-blue-700 text-white hover:bg-blue-800 transition duration-200"
            >
              Haqqımızda
            </button>
            {isHaqqimizdaDropdownOpen && (
              <ul className="absolute left-0 mt-2 w-full bg-gray-700 rounded-md shadow-lg z-10">
                {["about", "team"].map((section) => (
                  <li key={section}>
                    <button
                      onClick={() => handleSectionSelect(section)}
                      className={`w-full text-left p-2 capitalize text-white hover:bg-gray-600 ${
                        activeSection === section ? "bg-blue-600" : "bg-gray-700"
                      }`}
                    >
                      {section}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Gallery без подотдела */}
          <div className="relative">
            <button
              onClick={() => handleSectionSelect("gallery")}
              className={`w-full text-left p-2 rounded-md ${
                activeSection === "gallery" ? "bg-blue-600" : "bg-blue-700"
              } text-white hover:bg-blue-800 transition duration-200`}
            >
              Gallery
            </button>
          </div>

          {/* Contacts */}
          <div className="relative">
            <button
              onClick={() => handleSectionSelect("contacts")}
              className={`w-full text-left p-2 rounded-md ${
                activeSection === "contacts" ? "bg-blue-600" : "bg-blue-700"
              } text-white hover:bg-blue-800 transition duration-200`}
            >
              Contacts
            </button>
          </div>

          {/* News */}
          <div className="relative">
            <button
              onClick={() => handleSectionSelect("news")}
              className={`w-full text-left p-2 rounded-md ${
                activeSection === "news" ? "bg-blue-600" : "bg-blue-700"
              } text-white hover:bg-blue-800 transition duration-200`}
            >
              News
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.reload();
            }}
            className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex-1">{renderSection()}</div>
    </div>
  );
};
