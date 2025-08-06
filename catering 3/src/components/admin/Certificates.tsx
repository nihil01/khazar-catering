import React, { useState } from "react";

type AboutProps = {
    baseUrl: string;
}

type PartnersForm = {
    images: File[] | null
};


export const Certificates: React.FC<AboutProps> = ({ baseUrl }) => {

    const [certificates, setCertificates] = useState<PartnersForm>({
        images: null
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const target = e.target;
        const {name} = target;

        const files = (target as HTMLInputElement).files;
        setCertificates((prev) => ({...prev, [name]: files}));

    };


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Отправленные данные:", certificates);

        const formData = new FormData();


        if (certificates.images) {
            for (let i = 0; i < certificates.images.length; i++) {
                formData.append("images", certificates.images[i]);
            }
        }

        try {
            const response = await fetch(`${baseUrl}/certificates`, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            }

            alert("Данные успешно отправлены!");

        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            alert("Произошла ошибка при отправке данных.");
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-6 text-black">
            <div className="bg-white shadow-xl rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-center text-gray-800">
                    SERTIFIKATLARIMIZ SEKSIYANI REDAKTE ET
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4" method="POST" encType="multipart/form-data">
                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                            Media fayllari yukleyin
                        </label>
                        <input
                            id="images"
                            name="images"
                            type="file"
                            multiple
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition"
                    >
                        SERTIFIKATLARIMIZ'da deyislikleri tedbiq etmek
                    </button>
                </form>
            </div>
        </div>
    );
};