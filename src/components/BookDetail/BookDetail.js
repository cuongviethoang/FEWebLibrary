import React from "react";
import "../GridSystem/Grid.css";
import "./BookDetail.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header/Header";
import {
    AiFillStar,
    AiOutlineShoppingCart,
    AiFillInstagram,
    AiFillTwitterCircle,
    AiOutlineHeart,
    AiFillCloseCircle,
} from "react-icons/ai";
import { FaFacebookMessenger } from "react-icons/fa";
import { BsArrowReturnLeft, BsFacebook } from "react-icons/bs";
import { MdSecurity } from "react-icons/md";
import { RiTruckFill } from "react-icons/ri";

function BookDetail() {
    const { id } = useParams();
    const [bookDetail, setBookDetail] = useState({});
    const [currentComment, setCurrentComment] = useState([]);
    const [currentTym, setCurrentTym] = useState([]);
    const [currentReact, setCurrentReact] = useState([]);
    const [averageReact, setAverageReact] = useState({});
    const [valueInput1, setValueInput1] = useState(0);
    const [rating, setRating] = useState(0);
    const [hoveredStars, setHoveredStars] = useState(0);
    const [valueInput, setValueInput] = useState("");
    const [checkAdd, setCheckSAdd] = useState(false);
    const [checkBuy, setCheckBuy] = useState(false);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");

    const [checkProfilePic, setProfilePic] = useState(
        localStorage.getItem("profilePic")
    );

    useEffect(() => {
        getBookDetail();
        getComment();
        getTym();
        getReact();
        getCountReact();
    }, []);

    const getBookDetail = () => {
        axios
            .get(`http://localhost:8082/api/book/${id}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setBookDetail(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const getComment = () => {
        axios
            .get(`http://localhost:8082/api/book/${id}/comments`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setCurrentComment(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const getTym = () => {
        axios
            .get(`http://localhost:8082/api/book/${id}/tyms`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setCurrentTym(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const getReact = () => {
        axios
            .get(`http://localhost:8082/api/book/${id}/reacts`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setCurrentReact(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const getCountReact = () => {
        axios
            .get(`http://localhost:8082/api/book/${id}/count`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setAverageReact(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    // Click vào dấu cộng
    const handleAdd = () => {
        setValueInput1(valueInput1 + 1);
    };

    // Click vào dấu trừ
    const handleSub = () => {
        if (valueInput1 > 0) {
            setValueInput1(valueInput1 - 1);
        }
    };

    // Click thêm vào giỏ hàng
    const handleAddCart = () => {
        if (valueInput1 == 0) {
            alert("Vui Lòng chọn số lượng");
        } else {
            setCheckSAdd(true);
        }
    };

    const handleYesCart = () => {
        axios
            .post(
                `http://localhost:8082/api/cart/book/${id}`,
                {
                    usedBuy: valueInput1,
                    address: address,
                    sdt: phone,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("Thêm vào giỏ hàng thành công");
                setCheckSAdd(false);
                return res.data;
            })
            .catch((error) => alert("Thêm vào giỏ hàng thất bại"));
    };

    const handleNoCart = () => {
        setCheckSAdd(false);
    };

    // Click mua sách
    const handleBuy = () => {
        if (valueInput1 == 0) {
            alert("Vui lòng chọn số lượng");
        } else {
            setCheckBuy(true);
        }
    };

    const handleYesBuy = () => {
        axios
            .post(
                `http://localhost:8082/api/bill/book/${id}`,
                {
                    usedBuy: valueInput1,
                    address: address,
                    sdt: phone,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert(
                    "Mua sách thành công, vui lòng đến profile để xác nhận lại thông tin"
                );
                getBookDetail(); // gọi lại book detail để cập nhật lại có sách đã bán và số sách còn lại
                setCheckBuy(false);
                return res.data;
            })
            .catch((error) => alert("Mua sách thất bại"));

        axios
            .put(
                `http://localhost:8082/api/book/${id}/sold`,
                {
                    sold: valueInput1,
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
        setCheckBuy(false);
    };

    //  thả Tym
    const handleTym = () => {
        axios
            .post(
                `http://locaLhost:8082/api/book/${id}/tym`,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                getTym();
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    // Đánh giá

    const handleStarHover = (starIndex) => {
        setHoveredStars(starIndex);
    };

    const handleStarLeave = () => {
        setHoveredStars(0);
    };

    const handleStarClick = (index) => {
        axios
            .post(
                `http://localhost:8082/api/book/${id}/react`,
                {
                    voted: index,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                getReact();
                getCountReact();
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleDeleteReact = (reactId) => {
        axios
            .delete(`http://localhost:8082/api/book/${id}/react/${reactId}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                alert("Xóa đánh giá thành công");
                getReact();
                getCountReact();
                return res.data;
            })
            .catch((error) => {
                const resMess =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                alert(resMess);
            });
    };

    // Comment
    const handleChangInput = (e) => {
        setValueInput(e.target.value);
    };

    const shouldEnableCommentButton = () => {
        return valueInput.trim() !== "";
    };

    const handleClickPost = () => {
        axios
            .post(
                `http://localhost:8082/api/book/${id}/comment`,
                {
                    content: valueInput,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                return res.data;
            })
            .then((result) => {
                getComment();
                setValueInput("");
                return result;
            })
            .catch((error) => console.log("error: ", error));
    };

    const handleDeleteComment = (commentId) => {
        axios
            .delete(
                `http://localhost:8082/api/book/${id}/comment/${commentId}`,
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("Xóa bình luận thành công");
                getComment();
                return res.data;
            })
            .catch((error) => {
                alert("Bình luận này không phải của bạn");
                console.log("error: ", error);
            });
    };

    return (
        <>
            <Header />
            <div className="grid container__detail">
                <div className="container container__book">
                    <div className="row container__detail_book">
                        <div className="col l-6 left__detail">
                            <div className="image__book">
                                <img
                                    alt=""
                                    src={
                                        bookDetail.imgBook &&
                                        `http://localhost:8082/api/file/getImg?path=` +
                                            bookDetail.imgBook
                                    }
                                    className="imgBook"
                                />
                            </div>
                        </div>
                        <div className="col l-6 right__detail">
                            <div className="detail__book">
                                <div className="row fix__height">
                                    <p className="title__book">
                                        {bookDetail.title} ({bookDetail.author})
                                    </p>
                                    <span className="length">
                                        Số trang: {bookDetail.length}
                                    </span>
                                    <span className="release__date">
                                        Năm phát hành: {bookDetail.releaseDate}
                                    </span>
                                </div>
                                <div className="row fix__height">
                                    <div className="genre__book">
                                        {bookDetail.genres
                                            ? bookDetail.genres.map(
                                                  (genre, index) => (
                                                      <div
                                                          className="genre"
                                                          key={index}
                                                      >
                                                          {genre.name}
                                                      </div>
                                                  )
                                              )
                                            : ""}
                                    </div>
                                </div>
                                <div className="row fix__height">
                                    <span className="num__react">
                                        <p>{averageReact.averageRate}</p>
                                        <AiFillStar className="iconStar" />
                                    </span>
                                    <span className="num__comment">
                                        <p>{currentComment.length}</p>
                                        <span>Bình luận</span>
                                    </span>
                                    <span className="num__sold">
                                        <p>{bookDetail.sold}</p>
                                        <span>Đã bán</span>
                                    </span>
                                </div>
                                <div className="row fix__height">
                                    <span className="price__book">
                                        <p>{bookDetail.price}đ</p>
                                    </span>
                                </div>
                                <div className="row fix__height">
                                    <span className="number">Số lượng</span>
                                    <button className="add" onClick={handleAdd}>
                                        +
                                    </button>
                                    <input
                                        value={valueInput1}
                                        className="value__number"
                                    />
                                    <button className="sub" onClick={handleSub}>
                                        -
                                    </button>
                                    <span className="rest__book">
                                        <p>
                                            {bookDetail.totalBook} quyển có sẵn
                                        </p>
                                    </span>
                                </div>
                                <div className="row fix__height">
                                    <div
                                        className="btn-cart"
                                        onClick={handleAddCart}
                                    >
                                        <AiOutlineShoppingCart className="icon__cart" />
                                        <span className="add__cart">
                                            Thêm vào giỏ hàng
                                        </span>
                                    </div>
                                    <div
                                        className="btn_buy"
                                        onClick={handleBuy}
                                    >
                                        <span className="buy__book">
                                            Mua ngay
                                        </span>
                                    </div>
                                </div>
                                <div className="row fix__height">
                                    <div className="return">
                                        <BsArrowReturnLeft className="iconReturn" />
                                        <span className="return__free">
                                            7 ngày trả hàng miễn phí
                                        </span>
                                    </div>
                                    <div className="genuine">
                                        <MdSecurity className="iconSecurity" />
                                        <span className="security__book">
                                            Đảm bảo chính hãng
                                        </span>
                                    </div>
                                    <div className="freeship">
                                        <RiTruckFill className="iconTruck" />
                                        <span className="free__book">
                                            Miễn phí vẫn chuyển
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row container__social_book">
                        <div className="social__media">
                            <span>Chia sẻ: </span>
                            <FaFacebookMessenger className="iconMess" />
                            <BsFacebook className="iconFace" />
                            <AiFillInstagram className="iconInsta" />
                            <AiFillTwitterCircle className="iconTwice" />
                        </div>
                        <div className="social_tym">
                            <AiOutlineHeart
                                className="iconHeart"
                                onClick={handleTym}
                            />
                            <span>Đã thích ({currentTym.length})</span>
                        </div>
                    </div>
                </div>
                <div className="container container__overview">
                    <h1>Giới thiệu</h1>
                    <div className="containerOverview">
                        <p>{bookDetail.overview}</p>
                    </div>
                </div>
                <div className="containerReact">
                    <h1 className="title__rated">Đánh giá</h1>
                    <div className="containerTop">
                        <img
                            className="containerImg"
                            src={
                                checkProfilePic != null
                                    ? checkProfilePic &&
                                      "http://localhost:8082/api/file/getImg?path=" +
                                          localStorage.getItem("profilePic")
                                    : "https://tse3.mm.bing.net/th?id=OIP.CiC4AzdlWzYcj2j65RM33AAAAA&pid=Api&P=0"
                            }
                            alt=""
                        />
                        <div className="containerInput">
                            {[1, 2, 3, 4, 5].map((starIndex) => (
                                <AiFillStar
                                    key={starIndex}
                                    className="icon__star"
                                    style={{
                                        color:
                                            starIndex <= hoveredStars
                                                ? "red"
                                                : "gray",
                                    }}
                                    onMouseEnter={() =>
                                        handleStarHover(starIndex)
                                    }
                                    onMouseLeave={handleStarLeave}
                                    onClick={() => handleStarClick(starIndex)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="containerBottom">
                        {currentReact.map((react, index) => (
                            <div className="containerCommentUser" key={index}>
                                <img
                                    className="containerImg"
                                    src={
                                        react.imgUser != null
                                            ? react.imgUser &&
                                              "http://localhost:8082/api/file/getImg?path=" +
                                                  react.imgUser
                                            : "https://tse3.mm.bing.net/th?id=OIP.CiC4AzdlWzYcj2j65RM33AAAAA&pid=Api&P=0"
                                    }
                                    alt=""
                                />
                                <div className="containerUserOther">
                                    <div className="infoUser">
                                        <h4 className="nameUser">
                                            {react.username}
                                        </h4>
                                        <p className="datePost">{react.date}</p>
                                        <p className="datePost">{react.time}</p>
                                        <AiFillCloseCircle
                                            className="iconDelete"
                                            onClick={() =>
                                                handleDeleteReact(react.id)
                                            }
                                        />
                                    </div>
                                    <div className="contentRated">
                                        <p className="titleRated">
                                            {react.voted}
                                        </p>
                                        <AiFillStar className="icon_star" />
                                    </div>
                                    <div className="contentPost">
                                        <p className="titleConent">
                                            {react.message}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="containerComment">
                    <h1>Bình luận</h1>
                    <div className="containerTop">
                        <img
                            className="containerImg"
                            src={
                                checkProfilePic != null
                                    ? checkProfilePic &&
                                      "http://localhost:8082/api/file/getImg?path=" +
                                          localStorage.getItem("profilePic")
                                    : "https://tse3.mm.bing.net/th?id=OIP.CiC4AzdlWzYcj2j65RM33AAAAA&pid=Api&P=0"
                            }
                            alt=""
                        />
                        <div className="containerInput">
                            <input
                                className="inputType activeInput"
                                placeholder="Viết bình luận..."
                                value={valueInput}
                                onChange={handleChangInput}
                            />
                            <div className="containerBtn">
                                <button
                                    className="deleteBtn"
                                    disabled={!shouldEnableCommentButton()}
                                >
                                    <label>Hủy</label>
                                </button>
                                <button
                                    className={
                                        !shouldEnableCommentButton()
                                            ? "submitBtn"
                                            : "submitBtn activeBtn"
                                    }
                                    onClick={handleClickPost}
                                    disabled={!shouldEnableCommentButton()}
                                >
                                    <label>Bình luận</label>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="containerBottom">
                        {currentComment.map((comment, index) => (
                            <div className="containerCommentUser" key={index}>
                                <img
                                    className="containerImg"
                                    src={
                                        comment.imgUser != null
                                            ? comment.imgUser &&
                                              "http://localhost:8082/api/file/getImg?path=" +
                                                  comment.imgUser
                                            : "https://tse3.mm.bing.net/th?id=OIP.CiC4AzdlWzYcj2j65RM33AAAAA&pid=Api&P=0"
                                    }
                                    alt=""
                                />
                                <div className="containerUserOther">
                                    <div className="infoUser">
                                        <h4 className="nameUser">
                                            {comment.username}
                                        </h4>
                                        <p className="datePost">
                                            {comment.date}
                                        </p>
                                        <p className="datePost">
                                            {comment.time}
                                        </p>
                                        <AiFillCloseCircle
                                            className="iconDelete"
                                            onClick={() =>
                                                handleDeleteComment(comment.id)
                                            }
                                        />
                                    </div>
                                    <div className="contentPost">
                                        <p className="titleConent">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {checkBuy ? (
                <div className="alert__buy__message">
                    <div className="overlay__detail"></div>
                    <div className="container__confirm">
                        <h1 className="confirm__number">
                            Vui lòng điền đầy đủ thông tin:
                        </h1>
                        <div className="confirm__info">
                            <div className="confirm__input">
                                <label>Số lượng: </label>
                                <input defaultValue={valueInput1} />
                            </div>
                            <div className="confirm__input">
                                <label>Số điện thoại: </label>
                                <input
                                    value={phone}
                                    placeholder="Vui lòng điền số điện thoại"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="confirm__input">
                                <label>Địa chỉ:</label>
                                <input
                                    value={address}
                                    placeholder="Vui lòng nhập địa chỉ"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
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
            {checkAdd ? (
                <div className="alert__add__message">
                    <div className="overlay__detail"></div>
                    <div className="container__confirm">
                        <h1 className="confirm__number">
                            Vui lòng điền đầy đủ thông tin:
                        </h1>
                        <div className="confirm__info">
                            <div className="confirm__input">
                                <label>Số lượng: </label>
                                <input defaultValue={valueInput1} />
                            </div>
                            <div className="confirm__input">
                                <label>Số điện thoại: </label>
                                <input
                                    value={phone}
                                    placeholder="Vui lòng điền số điện thoại"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="confirm__input">
                                <label>Địa chỉ:</label>
                                <input
                                    value={address}
                                    placeholder="Vui lòng nhập địa chỉ"
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="confirm__btn">
                            <button
                                className="yes__btn"
                                onClick={handleYesCart}
                            >
                                Có
                            </button>
                            <button className="no__btn" onClick={handleNoCart}>
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default BookDetail;
