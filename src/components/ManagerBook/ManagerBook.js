import React from "react";
import "./ManagerBook.css";
import "../GridSystem/Grid.css";
import Header from "../Header/Header";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import { RxArrowRight } from "react-icons/rx";

function ManagerBook() {
    const [valueSearch, setValueSearch] = useState("");
    const [listBook, setListBook] = useState([]);
    const [detailBook, setDetailBook] = useState({});
    const [checkAdd, setCheckAdd] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [checkConfirmEdit, setCheckConfirmEdit] = useState(false);
    const [files, setFiles] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [confirmAdd, setConfirmAdd] = useState(false);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const [checkDelete, setCheckDelete] = useState(false);
    const [checkAddGenre, setCheckAddGenre] = useState(false);
    const [checkEditImg, setCheckEditImg] = useState(false);
    const [idBook, setIdBook] = useState(0);
    const [inputGenre, setInputGenre] = useState("");

    const [inputTitle, setInputTitle] = useState("");
    const [inputAuthor, setInputAuhtor] = useState("");
    const [inputRelease, setInputRelease] = useState("");
    const [inputLength, setInputLength] = useState("");
    const [inputSold, setInputSold] = useState(0);
    const [inputTotalBook, setInputTotalBook] = useState(0);
    const [inputPrice, setInputPrice] = useState(0);
    const [inputFileName, setInputFileName] = useState("");

    useEffect(() => {
        getAllBook();
    }, []);

    // Gọi api lấy hết sách
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

    // Tìm sách trong input
    const handleSearch = () => {
        axios
            .get(
                `http://localhost:8082/api/books/findBook?title=` + valueSearch
            )
            .then((res) => {
                setListBook(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    // Thêm sách
    const handleCheckAddBook = () => {
        setCheckAdd(true);
        setInputTitle("");
        setInputAuhtor("");
        setInputRelease("");
        setInputLength(0);
        setInputTotalBook(0);
        setInputPrice(0);
        setInputFileName("");
    };

    function handleUpLoad(e) {
        const file = e.target.files[0]; // Dòng này để chích xuất file ảnh từ sự kiện tải lên
        // e.target.files là 1 mảng các file ảnh được tải lên, [0] là chọn ảnh đầu tiên trong số ảnh đó
        let formData = new FormData(); // tạo 1 đối tượng FormData mới, được sử dụng để gửi dữ liệu qua mạng
        // FormData được sử dụng để dính kèm file trong trường hợp này
        formData.append("files", file); // thêm file vào đối tượng FormData với tên files. Tên này được sử dụng để
        // nhận biết file trong phía server khi gửi dữ liệu đi
        setFiles(formData); //  Dòng này sử dụng hàm setFiles để gán giá trị của formData cho biến files. Điều này giúp lưu trữ dữ liệu file để sử dụng trong các bước tiếp theo hoặc gửi đi.
        console.log(file.name);
        setInputFileName(file.name);

        const reader = new FileReader(); //  Dòng này tạo một đối tượng FileReader, được sử dụng để đọc dữ liệu từ file.

        reader.onload = (event) => {
            //Dòng này xác định một hàm xử lý sự kiện (onload) được gọi khi quá trình đọc file
            // hoàn tất. Khi sự kiện xảy ra, hàm xử lý này sẽ lấy dữ liệu đã đọc từ file (event.target.result) và gán nó cho
            // biến imageSrc. Điều này giúp hiển thị hình ảnh trong giao diện người dùng sau khi file được tải lên.
            setImageSrc(event.target.result);
        };

        reader.readAsDataURL(e.target.files[0]); // Dòng này bắt đầu quá trình đọc dữ liệu từ file bằng cách gọi
        // phương thức readAsDataURL. Quá trình này chuyển đổi dữ liệu file thành một chuỗi base64, cho phép hiển thị
        //  hình ảnh trong giao diện bằng cách sử dụng thuộc tính src của một thẻ hình
    }

    const handleConfirmAdd = () => {
        if (inputTitle.trim() === "") {
            alert("Vui lòng điền tên sách");
        } else if (inputAuthor.trim() === "") {
            alert("Vui lòng điền tên tác giả");
        } else if (inputFileName.trim() === "") {
            alert("Vui lòng cập nhật ảnh bìa");
        } else {
            setConfirmAdd(true);
        }
    };

    const confirmYes = () => {
        axios
            .post("http://localhost:8082/api/file/upload", files, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                return res.data;
            })
            .catch((error) => console.log("error" + error));

        axios
            .post(
                "http://localhost:8082/api/book",
                {
                    title: inputTitle,
                    author: inputAuthor,
                    releaseDate: inputRelease,
                    length: inputLength,
                    imgBook: inputFileName,
                    totalBook: inputTotalBook,
                    price: inputPrice,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("Thêm sách thành công");
                setConfirmAdd(false);
                getAllBook();
                return res.data;
            })
            .catch((error) => alert("Thêm sách thất bại"));
    };

    const confirmNo = () => {
        setConfirmAdd(false);
    };

    // Delete book
    const handleDeleteBook = (book) => {
        setCheckDelete(true);
        setDetailBook(book);
    };

    const confirmYesDelete = () => {
        axios
            .delete(`http://localhost:8082/api/book/${detailBook.id}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                alert("Xóa sách thành công");
                getAllBook();
                setCheckDelete(false);
                return res.data;
            })
            .catch((error) => alert("Xóa sách thất bại"));
    };

    // Add genre
    const handleAlertGenre = (id) => {
        setCheckAddGenre(true);
        setIdBook(id);
    };

    const handleConfirmAddGenre = () => {
        axios
            .post(
                `http://localhost:8082/api/book/${idBook}/genre`,
                {
                    name: inputGenre,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("Thêm thể loại thành công");
                return res.data;
            })
            .catch((error) => alert("Thêm thể loại thất bại"));
    };

    // Edit book
    const handleEditBook = (book) => {
        setCheckEdit(true);
        setInputAuhtor(book.author);
        setInputFileName(book.imgBook);
        setIdBook(book.id);
        setInputLength(book.length);
        setInputPrice(book.price);
        setInputRelease(book.releaseDate);
        setInputTitle(book.title);
        setInputSold(book.sold);
        setInputTotalBook(book.totalBook);
    };

    const handleCheckEdit = () => {
        setCheckConfirmEdit(false);
        setCheckEdit(false);
    };

    const confirmYesEdit = () => {
        axios
            .put(
                `http://localhost:8082/api/book/${idBook}`,
                {
                    title: inputTitle,
                    author: inputAuthor,
                    releaseDate: inputRelease,
                    length: inputLength,
                    totalBook: inputTotalBook,
                    sold: inputSold,
                    price: inputPrice,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("Sửa sách thành công");
                getAllBook();
                setCheckConfirmEdit(false);
                setConfirmEdit(false);
                return res.data;
            })
            .catch((error) => alert("Sửa sách thấy bại"));
    };

    const confirmNoEdit = () => {
        setConfirmEdit(false);
    };

    const handleTitleChange = (e) => {
        if (checkConfirmEdit) {
            setInputTitle(e.target.value);
        }
    };

    const handleAuthorChange = (e) => {
        if (checkConfirmEdit) {
            setInputAuhtor(e.target.value);
        }
    };

    const handleDateChange = (e) => {
        if (checkConfirmEdit) {
            setInputRelease(e.target.value);
        }
    };

    const handleLengthChange = (e) => {
        if (checkConfirmEdit) {
            setInputLength(e.target.value);
        }
    };

    const handleSoldChange = (e) => {
        if (checkConfirmEdit) {
            setInputSold(e.target.value);
        }
    };

    const handleTotalChange = (e) => {
        if (checkConfirmEdit) {
            setInputTotalBook(e.target.value);
        }
    };

    const handlePriceChange = (e) => {
        if (checkConfirmEdit) {
            setInputPrice(e.target.value);
        }
    };

    //  Sửa ảnh của sách
    const handleEditImg = (book) => {
        setDetailBook(book);
        setCheckEditImg(true);
    };

    const handleCofirmEditImg = () => {
        axios
            .post("http://localhost:8082/api/file/upload", files)
            .then((res) => {
                return res.data;
            })
            .catch((error) => alert("Thêm ảnh vào kho dữ liệu thất bại"));

        axios
            .post(
                `http://localhost:8082/api/book/${detailBook.id}/bookImg?img=` +
                    files.get("files").name,
                {},
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("Thay ảnh bìa thành công");
                setCheckEditImg(false);
                setInputFileName("");
                setFiles(null);
                setImageSrc("");
                getAllBook();
                return res.data;
            })
            .catch((error) => alert("Thay ảnh bài thất bại"));
    };

    const handleCloseEditImg = () => {
        setCheckEditImg(false);
        setFiles(null);
        setImageSrc("");
    };

    return (
        <>
            <Header />
            <div className="grid container__manager">
                <div className="container container__manager_book">
                    <h1>Quản lí sách</h1>
                    <div className="row search__add_book">
                        <div className="search__book">
                            <input
                                placeholder="Tìm kiếm sách"
                                value={valueSearch}
                                onChange={(e) => setValueSearch(e.target.value)}
                            />
                            <button onClick={handleSearch}>Tìm kiếm</button>
                        </div>
                        <div className="add__book" onClick={handleCheckAddBook}>
                            <button>Thêm Sách</button>
                        </div>
                    </div>
                    <div className="list__cards">
                        {listBook.map((book, index) => (
                            <div className="cards" key={index}>
                                <AiFillCloseCircle
                                    className="delete__book"
                                    onClick={() => handleDeleteBook(book)}
                                    style={{ cursor: "pointer" }}
                                />
                                <div className="overlay__select">
                                    <div
                                        className="select__edit"
                                        onClick={() => handleEditBook(book)}
                                    >
                                        Edit
                                    </div>
                                    <div
                                        className="select__genre"
                                        onClick={() =>
                                            handleAlertGenre(book.id)
                                        }
                                    >
                                        Genre
                                    </div>
                                    <div
                                        className="select__image"
                                        onClick={() => handleEditImg(book)}
                                    >
                                        Image
                                    </div>
                                </div>
                                <img
                                    alt=""
                                    className="cards__img"
                                    src={
                                        `http://localhost:8082/api/file/getImg?path=` +
                                        book.imgBook
                                    }
                                />

                                <div className="infoBook">
                                    <p className="nameBook">{book.title}</p>
                                    <p className="soldBook">
                                        Đã bán: {book.sold}
                                    </p>
                                    <p className="totalBook">
                                        Còn lại: {book.totalBook}
                                    </p>
                                    <p className="priceBook">
                                        Giá bán:
                                        <span> {book.price}đ</span>
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {checkAdd ? (
                <div className="container__add_book">
                    <AiFillCloseCircle
                        className="close__add_book"
                        onClick={() => setCheckAdd(false)}
                        style={{ cursor: "pointer" }}
                    />
                    <h1 className="addBook">Thêm Sách</h1>
                    <div className="container__info_book">
                        <div className="info__book">
                            <div className="value__input">
                                <label>Tiêu đề: </label>
                                <input
                                    placeholder="Tên quyển sách"
                                    value={inputTitle}
                                    onChange={(e) =>
                                        setInputTitle(e.target.value)
                                    }
                                />
                            </div>
                            <div className="value__input">
                                <label>Tác giả: </label>
                                <input
                                    placeholder="Tên tác giả"
                                    value={inputAuthor}
                                    onChange={(e) =>
                                        setInputAuhtor(e.target.value)
                                    }
                                />
                            </div>
                            <div className="value__input">
                                <label>Ngày phát hành: </label>
                                <input
                                    placeholder="DD/MM/YYYY"
                                    value={inputRelease}
                                    onChange={(e) =>
                                        setInputRelease(e.target.value)
                                    }
                                />
                            </div>
                            <div className="value__input">
                                <label>Số trang: </label>
                                <input
                                    placeholder="Số trang sách"
                                    value={inputLength}
                                    onChange={(e) =>
                                        setInputLength(e.target.value)
                                    }
                                />
                            </div>
                            <div className="value__input">
                                <label>Tổng số sách: </label>
                                <input
                                    placeholder="Tổng số sách"
                                    value={inputTotalBook}
                                    onChange={(e) =>
                                        setInputTotalBook(e.target.value)
                                    }
                                />
                            </div>
                            <div className="value__input">
                                <label>Giá tiền: </label>
                                <input
                                    placeholder="Giá tiền 1 quyển"
                                    value={inputPrice}
                                    onChange={(e) =>
                                        setInputPrice(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        <div className="img__book">
                            <div className="containerImgBottom">
                                <input
                                    type="file"
                                    className="selectImg"
                                    id="actual-btn"
                                    onChange={handleUpLoad}
                                    hidden
                                ></input>
                                <button className="uploadButton">
                                    <label for="actual-btn">Upload</label>
                                </button>
                                {imageSrc ? (
                                    <img
                                        src={imageSrc}
                                        className="setUpSizeImg"
                                        alt=""
                                    />
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="select__manager">
                        <button onClick={handleConfirmAdd}>Add</button>
                    </div>
                    {confirmAdd ? (
                        <div className="confirm__manager">
                            <h1>
                                Bạn có chắc chắn muốn thêm 1 quyển sách mới hay
                                không
                            </h1>
                            <div className="confirm__btn">
                                <button onClick={confirmYes}>Xác nhận</button>
                                <button onClick={confirmNo}>Hủy</button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
            {checkDelete ? (
                <div className="containerDelete">
                    <div className="overlay__delete"></div>
                    <div className="container__delete">
                        <AiFillCloseCircle
                            className="close__add_book"
                            onClick={() => setCheckDelete(false)}
                            style={{ cursor: "pointer" }}
                        />
                        <h1>Xác nhận lại thông tin</h1>
                        <div className="container__info_book">
                            <div className="info__book">
                                <div className="value__input">
                                    <label>Tiêu đề: </label>
                                    <input defaultValue={detailBook.title} />
                                </div>
                                <div className="value__input">
                                    <label>Tác giả: </label>
                                    <input defaultValue={detailBook.author} />
                                </div>
                                <div className="value__input">
                                    <label>Ngày phát hành: </label>
                                    <input
                                        defaultValue={detailBook.releaseDate}
                                    />
                                </div>
                                <div className="value__input">
                                    <label>Số trang: </label>
                                    <input defaultValue={detailBook.length} />
                                </div>
                                <div className="value__input">
                                    <label>Tổng số sách: </label>
                                    <input
                                        defaultValue={detailBook.totalBook}
                                    />
                                </div>
                                <div className="value__input">
                                    <label>Giá tiền: </label>
                                    <input defaultValue={detailBook.price} />
                                </div>
                            </div>
                            <div className="img__book">
                                <div className="containerImgBottom">
                                    <img
                                        src={
                                            "http://localhost:8082/api/file/getImg?path=" +
                                            detailBook.imgBook
                                        }
                                        className="set__up__size__img"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="confirm__btn">
                            <button onClick={confirmYesDelete}>Xác nhận</button>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            {checkAddGenre ? (
                <div className="containerAddGenre">
                    <div className="overlay__add_genre"></div>
                    <div className="container__add__genre">
                        <AiFillCloseCircle
                            className="close__add_genre"
                            style={{ cursor: "pointer" }}
                            onClick={() => setCheckAddGenre(false)}
                        />
                        <h1>Thêm thể lại</h1>
                        <div className="input__add_genre">
                            <label>Name: </label>
                            <input
                                placeholder="Nhập thể loại"
                                value={inputGenre}
                                onChange={(e) => setInputGenre(e.target.value)}
                            />
                        </div>
                        <button onClick={handleConfirmAddGenre}>
                            Xác nhận
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
            {checkEdit ? (
                <div className="container__edit_book">
                    <AiFillCloseCircle
                        className="close__edit_book"
                        onClick={handleCheckEdit}
                        style={{ cursor: "pointer" }}
                    />
                    <h1 className="editBook">Sửa Sách</h1>
                    <div className="container__info_book">
                        <div className="info__edit__book">
                            <div className="value__input">
                                <label>Tiêu đề: </label>
                                <input
                                    placeholder="Tên quyển sách"
                                    value={inputTitle}
                                    onChange={(e) => handleTitleChange(e)}
                                    disabled={!checkConfirmEdit}
                                    className={checkConfirmEdit ? "" : "muted"}
                                />
                            </div>
                            <div className="value__input">
                                <label>Tác giả: </label>
                                <input
                                    placeholder="Tên tác giả"
                                    value={inputAuthor}
                                    onChange={(e) => handleAuthorChange(e)}
                                    disabled={!checkConfirmEdit}
                                    className={checkConfirmEdit ? "" : "muted"}
                                />
                            </div>
                            <div className="value__input">
                                <label>Ngày phát hành: </label>
                                <input
                                    placeholder="DD/MM/YYYY"
                                    value={inputRelease}
                                    disabled={!checkConfirmEdit}
                                    onChange={(e) => handleDateChange(e)}
                                    className={checkConfirmEdit ? "" : "muted"}
                                />
                            </div>
                            <div className="value__input">
                                <label>Số trang: </label>
                                <input
                                    placeholder="Số trang sách"
                                    value={inputLength}
                                    disabled={!checkConfirmEdit}
                                    onChange={(e) => handleLengthChange(e)}
                                    className={checkConfirmEdit ? "" : "muted"}
                                />
                            </div>
                            <div className="value__input">
                                <label>Sold: </label>
                                <input
                                    placeholder="Số trang sách"
                                    value={inputSold}
                                    disabled={!checkConfirmEdit}
                                    onChange={(e) => handleSoldChange(e)}
                                    className={checkConfirmEdit ? "" : "muted"}
                                />
                            </div>
                            <div className="value__input">
                                <label>Tổng số sách: </label>
                                <input
                                    placeholder="Tổng số sách"
                                    value={inputTotalBook}
                                    disabled={!checkConfirmEdit}
                                    onChange={(e) => handleTotalChange(e)}
                                    className={checkConfirmEdit ? "" : "muted"}
                                />
                            </div>
                            <div className="value__input">
                                <label>Giá tiền: </label>
                                <input
                                    placeholder="Giá tiền 1 quyển"
                                    value={inputPrice}
                                    disabled={!checkConfirmEdit}
                                    onChange={(e) => handlePriceChange(e)}
                                    className={checkConfirmEdit ? "" : "muted"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="select__manager">
                        {checkConfirmEdit ? (
                            <button onClick={() => setConfirmEdit(true)}>
                                Save
                            </button>
                        ) : (
                            <button onClick={() => setCheckConfirmEdit(true)}>
                                Edit
                            </button>
                        )}
                    </div>
                    {confirmEdit ? (
                        <div className="confirm__manager">
                            <h1>
                                Bạn có chắc chắn muốn sửa các thông tin này
                                không?
                            </h1>
                            <div className="confirm__btn">
                                <button onClick={confirmYesEdit}>
                                    Xác nhận
                                </button>
                                <button onClick={confirmNoEdit}>Hủy</button>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
            {checkEditImg ? (
                <div className="containerEditImg">
                    <div className="overlay__edit__img"></div>
                    <div className="container__edit__img">
                        <AiFillCloseCircle
                            className="delete__book"
                            onClick={handleCloseEditImg}
                            style={{ cursor: "pointer" }}
                        />
                        <h1>Thay ảnh bìa</h1>
                        <div className="edit__img">
                            <div className="edit__img__book">
                                <div className="container__img__old">
                                    <button className="btn__img__old">
                                        <label for="actual-btn">
                                            Ảnh ban đầu
                                        </label>
                                    </button>
                                    <img
                                        src={
                                            "http://localhost:8082/api/file/getImg?path=" +
                                            detailBook.imgBook
                                        }
                                        className="set__up__size__img__edit"
                                        alt=""
                                    />
                                </div>
                            </div>
                            <RxArrowRight className="icon__arrow__right" />
                            <div className="edit__img__book">
                                <div className="container__img__new">
                                    <input
                                        type="file"
                                        className="selectImg"
                                        id="actual-btn"
                                        onChange={handleUpLoad}
                                        hidden
                                    ></input>
                                    <button className="btn__img__new">
                                        <label for="actual-btn">Upload</label>
                                    </button>
                                    {imageSrc ? (
                                        <img
                                            src={imageSrc}
                                            className="set__up__size__img__edit"
                                            alt=""
                                        />
                                    ) : null}
                                </div>
                            </div>
                        </div>
                        <button
                            className="btn__cofirm__edit"
                            onClick={handleCofirmEditImg}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default ManagerBook;
