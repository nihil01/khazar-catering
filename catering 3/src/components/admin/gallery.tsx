import React, { useState, useEffect } from "react";

interface GalleryItem {
  id: string;
  title: string;
  image: File | null;
}

interface GalleryProps {
  baseUrl: string;
}

export const Gallery: React.FC<GalleryProps> = ({ baseUrl }) => {
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", title);

    if (image){
      formData.append("image", image);
    }
    try {

      console.log("SENT DATA");
      console.log(formData);

      const response = await fetch(`${baseUrl}/gallery`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      if (response.ok) {
        alert("Haqqımızda bölməsi uğurla yeniləndi!");

      } else {
        alert("Haqqımızda bölməsini yeniləmək mümkün olmadı.");
      }
    } catch (err) {
      alert("Xəta baş verdi.");
    } finally {
      setIsLoading(false);
    }

  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto font-inter text-black">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          {"Qalereya elementini əlavə et"}
        </h2>
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
            placeholder="Qalereya elementinin adını daxil edin"
            required
          />
        </div>
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Şəkil
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 py-2 rounded-md text-white transition duration-200 ${
              isLoading ? "bg-blue-500 cursor-not-allowed" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            {isLoading ? "Yadda saxlanılır...": "Əlavə et"}
          </button>
        </div>
      </form>
    </div>
  );
};
