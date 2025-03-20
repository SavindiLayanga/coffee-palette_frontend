import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "./cartSlice";

interface ProductProps {
    id: number;
    name: string;
    price: number;
    image: string;
}

const ProductCard: React.FC<ProductProps> = ({ id, name, price, image }) => {
    const dispatch = useDispatch();
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        dispatch(addToCart({ id, name, price, image, quantity: 1 }));
        setAdded(true);
        setTimeout(() => setAdded(false), 2000);
    };
    console.log("Adding to cart:", { id, name, price, image });

    return (
        <div className="border p-4 rounded-lg shadow-md">
            <img src={image} alt={name} className="w-full h-40 object-cover" />
            <h2 className="text-lg font-semibold mt-2">{name}</h2>
            <p className="text-gray-500">${price.toFixed(2)}</p>
            <button
                onClick={handleAddToCart}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg w-full"
            >
                Add to Cart
            </button>
            {added && <p className="text-green-500 text-center mt-2">Added to cart!</p>}
        </div>
    );
};

export default ProductCard;