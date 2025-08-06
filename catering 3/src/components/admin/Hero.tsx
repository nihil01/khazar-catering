import React, { useState } from "react";

interface HeroProps {
  baseUrl: string;
}

export const Hero: React.FC<HeroProps> = ({ baseUrl }) => {

  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File[] | null>(null);
  const [descr, setDescr] = useState<string>("");
  const [lang, setLang] = useState<string>("AZ");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("subtitle", title);
    formData.append("details", descr);
    formData.append("lang", lang);

    if (image){

      for (let i = 0; i < image.length; i++) {
        formData.append("files", image[i]);
      }

    }

    try {
      const response = await fetch(`${baseUrl}/hero`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (response.ok) {
        alert("Hero section updated successfully!");
        setTitle("");
        setImage(null);
      } else {
        alert("Failed to update hero section.");
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
            Hero Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter hero title"
            required
          />
        </div>
        <div>

          <label className="block mb-1 font-semibold">Təsvir</label>

          <textarea
              name={"details"}
              className="w-full border border-gray-300 rounded-md p-2"
              rows={4}
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
          />

        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Hero Image
          </label>
          <input
            id="image"
            type="file"
            multiple
            onChange={(e) => setImage(e.target.files ? Array.from(e.target.files) : null)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div>
          <label htmlFor="lang" className="block text-sm font-medium text-gray-700">
            Diller
          </label>
          <select
              id="lang"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="AZ">AZ</option>
            <option value="EN">EN</option>
            <option value="RU">RU</option>
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