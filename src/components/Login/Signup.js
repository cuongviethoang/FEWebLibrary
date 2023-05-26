import React from "react";
import "./Login.css";
import "../GridSystem/Grid.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { AiOutlineCheck, AiOutlineExclamationCircle } from "react-icons/ai";

function Signup() {
    const [errorMess, setErrorMess] = useState("");
    const [successful, setSuccessFul] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errUsername, setErrUsername] = useState("");
    const [errEmail, setErrorEmail] = useState("");
    const [errPass, setErrPass] = useState("");

    const handleBlur = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (value === "") {
            if (name === "username") {
                setErrUsername("Vui lòng nhập tên người dùng");
            } else if (name === "email") {
                setErrorEmail("Vui lòng nhập địa chỉ email");
            } else if (name === "password") {
                setErrPass("Vui lòng nhập mật khẩu");
            }
        } else {
            if (name === "email") {
                const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!regex.test(value)) {
                    setErrorEmail("Địa chỉ email không hợp lệ");
                } else {
                    setErrorEmail("");
                }
            } else if (name === "password") {
                if (value.length < 6) {
                    setErrPass("Vui lòng nhập mật khẩu từ 6 kí tự trở lên");
                } else {
                    setErrPass("");
                }
            } else {
                setErrUsername("");
                setErrorEmail("");
                setErrPass("");
            }
        }
    };

    const handleClick = (e) => {
        const name = e.target.name;
        if (name === "username") {
            setErrUsername("");
        } else if (name === "email") {
            setErrorEmail("");
        } else {
            setErrPass("");
        }
    };

    const handleSignUp = () => {
        if (
            errUsername.trim() !== "" ||
            errEmail.trim() !== "" ||
            errPass.trim() !== ""
        ) {
            if (errUsername.trim() !== "") setErrorMess(errUsername);
            else if (errEmail.trim() !== "") setErrorMess(errEmail);
            else setErrorMess(errPass);
            setTimeout(() => {
                setErrorMess("");
            }, 3000);
        } else {
            axios
                .post("http://localhost:8082/api/auth/signup", {
                    username: username,
                    email: email,
                    password: password,
                })
                .then((res) => res.data)
                .then((result) => {
                    setErrorMess("Đăng kí tài khoản thành công");
                    setSuccessFul(true);
                    setTimeout(() => {
                        setErrorMess("");
                    }, 3000);
                    return result;
                })
                .catch((error) => {
                    const resMess =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();
                    setErrorMess(resMess);
                    setSuccessFul(false);
                    setTimeout(() => {
                        setErrorMess("");
                    }, 3000);
                });
        }
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
                        <h2 className="text-center">Đăng kí</h2>
                        <div className="container-input">
                            <label className="text-label">Username</label>
                            <input
                                name="username"
                                value={username}
                                className="text-input"
                                onBlur={handleBlur}
                                onClick={handleClick}
                                placeholder="Nhập tài khoản"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className="text-error">
                                {errUsername ? errUsername : ""}
                            </div>
                        </div>
                        <div className="container-input">
                            <label className="text-label">Email</label>
                            <input
                                name="email"
                                value={email}
                                className="text-input"
                                onBlur={handleBlur}
                                onClick={handleClick}
                                placeholder="Nhập email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <div className="text-error">
                                {errEmail ? errEmail : ""}
                            </div>
                        </div>
                        <div className="container-input">
                            <label className="text-label">Password</label>
                            <input
                                name="password"
                                value={password}
                                className="text-input"
                                onBlur={handleBlur}
                                onClick={handleClick}
                                placeholder="Nhập mật khẩu"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="text-error">
                                {errPass ? errPass : ""}
                            </div>
                        </div>
                        <div className="container-input">
                            <button
                                className="btn-signin"
                                onClick={handleSignUp}
                            >
                                Đăng kí
                            </button>
                            <div className="link-to-signup">
                                <p>Chuyển đến đăng nhập</p>
                                <Link
                                    to="/Signin"
                                    style={{
                                        textDecoration: "underline",
                                    }}
                                    className="link-signup"
                                >
                                    Signin?
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {errorMess && (
                <div className="alert">
                    <div
                        className={
                            successful
                                ? "alert_icon alert_success"
                                : "alert_icon alert_danger"
                        }
                    >
                        {successful ? (
                            <AiOutlineCheck className="iconSuccess" />
                        ) : (
                            <AiOutlineExclamationCircle className="iconDanger" />
                        )}
                    </div>
                    <div className="alert_message">{errorMess}</div>
                </div>
            )}
        </div>
    );
}

export default Signup;
