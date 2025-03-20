import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { updateQuantity, removeFromCart } from "../components/cartSlice";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    interface CartItem {
        id: number;
        name: string;
        price: number;
        image: string;
        quantity: number;
        category: string;
        brand: string;
    }

    const handleQuantityChange = (id: number, quantity: number) => {
        if (quantity > 0) {
            dispatch(updateQuantity({ id, quantity }));
        }
    };

    const handleCheckout = () => {
        fetch("http://localhost:5000/api/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                items: cartItems.map((item) => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                })),
            }),
        })
            .then((res) => res.json())
            .then(() => {
                alert("Order placed successfully!");
                navigate("/orders");
            })
            .catch((error) => console.error("Checkout error:", error));
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center border-b pb-4 mb-4">
                            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                            <div className="ml-4 flex-1">
                                <h2 className="text-lg font-semibold">{item.name}</h2>
                                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500">
                                    {item.category} - {item.brand}
                                </p>
                            </div>
                            <input
                                type="number"
                                value={item.quantity}
                                min="1"
                                className="w-12 text-center border"
                                onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                            />
                            <button
                                onClick={() => dispatch(removeFromCart(item.id))}
                                className="ml-4 text-red-500"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    <div className="mt-6 border-t pt-4">
                        <h2 className="text-lg font-bold">Order Summary</h2>
                        <p className="text-gray-700">Total: ${totalPrice.toFixed(2)}</p>
                    </div>

                    <div className="flex mt-4">
                        <button
                            onClick={() => navigate("/")}
                            className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                        >
                            Continue Shopping
                        </button>
                        <button
                            onClick={handleCheckout}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;