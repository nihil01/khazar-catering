import React, {useCallback, useState} from "react";

interface TeamProps {
  baseUrl: string;
}

export const Team: React.FC<TeamProps> = ({ baseUrl }) => {
  const [name, setName] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);


  const deleteUser = useCallback(async () => {

    if (!name) return;

    fetch(`${baseUrl}/delUser/${name}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    }).then(res => {
      if (res.status === 200) {
        alert("Istifadeci silindi!")
      }else{
        alert("Istifadecini silmek mumkun olmadi!")
      }
    })

  }, [baseUrl, name])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("position", position);

    if (image) {
      formData.append("image", image);
    }


    setIsLoading(true);
    try {

      console.log("SENT DATA");
      console.log(formData);

      const response = await fetch(`${baseUrl}/addEmployee`, {
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
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto text-black">
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <h2 className="text-xl font-semibold text-gray-800">
          {"Komanda üzvü əlavə et"}
        </h2>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Üzvün adı
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Komanda üzvünün adını daxil edin"
            required
          />
        </div>
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Vəzifə
          </label>
          <input
            id="role"
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Komanda üzvünün vəzifəsini daxil edin"
            required
          />
        </div>
        <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700">
            Üzvün şəkli
          </label>
          <input
            id="photo"
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
            {isLoading
              ? "Yadda saxlanılır..."
              : "Komanda üzvü əlavə et"}
          </button>

          <button
              type="button"
              onClick={deleteUser}
              className={`flex-1 py-2 rounded-md text-white transition duration-200 bg-red-800`}
          >
            Yazdiginiz istifadecini silmek
          </button>
        </div>
      </form>
    </div>
  );
};
