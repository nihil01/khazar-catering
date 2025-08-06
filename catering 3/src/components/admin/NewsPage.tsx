import React, { useState } from "react";

export const NewsPage: React.FC = () => {
  const [baseUrl] = useState<string>("/api/v1/news");
  const [title, setTitle] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !date || !description || !image) {
      setMessage("Bütün sahələri doldurun");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("date", date);
      formData.append("description", description);
      formData.append("image", image);

      const response = await fetch(baseUrl, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setMessage("Xəbər uğurla əlavə olundu!");
        setTitle("");
        setDate("");
        setDescription("");
        setImage(null);
      } else {
        setMessage("Xəbəri əlavə edərkən səhv baş verdi");
      }
    } catch (error) {
      setMessage("Serverlə əlaqə qurmaq mümkün olmadı");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center">
      {/* Xəbər əlavəetmə forması */}
      <div className="w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6 text-center">Xəbər əlavə et</h1>
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 space-y-4"
        >
          <div>
            <label className="block mb-1 font-semibold">Başlıq</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Tarix</label>
            <input
              type="date"
              className="w-full border border-gray-300 rounded-md p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Təsvir</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Şəkil</label>
            <input
              type="file"
              accept="image/*"
              className="w-full"
              onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition duration-200"
          >
            {isSubmitting ? "Göndərilir..." : "Xəbər əlavə et"}
          </button>

          {message && (
            <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};
