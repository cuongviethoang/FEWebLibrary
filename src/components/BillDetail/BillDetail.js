import React from "react";
import "./BillDetail.css";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function BillDetail() {
    const books = [
        { id: 1, name: "Book 1", sold: 10, total: 100 },
        { id: 2, name: "Book 2", sold: 5, total: 50 },
        { id: 3, name: "Book 3", sold: 8, total: 80 },
    ];

    const { id } = useParams();

    const [listBill, setListBill] = useState([]);

    useEffect(() => {
        getTotalBill();
    }, []);

    const getTotalBill = () => {
        axios
            .get(`http://localhost:8082/api/bill/book/${id}/stats`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                console.log(res.data);
                setListBill(res.data);
                return res.data;
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Header />
            <div className="grid containerTotalBill">
                <div className="container">
                    <div className="row">
                        <table className="book-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ID__Sách</th>
                                    <th>Tên Sách</th>
                                    <th>Thời gian</th>
                                    <th>Người mua</th>
                                    <th>Số lượng mua</th>
                                    <th>Địa chỉ</th>
                                    <th>SĐT</th>
                                    <th>Giá tiền</th>
                                    <th>Tổng tiền</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBill.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.idBook}</td>
                                        <td>{book.bookTitle}</td>
                                        <td>
                                            {book.date} {book.time}
                                        </td>
                                        <td>{book.username}</td>
                                        <td>{book.usedBuy}</td>
                                        <td>{book.address}</td>
                                        <td>{book.sdt}</td>
                                        <td>{book.price}</td>
                                        <td>{book.totalPrice}</td>
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

export default BillDetail;
