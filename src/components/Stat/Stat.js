import React from "react";
import "./Stat.css";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Stat() {
    const [listStat, setListStat] = useState([]);

    useEffect(() => {
        getStat();
    }, []);

    const getStat = () => {
        axios
            .get("http://localhost:8082/api/books/stats", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setListStat(res.data);
                return res.data;
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Header />
            <div className="grid containerStat">
                <div className="container">
                    <div className="row">
                        <div className="title__stat">
                            <h2>Thống kê</h2>
                        </div>
                        <table className="book-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên sách</th>
                                    <th>Đã bán</th>
                                    <th>Còn lại</th>
                                    <th>Giá tiền</th>
                                    <th>Tổng tiền</th>
                                    <th>Xem chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listStat.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.sold}</td>
                                        <td>{book.restBook}</td>
                                        <td>{book.price}</td>
                                        <td>{book.totalPrice}</td>
                                        <td>
                                            <button>
                                                <Link
                                                    to={`/BillDetail/Book/${book.id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "#000",
                                                    }}
                                                >
                                                    View
                                                </Link>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Stat;
