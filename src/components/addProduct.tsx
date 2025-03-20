import { useNavigate } from "react-router-dom";
import {ChangeEvent, FormEvent, useState} from "react";

export default function AddProduct() {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(true);
    const [imageName, setImageName] = useState("");

    const [formData, setFormData] = useState({
        id: "",
        name: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
        description: "", // Added description field
        image: null,
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFormData((prev) => ({
                ...prev,
                image: file,
            }));
            setImageName(file.name);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("id", formData.id);
        formDataToSend.append("name", formData.name);
        formDataToSend.append("category", formData.category);
        formDataToSend.append("brand", formData.brand);
        formDataToSend.append("price", formData.price);
        formDataToSend.append("stock", formData.stock);
        formDataToSend.append("description", formData.description); // Append description
        if (formData.image) {
            formDataToSend.append("image", formData.image);
        }

        try {
            const response = await fetch("http://localhost:5000/api/product", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                alert("Product added successfully!");
                setIsOpen(false);
                navigate(-1);
            } else {
                const errorData = await response.json(); // Parse error response
                alert(`Failed to add product: ${errorData.message || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong.");
        }
    };

    return (
        isOpen && (
            <div id="createProductModal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen bg-opacity-50">
                <div className="relative p-4 w-full max-w-2xl bg-white rounded-lg shadow dark:bg-gray-800">

                    {/* Modal Header */}
                    <div className="flex justify-between items-center pb-4 mb-4 border-b dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Add Product</h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
                            onClick={() => setIsOpen(false)}
                        >
                            &times;
                        </button>
                    </div>

                    {/* Modal Body */}
                    <form className="grid gap-4 mb-4 sm:grid-cols-2" onSubmit={handleSubmit}>
                        {/* Form Fields */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product ID</label>
                            <input type="text" name="id" value={formData.id} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Type product ID" required/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Type product name" required/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                            <input type="text" name="category" value={formData.category} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Product category" required/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
                            <input type="text" name="brand" value={formData.brand} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Product brand" required/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                            <input type="number" name="price" value={formData.price} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Add price" required/>
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                            <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="border p-2 rounded w-full" placeholder="Add stock" required/>
                        </div>


                        {/* Image Upload Section */}
                        <div className="flex flex-col items-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange}/>
                            </label>
                            {imageName && <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">Selected: {imageName}</p>}
                        </div>
                    </form>
                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>Cancel</button>
                        <button type="submit" onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Add Product</button>
                    </div>
                </div>

            </div>
        )
    );
}
