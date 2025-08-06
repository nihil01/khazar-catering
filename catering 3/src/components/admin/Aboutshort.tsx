import React, { useState } from "react";

interface AboutShortProps {
  baseUrl: string;
}

export const AboutShort: React.FC<AboutShortProps> = ({ baseUrl }) => {
  const [services, setServices] = useState<string>("");
  const [lang, setLang] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [descript, setDescript] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("services", services);
    formData.append("lang", lang);
    formData.append("description", description);
    formData.append("subtext", descript);

    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/aboutUsShort`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData
      });
      if (response.ok) {
        alert("About Short section updated successfully!");
      } else {
        alert("Failed to update About Short section.");
      }
    } catch (err) {
      alert("An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto text-black">
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Basliq
          </label>
          <input
              id="subtext"
              type="text"
              value={description}
              onChange={event => setDescription(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700">
            Xidmetlerimiz
          </label>
          <textarea
              id="services"
              rows={2}
              value={services}
              onChange={event => setServices(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div>
          <label htmlFor="details" className="block text-sm font-medium text-gray-700">
            Tesvir
          </label>
          <textarea
              id="description"
              rows={4}
              value={descript}
              onChange={event => setDescript(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="lang" className="block text-sm font-medium text-gray-700">
            Dili secin
          </label>
          <select
              id="lang"
              name="lang"
              value={lang}
              onChange={event => setLang(event.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="az">AZ</option>
            <option value="en">EN</option>
            <option value="ru">RU</option>

          </select>
        </div>

        <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-md text-white transition duration-200 ${
                isLoading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
            }`}
        >
          {isLoading ? "Saving..." : "Save Hero"}
        </button>
      </form>
    </div>
  );
};