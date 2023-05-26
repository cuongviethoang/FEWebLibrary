import React from "react";
import Header from "../Header/Header";
import "../GridSystem/Grid.css";
import "./Cart.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";

function Cart() {
    const [currentCart, setCurrentCart] = useState([]);
    const [confirmCart, setConfirmCart] = useState({});
    const [checkAlertBuy, setCheckAlertBuy] = useState(false);

    useEffect(() => {
        getCart();
    }, []);

    const getCart = () => {
        axios
            .get("http://localhost:8082/api/cart/show", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setCurrentCart(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleDeleteCart = (id) => {
        axios
            .delete(`http://localhost:8082/api/cart/${id}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                alert("Xóa sản phẩm khỏi giỏ hành thành công");
                getCart();
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    // Click mua sách
    const handleCheckBuy = (cart) => {
        setConfirmCart(cart);
        setCheckAlertBuy(true);
    };

    const handleYesBuy = () => {
        axios
            .post(
                `http://localhost:8082/api/bill/book/${confirmCart.idBook}`,
                {
                    usedBuy: confirmCart.usedBuy,
                    address: confirmCart.address,
                    sdt: confirmCart.sdt,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("Mua sách thành công");
                setCheckAlertBuy(false);
                return res.data;
            })
            .catch((error) => alert("Thêm sách thất bại"));

        axios
            .put(
                `http://localhost:8082/api/book/${confirmCart.idBook}/sold`,
                {
                    sold: confirmCart.usedBuy,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => res.data)
            .catch((error) => console.log("error: ", error));
    };

    const handleNoBuy = () => {
        setCheckAlertBuy(false);
        setConfirmCart({});
    };

    return (
        <div>
            <Header />
            <div className="grid containerCart">
                <div className="container">
                    <h1 className="cart">Giỏ hàng</h1>
                    {currentCart.map((cart, index) => (
                        <div className="row container__cart" key={index}>
                            <div className="frame__cart">
                                <AiFillCloseCircle
                                    className="icon__close__circle"
                                    onClick={() => handleDeleteCart(cart.id)}
                                />
                                <div className="img__cart">
                                    <img
                                        alt=""
                                        src={
                                            "http://localhost:8082/api/file/getImg?path=" +
                                            cart.img
                                        }
                                        className="image__cart"
                                    ></img>
                                </div>
                                <div className="info__cart">
                                    <h4 className="name__book__cart">
                                        {cart.bookTitle}
                                    </h4>
                                    <span className="date__cart">
                                        Thời gian: {cart.date} {cart.time}
                                    </span>
                                    <span className="address__cart">
                                        Địa chỉ: {cart.address}
                                    </span>
                                    <span className="sdt__cart">
                                        Số điện thoại: {cart.sdt}
                                    </span>
                                    <span className="number__sold">
                                        Số lượng: {cart.usedBuy} quyển
                                    </span>
                                    <span className="price__one__book">
                                        Giá tiền: {cart.price}đ
                                    </span>
                                    <div className="total__book">
                                        <span className="total__cart">
                                            Tổng tiền: {cart.totalPrice}đ
                                        </span>
                                        <button
                                            className="buy"
                                            onClick={() => handleCheckBuy(cart)}
                                        >
                                            Mua
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {checkAlertBuy ? (
                <div className="alert__message">
                    <div className="overlay__detail"></div>
                    <div className="container__confirm">
                        <h1 className="confirm__number">
                            Vui lòng xác nhận thông tin:
                        </h1>
                        <div className="confirm__info">
                            <div className="confirm__input">
                                <label>Số lượng: </label>
                                <input defaultValue={confirmCart.usedBuy} />
                            </div>
                            <div className="confirm__input">
                                <label>Số điện thoại: </label>
                                <input defaultValue={confirmCart.sdt} />
                            </div>
                            <div className="confirm__input">
                                <label>Địa chỉ:</label>
                                <input defaultValue={confirmCart.address} />
                            </div>
                        </div>
                        <div className="confirm__btn">
                            <button className="yes__btn" onClick={handleYesBuy}>
                                Có
                            </button>
                            <button className="no__btn" onClick={handleNoBuy}>
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
}

export default Cart;
