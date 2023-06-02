import React, { useState } from "react";
import "../GridSystem/Grid.css";
import "./Header.css";
import { AiOutlineShoppingCart, AiFillCaretDown } from "react-icons/ai";
import { useNavigate, Link } from "react-router-dom";

function Header() {
    const [checkDown, setCheckDown] = useState(false);

    const navigate = useNavigate();

    const handleCheckDown = () => {
        setCheckDown(!checkDown);
    };

    const handleLogout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("profilePic");
        localStorage.removeItem("accessToken");
        navigate("/Signin");
    };

    return (
        <div className="heading">
            <div className="header-top"></div>
            <div className="header-bottom">
                <div className="headingTitle">
                    <Link
                        to="/Home"
                        style={{ textDecoration: "none", color: "#000" }}
                    >
                        <h1 className="titleWebBook">WebBook.vn</h1>
                    </Link>
                </div>
                <div className="headingUser">
                    {localStorage.getItem("role") === "ROLE_ADMIN" ? (
                        <div className="managerBook">
                            <Link
                                to="/ManagerBook"
                                style={{
                                    textDecoration: "none",
                                    color: "#000",
                                }}
                            >
                                <p className="manager__book">Quản lí sách</p>
                            </Link>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="iconCart">
                        <AiOutlineShoppingCart className="iconShopping" />
                        <Link
                            to="/Cart"
                            style={{ textDecoration: "none", color: "#000" }}
                        >
                            <p className="numCart">Giỏ hàng</p>
                        </Link>
                    </div>
                    <div className="iconUser">
                        <Link to="/Profile" style={{ textDecoration: "none" }}>
                            <p className="username">
                                {localStorage.getItem("username")}
                            </p>
                        </Link>
                        <AiFillCaretDown
                            className="iconDown"
                            onClick={handleCheckDown}
                        />
                        <div
                            className={checkDown ? "logout active" : "logout"}
                            onClick={handleLogout}
                        >
                            <ul className="listItem">
                                <li>Đăng xuất</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
