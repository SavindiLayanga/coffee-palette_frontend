import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

interface Product {
    id: number;
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number;
    image: string;
}

const HomeProductCard: React.FC<Product> = ({ id, name, category, brand, price, stock, image }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(
            addToCart({
                id: `${id}-${Date.now()}`, // Unique ID to prevent merging
                name,
                price,
                image,
                quantity: 1,
            })
        );
    };


    return (
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <div className="h-56 w-full">
                <img className="mx-auto h-full object-contain" src={image} alt={name} />
            </div>

            <div className="pt-6">
                <p className="text-xs text-gray-500 dark:text-gray-400">ID: {id}</p>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{category} - {brand}</p>

                <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">Stock: {stock}</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                    <p className="text-2xl font-extrabold leading-tight text-gray-900 dark:text-white">${price}</p>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeProductCard;