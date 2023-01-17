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



function App() {
    const user = useSelector((state) => state.user.currentUser);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products/:category" element={<ProductList/>}/>
                <Route path="/login" element={user ? <Navigate to="/"/> : <Login/>}/>
                <Route path="/register" element={user ? <Navigate to="/"/> : <Register/>}/>
                <Route path="/cart" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;
