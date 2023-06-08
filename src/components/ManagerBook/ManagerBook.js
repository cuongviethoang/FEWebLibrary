import React from "react";
import "./ManagerBook.css";
import "../GridSystem/Grid.css";
import Header from "../Header/Header";
import { useState, useEffect } from "react";
import axios from "axios";
import { AiFillCloseCircle } from "react-icons/ai";
import Select from "react-select";
import moment from "moment";
import { Link } from "react-router-dom";

function ManagerBook() {
    const [valueSearch, setValueSearch] = useState("");
    const [listBook, setListBook] = useState([]);
    const [listGenres, setListGenres] = useState([]);
    const [checkAdd, setCheckAdd] = useState(false);
    const [checkEdit, setCheckEdit] = useState(false);
    const [checkConfirmEdit, setCheckConfirmEdit] = useState(false);
    const [files, setFiles] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [confirmAdd, setConfirmAdd] = useState(false);
    const [confirmEdit, setConfirmEdit] = useState(false);
    const [checkDelete, setCheckDelete] = useState(false);

    const [idBook, setIdBook] = useState(0);

    const [inputTitle, setInputTitle] = useState("");
    const [inputAuthor, setInputAuhtor] = useState("");
    const [inputOverview, setInputOverview] = useState("");
    const [inputRelease, setInputRelease] = useState("");
    const [inputDate, setInputDate] = useState("");
    const [inputLength, setInputLength] = useState("");
    const [selectGenre, setSelectGenre] = useState([]);
    const [inputSold, setInputSold] = useState(0);
    const [inputTotalBook, setInputTotalBook] = useState(0);
    const [inputPrice, setInputPrice] = useState(0);
    const [inputFileName, setInputFileName] = useState("");

    useEffect(() => {
        getAllBook();
        getAllGenre();
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

    // Gọi tất cả thể loại
    const getAllGenre = () => {
        axios
            .get("http://localhost:8082/api/genres", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setListGenres(res.data);
                return res.data;
            })
            .catch((error) => console.log(error));
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
        setInputOverview("");
        setInputDate("");
        setImageSrc("");
    };

    const handleCloseAddBook = () => {
        setCheckAdd(false);
    };

    const handleChangeDate = (e) => {
        const selectedDate = e.target.value;
        setInputDate(selectedDate);
        const formattedDate = moment(selectedDate).format("DD/MM/YYYY");
        setInputRelease(formattedDate);
    };

    const handleChangeGenre = (e) => {
        let arr = Array.isArray(e) ? e.map((x) => x.value) : [];
        setSelectGenre(arr);
    };

    function handleUpLoad(e) {
        const file = e.target.files[0]; // Dòng này để chích xuất file ảnh từ sự kiện tải lên
        // e.target.files là 1 mảng các file ảnh được tải lên, [0] là chọn ảnh đầu tiên trong số ảnh đó
        let formData = new FormData(); // tạo 1 đối tượng FormData mới, được sử dụng để gửi dữ liệu qua mạng
        // FormData được sử dụng để dính kèm file trong trường hợp này
        formData.append("files", file); // thêm file vào đối tượng FormData với tên files. Tên này được sử dụng để
        // nhận biết file trong phía server khi gửi dữ liệu đi
        setFiles(formData); //  Dòng này sử dụng hàm setFiles để gán giá trị của formData cho biến files. Điều này giúp lưu trữ dữ liệu file để sử dụng trong các bước tiếp theo hoặc gửi đi.
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

    const confirmYesAddBook = () => {
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
                    overview: inputOverview,
                    length: inputLength,
                    imgBook: inputFileName,
                    totalBook: inputTotalBook,
                    price: inputPrice,
                    genres: selectGenre,
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
                setCheckAdd(false);
                getAllBook();
                return res.data;
            })
            .catch((error) => {
                const resMess =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.toString() ||
                    error.message();
                alert(resMess);
            });
    };

    const confirmNoAddBook = () => {
        setConfirmAdd(false);
    };

    // Xóa sách
    const handleCheckDelBook = (book) => {
        setCheckDelete(true);
        setIdBook(book.id);
    };

    const confirmYesDelBook = () => {
        axios
            .delete(`http://localhost:8082/api/book/${idBook}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setIdBook(0);
                setCheckDelete(false);
                getAllBook();
                alert("Xóa sách thành công");
                return res.data;
            })
            .catch((error) => console.log(error));
    };

    const confirmNoDelBook = () => {
        setIdBook(0);
        setCheckDelete(false);
    };

    // Sửa sách
    const handleCheckEditBook = (book) => {
        setCheckEdit(true);
        setIdBook(book.id);
        setInputTitle(book.title);
        setInputAuhtor(book.author);
        setInputRelease(book.releaseDate);
        setInputLength(book.length);
        setInputSold(book.sold);
        setInputOverview(book.overview);
        setInputFileName(book.imgBook);
        setInputTotalBook(book.totalBook);
        setInputPrice(book.price);
        setSelectGenre(book.genres);
        setImageSrc("");
    };

    const handleCloseEditBook = () => {
        setCheckEdit(false);
        setIdBook(0);
        setInputTitle("");
        setInputAuhtor("");
        setInputRelease("");
        setInputLength(0);
        setInputSold(0);
        setInputOverview("");
        setInputFileName("");
        setInputTotalBook(0);
        setInputPrice(0);
        setSelectGenre([]);
        setImageSrc("");
        setInputDate("");
        setCheckConfirmEdit(false);
        setConfirmEdit(false);
    };

    const handleConfirmEdit = () => {
        setCheckConfirmEdit(true);
    };

    const handleConfirmSave = () => {
        setConfirmEdit(true);
    };

    const confirmYesEditBook = () => {
        files &&
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
            .put(
                `http://localhost:8082/api/book/${idBook}`,
                {
                    title: inputTitle,
                    author: inputAuthor,
                    releaseDate: inputRelease,
                    length: inputLength,
                    sold: inputSold,
                    overview: inputOverview,
                    imgBook: inputFileName,
                    totalBook: inputTotalBook,
                    price: inputPrice,
                    genres: selectGenre,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => {
                alert("Sửa phim thành công");
                getAllBook();
                setCheckEdit(false);
                setConfirmEdit(false);
                setCheckConfirmEdit(false);
                return res.data;
            })
            .catch((error) => {
                const resMess =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.toString() ||
                    error.message();
                alert(resMess);
            });
    };

    const confirmNoEditBook = () => {
        setConfirmEdit(false);
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
                        {localStorage.getItem("role") === "ROLE_ADMIN" ? (
                            <div
                                className="add__book"
                                onClick={handleCheckAddBook}
                            >
                                <button>Thêm Sách</button>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className="list__table__book">
                        <table className="book-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên sách</th>
                                    <th>Tác giả</th>
                                    <th>Thể loại</th>
                                    <th>Ngày phát hành</th>
                                    <th>Số trang</th>
                                    <th>Đã bán</th>
                                    <th>Xem chi tiết</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listBook.map((book) => (
                                    <tr key={book.id}>
                                        <td>{book.id}</td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>
                                            {book.genres
                                                ? book.genres.map((genre) => (
                                                      <span className="genre__name">
                                                          {genre.name}
                                                      </span>
                                                  ))
                                                : ""}
                                        </td>
                                        <td>{book.releaseDate}</td>
                                        <td>{book.length}</td>
                                        <td>{book.sold}</td>
                                        <td>
                                            <Link
                                                to={`/Book/${book.id}`}
                                                style={{
                                                    textDecoration: "none",
                                                }}
                                            >
                                                <button className="btn__view">
                                                    View
                                                </button>
                                            </Link>
                                            {localStorage.getItem("role") ===
                                            "ROLE_ADMIN" ? (
                                                <button
                                                    className="btn__edit"
                                                    onClick={() =>
                                                        handleCheckEditBook(
                                                            book
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                            {localStorage.getItem("role") ===
                                            "ROLE_ADMIN" ? (
                                                <button
                                                    className="btn__del"
                                                    onClick={() =>
                                                        handleCheckDelBook(book)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {checkAdd ? (
                <div className="container__add_book">
                    <AiFillCloseCircle
                        className="close__add_book"
                        onClick={handleCloseAddBook}
                        style={{ cursor: "pointer" }}
                    />
                    <h1 className="addBook">Thêm Sách</h1>
                    <div className="container__info_book">
                        <div className="info__book">
                            <div className="title__author">
                                <div className="title__input">
                                    <label>Tiêu đề: </label>
                                    <input
                                        placeholder="Tên quyển sách"
                                        value={inputTitle}
                                        onChange={(e) =>
                                            setInputTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="author__input">
                                    <label>Tác giả: </label>
                                    <input
                                        placeholder="Tên tác giả"
                                        value={inputAuthor}
                                        onChange={(e) =>
                                            setInputAuhtor(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="overview__book">
                                <label>Mô tả sách: </label>
                                <textarea
                                    placeholder="Giới thiệu sách"
                                    value={inputOverview}
                                    onChange={(e) =>
                                        setInputOverview(e.target.value)
                                    }
                                />
                            </div>
                            <div className="date__length">
                                <div className="title__input">
                                    <label>Ngày phát hành: </label>
                                    <input
                                        type="date"
                                        placeholder="DD/MM/YYYY"
                                        value={inputDate}
                                        onChange={(e) => handleChangeDate(e)}
                                    />
                                </div>
                                <div className="author__input">
                                    <label>Số trang: </label>
                                    <input
                                        placeholder="Số trang sách"
                                        value={inputLength}
                                        onChange={(e) =>
                                            setInputLength(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="genres__book">
                                <label>Thể loại: </label>
                                <Select
                                    placeholder="Chọn thể loại"
                                    options={listGenres.map((genre) => ({
                                        value: genre,
                                        label: genre.name,
                                    }))}
                                    onChange={handleChangeGenre}
                                    className="select__add__genre"
                                    isClearable={true}
                                    isSearchable={true}
                                    isMulti={true}
                                />
                            </div>
                            <div className="price__total">
                                <div className="title__input">
                                    <label>Giá tiền: </label>
                                    <input
                                        placeholder="Giá tiền"
                                        value={inputPrice}
                                        onChange={(e) =>
                                            setInputPrice(e.target.value)
                                        }
                                    />
                                </div>
                                <div className="author__input">
                                    <label>Tổng số sách: </label>
                                    <input
                                        placeholder="Tổng số sách"
                                        value={inputTotalBook}
                                        onChange={(e) =>
                                            setInputTotalBook(e.target.value)
                                        }
                                    />
                                </div>
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
                                <button className="upload__btn">
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
                            <div className="overlay__confirm"></div>
                            <div className="frame__confirm">
                                <h1>
                                    Bạn có chắc chắn muốn thêm 1 quyển sách mới
                                    hay không
                                </h1>
                                <div className="confirm__btn">
                                    <button onClick={confirmYesAddBook}>
                                        Xác nhận
                                    </button>
                                    <button onClick={confirmNoAddBook}>
                                        Hủy
                                    </button>
                                </div>
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
                <div className="container__del__book">
                    <div className="overlay__del__book"></div>
                    <div className="frame__confirm">
                        <h1>Bạn có chắc chắn muốn xóa quyển sách này không?</h1>
                        <div className="confirm__btn">
                            <button onClick={confirmYesDelBook}>
                                Xác nhận
                            </button>
                            <button onClick={confirmNoDelBook}>Hủy</button>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            {checkEdit ? (
                <div className="container__add_book">
                    <AiFillCloseCircle
                        className="close__add_book"
                        onClick={handleCloseEditBook}
                        style={{ cursor: "pointer" }}
                    />
                    <h1 className="addBook">Sửa Sách</h1>
                    <div className="container__info_book">
                        <div className="info__book">
                            <div className="id__book">
                                <label>ID: </label>
                                <input
                                    defaultValue={idBook}
                                    className="muted"
                                />
                            </div>
                            <div className="title__author">
                                <div className="title__input">
                                    <label>Tiêu đề: </label>
                                    <input
                                        placeholder="Tên quyển sách"
                                        value={inputTitle}
                                        onChange={(e) =>
                                            setInputTitle(e.target.value)
                                        }
                                        className={
                                            checkConfirmEdit ? "" : "muted"
                                        }
                                    />
                                </div>
                                <div className="author__input">
                                    <label>Tác giả: </label>
                                    <input
                                        placeholder="Tên tác giả"
                                        value={inputAuthor}
                                        onChange={(e) =>
                                            setInputAuhtor(e.target.value)
                                        }
                                        className={
                                            checkConfirmEdit ? "" : "muted"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="overview__book">
                                <label>Mô tả sách: </label>
                                <textarea
                                    placeholder="Giới thiệu sách"
                                    value={inputOverview}
                                    onChange={(e) =>
                                        setInputOverview(e.target.value)
                                    }
                                    className={checkConfirmEdit ? "" : "muted"}
                                />
                            </div>
                            <div className="date__length">
                                <div className="title__input">
                                    <label>Ngày phát hành: </label>
                                    <input
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        value={inputRelease}
                                        onChange={(e) =>
                                            setInputRelease(e.target.value)
                                        }
                                        className={
                                            checkConfirmEdit ? "" : "muted"
                                        }
                                    />
                                </div>
                                <div className="author__input">
                                    <label>Số trang: </label>
                                    <input
                                        placeholder="Số trang sách"
                                        value={inputLength}
                                        onChange={(e) =>
                                            setInputLength(e.target.value)
                                        }
                                        className={
                                            checkConfirmEdit ? "" : "muted"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="genres__book">
                                <label>Thể loại: </label>
                                <Select
                                    placeholder="Chọn thể loại"
                                    options={listGenres.map((genre) => ({
                                        value: genre,
                                        label: genre.name,
                                    }))}
                                    onChange={handleChangeGenre}
                                    className={
                                        checkConfirmEdit
                                            ? "select__add__genre"
                                            : "muted"
                                    }
                                    isClearable={true}
                                    isSearchable={true}
                                    isMulti={true}
                                />
                            </div>
                            <div className="price__total">
                                <div className="title__input">
                                    <label>Giá tiền: </label>
                                    <input
                                        placeholder="Giá tiền"
                                        value={inputPrice}
                                        onChange={(e) =>
                                            setInputPrice(e.target.value)
                                        }
                                        className={
                                            checkConfirmEdit ? "" : "muted"
                                        }
                                    />
                                </div>
                                <div className="author__input">
                                    <label>Sách đã bán: </label>
                                    <input
                                        placeholder="Sách đã bán"
                                        value={inputSold}
                                        onChange={(e) =>
                                            setInputSold(e.target.value)
                                        }
                                        className={
                                            checkConfirmEdit ? "" : "muted"
                                        }
                                    />
                                </div>
                            </div>
                            <div className="totalbook__input">
                                <label>Tổng số sách: </label>
                                <input
                                    placeholder="Tổng số sách"
                                    value={inputTotalBook}
                                    onChange={(e) =>
                                        setInputTotalBook(e.target.value)
                                    }
                                    className={checkConfirmEdit ? "" : "muted"}
                                />
                            </div>
                        </div>
                        <div className="img__book">
                            <div className="containerImgBottom">
                                <input
                                    type="file"
                                    className={
                                        checkConfirmEdit ? "selectImg" : "muted"
                                    }
                                    id="actual-btn"
                                    onChange={handleUpLoad}
                                    hidden
                                ></input>
                                <button
                                    className={
                                        checkConfirmEdit
                                            ? "upload__btn"
                                            : "upload__btn muted"
                                    }
                                >
                                    <label for="actual-btn">Upload</label>
                                </button>
                                {imageSrc ? (
                                    <img
                                        src={imageSrc}
                                        className="setUpSizeImg"
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        src={
                                            "http://localhost:8082/api/file/getImg?path=" +
                                            inputFileName
                                        }
                                        className="setUpSizeImg"
                                        alt=""
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="select__manager">
                        {checkConfirmEdit ? (
                            <button onClick={handleConfirmSave}>Save</button>
                        ) : (
                            <button onClick={handleConfirmEdit}>Edit</button>
                        )}
                    </div>
                    {confirmEdit ? (
                        <div className="confirm__manager">
                            <div className="overlay__confirm"></div>
                            <div className="frame__confirm">
                                <h1>
                                    Bạn có chắc chắn muốn sửa quyển sách này
                                    không?
                                </h1>
                                <div className="confirm__btn">
                                    <button onClick={confirmYesEditBook}>
                                        Xác nhận
                                    </button>
                                    <button onClick={confirmNoEditBook}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            ) : (
                ""
            )}
        </>
    );
}

export default ManagerBook;
