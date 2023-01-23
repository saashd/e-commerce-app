import Home from "./pages/Home/Home";
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import {useSelector} from "react-redux";
import ProductsList from "./pages/ProductsList/ProductsList";
import Product from "./pages/Product/Product";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import React from "react";
import WishList from "./pages/WishList";
import "./App.css"
import HomeAdmin from "./pages/Home/HomeAdmin";
import ProductsListAdmin from "./pages/ProductsList/ProductsListAdmin";
import ProductAdmin from "./pages/Product/ProductAdmin";
import NewProduct from "./pages/Product/NewProduct";


function App() {
    const user = useSelector((state) => state.user.currentUser);
    if (user && user.isAdmin) {
        return (
            <Router>
                <Routes>
                    <Route path="/" element={<HomeAdmin/>}/>
                    <Route path="/products" element={<ProductsListAdmin/>}/>
                    <Route path="/product/:id" element={<ProductAdmin/>}/>
                    <Route path="/newproduct" element={<NewProduct/>}/>
                    <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
                    <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
                </Routes>
            </Router>
        );
    }
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products/:category" element={<ProductsList/>}/>
                <Route path="/products" element={<Home/>}/>
                <Route path="/product/:id" element={<Product/>}/>
                <Route path="/cart" element={<Cart/>}/>
                <Route path="/wishlist" element={<WishList/>}/>
                <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
                <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
                <Route path="/success" element={<Success/>}/>
            </Routes>
        </Router>
    );
}

export default App;
