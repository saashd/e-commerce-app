import Home from "./pages/Home";
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useSelector} from "react-redux";
import ProductList from "./pages/ProductList";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import React from "react";

function App() {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products/:category" element={<ProductList/>}/>
                <Route path="/product/:id" element={<Product/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
                <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
                <Route path="/cart" element={<Home/>}/>
                <Route path="/success" element={<Success/>}/>
            </Routes>
        </Router>
    );
}

export default App;
