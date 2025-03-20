import React, { useEffect, useState } from "react";
import HomeProductCard from "../components/homeProductCard.tsx";

interface Product {
    _id: string; // MongoDB _id
    name: string;
    category: string;
    brand: string;
    price: number;
    stock: number; // stocks වෙනුවට stock ලෙස වෙනස් කරන්න.
    image: string;
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/product");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err) {
                setError("Error fetching products. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="p-6">
            {loading && <p className="text-center text-gray-500">Loading products...</p>}
            {error && <p className="text-center text-red-500">{error}</p>}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {!loading && !error && products.length > 0 ? (
                    products.map((product) => (
                        <HomeProductCard key={product._id} {...product} /> // key එක _id ලෙස වෙනස් කරන්න.
                    ))
                ) : (
                    !loading && !error && <p className="text-center text-gray-500">No products available</p>
                )}
            </div>
        </div>
    );
};

export default Home;