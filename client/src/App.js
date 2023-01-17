import Home from "./pages/Home";
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<Home/>}/>
                <Route path="/register" element={<Home/>}/>
                <Route path="/cart" element={<Home/>}/>
            </Routes>
        </Router>
    );
}

export default App;
