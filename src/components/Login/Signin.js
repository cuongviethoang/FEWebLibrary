import React from "react";
import "../GridSystem/Grid.css";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AiOutlineExclamationCircle } from "react-icons/ai";

function Signin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMess, setErrorMess] = useState("");

    const navigate = useNavigate();

    const handleSignIn = () => {
        axios
            .post("http://localhost:8082/api/auth/signin", {
                username: username,
                password: password,
            })
            .then((res) => res.data)
            .then((result) => {
                localStorage.setItem("accessToken", result.accessToken);
                localStorage.setItem("username", result.username);
                localStorage.setItem("profilePic", result.imgProfile);
                localStorage.setItem("role", result.roles[0]);
                navigate("/ManagerBook");
                return result;
            })
            .catch((error) => {
                setErrorMess("Mật khẩu tài khoản không chính xác");
                setTimeout(() => {
                    setErrorMess("");
                }, 3000);
            });
    };
    return (
        <div className="grid">
            <div className=" grid_img"></div>
            <div className="container_img">
                <div className="container-left">
                    <div className="container-left-title">
                        <h1 className="text-title">Read A Book</h1>
                        <p className="text-desc">
                            You know you've read a good book when you turn the
                            last page and feel a little as if you have lost a
                            friend
                        </p>
                    </div>
                </div>
                <div className="container-right">
                    <div className="right-overlay"></div>
                    <div className="container-signin">
                        <h2 className="text-center">Đăng nhập</h2>
                        <div className="container-input">
                            <label className="text-label">Username</label>
                            <input
                                value={username}
                                className="text-input"
                                placeholder="Nhập tài khoản"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="container-input">
                            <label className="text-label">Password</label>
                            <input
                                value={password}
                                className="text-input"
                                placeholder="Nhập mật khẩu"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="container-input">
                            <button
                                className="btn-signin"
                                onClick={handleSignIn}
                            >
                                Đăng nhập
                            </button>
                            <div className="link-to-signup">
                                <p>Đăng kí nhanh</p>
                                <Link
                                    to="/Signup"
                                    style={{
                                        textDecoration: "underline",
                                    }}
                                    className="link-signup"
                                >
                                    Signup?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {errorMess && (
                <div className="alert">
                    <div className="alert_icon alert_danger">
                        <AiOutlineExclamationCircle className="iconDanger" />
                    </div>
                    <div className="alert_message">{errorMess}</div>
                </div>
            )}
        </div>
    );
}

export default Signin;
