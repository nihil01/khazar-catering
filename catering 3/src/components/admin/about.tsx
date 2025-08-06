import React, { useState } from "react";

interface AboutProps {
  baseUrl: string;
}

export const About: React.FC<AboutProps> = ({ baseUrl }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lang, setLang] = useState<string>("AZ");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("heading", title);
    formData.append("abilities", description);
    formData.append("lang", lang);

    setIsLoading(true);
    try {

      console.log("SENT DATA");
      console.log(formData);

      const response = await fetch(`${baseUrl}/aboutUs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (response.ok) {
        alert("Haqqımızda bölməsi uğurla yeniləndi!");
        setTitle("");
        setDescription("");
      } else {
        alert("Haqqımızda bölməsini yeniləmək mümkün olmadı.");
      }
    } catch (err) {
      alert("Xəta baş verdi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto text-black">
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Başlıq
          </label>

          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Haqqımızda başlığını daxil edin"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Təsvir
          </label>

          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Haqqımızda təsvirini daxil edin"
            rows={5}
            required
          />
        </div>

        <div>
          <label htmlFor="lang" className="block text-sm font-medium text-gray-700">
            Dili secin
          </label>
          <select
              id="lang"
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
          {isLoading ? "Yadda saxlanılır..." : "Haqqımızda bölməsini yadda saxla"}
        </button>
      </form>
    </div>
  );
};
