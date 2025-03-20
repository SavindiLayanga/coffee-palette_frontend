import React, { useEffect, useState } from "react";

interface Order {
    _id: string;
    items: { name: string; price: number; quantity: number }[];
    totalPrice: number;
    status: string;
}

const Order: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/orders")
            .then((res) => res.json())
            .then((data) => setOrders(data));
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Orders</h1>
            {orders.length === 0 ? (
                <p className="text-gray-500">No orders found.</p>
            ) : (
                <div>
                    {orders.map((order) => (
                        <div key={order._id} className="border p-4 mb-4">
                            <h2 className="text-lg font-semibold">Order ID: {order._id}</h2>
                            <p className="text-gray-700">Total: ${order.totalPrice.toFixed(2)}</p>
                            <p>Status: {order.status}</p>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.name} - {item.quantity} x ${item.price.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Order;
