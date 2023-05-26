import React from "react";
import Header from "../Header/Header";
import "../GridSystem/Grid.css";
import "./Home.css";
import { FaBars } from "react-icons/fa";
import { BsChevronBarDown } from "react-icons/bs";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "../Card/Card";

function Home() {
    const [listBook, setListBook] = useState([]);
    const [listGenre, setListGenre] = useState([]);
    const [searchBook, setSearchBook] = useState([]);

    useEffect(() => {
        getAllBook();
        getAllGenre();
    }, []);

    const getAllBook = () => {
        axios
            .get("http://localhost:8082/api/books", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setListBook(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const getAllGenre = () => {
        axios
            .get("http://localhost:8082/api/genres", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setListGenre(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleGenre = (index) => {
        axios
            .get(`http://localhost:8082/api/books/genre/${index}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setListBook(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleSearch = () => {
        axios
            .get(`http://localhost:8082/api/books/findBook?title=` + searchBook)
            .then((res) => {
                setListBook(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleBack = () => {
        getAllBook();
    };

    return (
        <>
            <Header />
            <div className="home">
                <div className="grid home_search_bar">
                    <div className="container">
                        <div className="row container-row">
                            <div className="col l-3 listGenre">
                                <div className="iconAndList">
                                    <FaBars className="iconBar" />
                                    <span className="listBar">
                                        Danh sách thể loại
                                    </span>
                                    <BsChevronBarDown className="iconDownBar" />
                                    <div className="list_genres">
                                        <ul className="list_genre">
                                            <li
                                                className="item_genre"
                                                onClick={() => handleBack()}
                                            >
                                                Tất cả
                                            </li>
                                            {listGenre.map((genre) => (
                                                <li
                                                    className="item_genre"
                                                    key={genre.id}
                                                    onClick={() =>
                                                        handleGenre(genre.id)
                                                    }
                                                >
                                                    {genre.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="col l-9 searchBook">
                                <div className="inputAndBtn">
                                    <input
                                        value={searchBook}
                                        onChange={(e) =>
                                            setSearchBook(e.target.value)
                                        }
                                        className="inputSearch"
                                        placeholder="Bạn cần tìm gì"
                                    />
                                    <button
                                        className="btnSearch"
                                        onClick={handleSearch}
                                    >
                                        Tìm kiếm
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid home_list_book">
                    <div className="container list_book">
                        <div className="list__cards">
                            {listBook.map((book) => (
                                <Card key={book.id} book={book} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
