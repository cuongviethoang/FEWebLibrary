import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/Login/Signin";
import Signup from "./components/Login/Signup";
import Home from "./components/Home/Home";
import BookDetail from "./components/BookDetail/BookDetail";
import Profile from "./components/Profile/Profile";
import Cart from "./components/Cart/Cart";
import ManagerBook from "./components/ManagerBook/ManagerBook";
import Stat from "./components/Stat/Stat";
import BillDetail from "./components/BillDetail/BillDetail";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="Signup" element={<Signup />}></Route>
                    <Route index element={<Signin />}></Route>
                    <Route path="Signin" element={<Signin />}></Route>
                    <Route path="Home" element={<Home />}></Route>
                    <Route path="Profile" element={<Profile />}></Route>
                    <Route path="Cart" element={<Cart />}></Route>
                    <Route path="ManagerBook" element={<ManagerBook />}></Route>
                    <Route path="Book/:id" element={<BookDetail />}></Route>
                    <Route path="Stat" element={<Stat />}></Route>
                    <Route
                        path="BillDetail/Book/:id"
                        element={<BillDetail />}
                    ></Route>
                </Routes>
            </Router>
        </div>
    );
}

export default App;
