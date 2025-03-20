import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-gray-900 p-4 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo or Brand Name */}
                <h1 className="text-white text-2xl font-bold">Kiri Coffee</h1>

                {/* Navigation Links */}
                <ul className="flex space-x-6">
                    <li>
                        <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
                    </li>
                    <li>
                        <Link to="/order" className="text-gray-300 hover:text-white transition">Order</Link>
                    </li>
                    <li>
                        <Link to="/customer" className="text-gray-300 hover:text-white transition">Customer</Link>
                    </li>
                    <li>
                        <Link to="/cart" className="text-gray-300 hover:text-white transition">Cart</Link>
                    </li>
                    <li>
                        <Link to="/product" className="text-gray-300 hover:text-white transition">Product</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
