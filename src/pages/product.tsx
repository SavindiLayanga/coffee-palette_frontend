import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const ProductTable = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        axios.get("http://localhost:5000/api/product").then((res) => {
            setProducts(res.data);
        });
    }, []);

    const deleteProduct = (id) => {
        axios.delete(`http://localhost:5000/api/product/${id}`).then(() => {
            setProducts(products.filter((product) => product._id !== id));
        });
    };

    return (
        <div className="container mx-auto p-5">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search Product..."
                    className="border p-2 rounded w-1/3"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Link to="/add-product">
                    <button className="bg-blue-500 text-white p-2 rounded">
                        Add Product
                    </button>
                </Link>

            </div>

            <table className="min-w-full bg-white border">
                <thead>
                <tr className="bg-gray-100">
                    <th className="p-2 border">Image</th>
                    <th className="p-2 border">ID</th>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Category</th>
                    <th className="p-2 border">Brand</th>
                    <th className="p-2 border">Price</th>
                    <th className="p-2 border">Stocks</th>
                    <th className="p-2 border">Actions</th>
                </tr>
                </thead>
                <tbody>
                {products
                    .filter((p) =>
                        p.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((product) => (
                        <tr key={product.id}>
                            <td className="p-2 border">
                                <img src={product.image} alt="product" className="w-16 h-16"/>
                            </td>
                            <td className="p-2 border">{product.id}</td>
                            <td className="p-2 border">{product.name}</td>
                            <td className="p-2 border">{product.category}</td>
                            <td className="p-2 border">{product.brand}</td>
                            <td className="p-2 border">${product.price}</td>
                            <td className="p-2 border">${product.stock}</td>
                            <td className="p-2 border">
                                <button className="bg-yellow-500 text-white px-2 py-1 mx-1 rounded">Edit</button>
                                <button className="bg-green-500 text-white px-2 py-1 mx-1 rounded">Preview</button>
                                <button onClick={() => deleteProduct(product.id)}
                                        className="bg-red-500 text-white px-2 py-1 mx-1 rounded">Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;
