import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./store/store"; // This is your Redux store
import Navbar from './components/navBar';
import Home from './pages/home';
import Order from './pages/order';
import Customer from './pages/customer';
import Cart from './pages/cart';
import Product from './pages/product';
import AddProduct from './components/addProduct';
import Footer from './components/footer';

function App() {
    return (
        <Provider store={store}> {/* Wrap your entire app with Redux Provider */}
            <Router>
                <div>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/orders" element={<Order />} />
                        <Route path="/customer" element={<Customer />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/product" element={<Product />} />
                        <Route path="/add-product" element={<AddProduct />} />
                    </Routes>
                    <Footer />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
