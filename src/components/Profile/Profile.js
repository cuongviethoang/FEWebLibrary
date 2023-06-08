import React from "react";
import Header from "../Header/Header";
import "./Profile.css";
import "../GridSystem/Grid.css";
import { AiFillCamera, AiFillCloseCircle } from "react-icons/ai";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

function Profile() {
    const [checkCamera, setCheckCamera] = useState(false);
    const [files, setFiles] = useState(null);
    const [imageSrc, setImageSrc] = useState("");
    const [currentBill, setCurrentBill] = useState([]);
    const [billDetail, setBillDetail] = useState({});
    const [checkDeleteBill, setCheckDeleteBill] = useState(false);
    const [checkProfilePic, setProfilePic] = useState(
        localStorage.getItem("profilePic")
    );

    const navigate = useNavigate();

    useEffect(() => {
        getBill();
    }, []);

    // Set up camera
    const handleUpFile = () => {
        setCheckCamera(true);
    };

    const handleCloseUpFile = () => {
        setCheckCamera(false);
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

    const handleConfirm = () => {
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
                "http://localhost:8082/api/test/user/imgUser?path=" +
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
                localStorage.setItem("profilePic", files.get("files").name);
                setCheckCamera(false);
                setProfilePic(files.get("files").name);
                return res.data;
            })
            .catch((error) => console.log("error" + error));
    };

    //  Set up bill
    const getBill = () => {
        axios
            .get("http://localhost:8082/api/bill/show", {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                setCurrentBill(res.data);
                return res.data;
            })
            .catch((error) => console.log("error: ", error));
    };

    // Mua lại sách
    const handleToBookDetail = (index) => {
        navigate(`/Book/${index}`);
    };

    // xóa bill
    const handleDeleteBill = (bill) => {
        setBillDetail(bill);
        setCheckDeleteBill(true);
    };

    const handleConfirmDelBill = () => {
        axios
            .put(
                `http://localhost:8082/api/book/${billDetail.idBook}/delbill`,
                {
                    usedBuy: billDetail.usedBuy,
                },
                {
                    headers: {
                        Authorization:
                            "Bearer " + localStorage.getItem("accessToken"),
                    },
                }
            )
            .then((res) => res.data)
            .catch((error) => console.log(error));

        axios
            .delete(`http://localhost:8082/api/bill/${billDetail.id}`, {
                headers: {
                    Authorization:
                        "Bearer " + localStorage.getItem("accessToken"),
                },
            })
            .then((res) => {
                alert("Xóa bill thành công");
                getBill();
                setCheckDeleteBill(false);
                return res.data;
            })
            .catch((error) => alert("Xóa bill thất bại"));
    };

    return (
        <>
            <Header />
            <div
                className={
                    checkCamera
                        ? "overlayContainer"
                        : "overlayContainer hiddenUpFile"
                }
            ></div>
            <div
                className={
                    checkCamera
                        ? "upFileContainer"
                        : "upFileContainer hiddenUpFile"
                }
            >
                <div className="containerImgTop">
                    <h2 className="titleUpImg">Cập nhật ảnh đại diện</h2>
                    <AiFillCloseCircle
                        className="iconClose"
                        onClick={handleCloseUpFile}
                    />
                </div>
                <div className="containerImgBottom">
                    <input
                        type="file"
                        className="selectImg"
                        id="actual-btn"
                        onChange={handleUpLoad}
                        hidden
                    ></input>
                    <button className="uploadButton">
                        <label for="actual-btn">Choose File</label>
                    </button>
                    {imageSrc ? (
                        <img src={imageSrc} className="setUpSizeImg" alt="" />
                    ) : null}

                    <button className="confirmButton" onClick={handleConfirm}>
                        <label>Confirm</label>
                    </button>
                </div>
            </div>
            <div>
                <div className="containerProfile">
                    <div className="containerIntro">
                        <div className="intro_top">
                            <div className="intro_detailsUser">
                                <div className="circleImg">
                                    <img
                                        className="userImg"
                                        src={
                                            checkProfilePic == "null"
                                                ? "https://tse3.mm.bing.net/th?id=OIP.CiC4AzdlWzYcj2j65RM33AAAAA&pid=Api&P=0"
                                                : "http://localhost:8082/api/file/getImg?path=" +
                                                  localStorage.getItem(
                                                      "profilePic"
                                                  )
                                        }
                                        alt=""
                                    />
                                    <div className="circleCamera">
                                        <AiFillCamera
                                            className="iconCamera"
                                            onClick={handleUpFile}
                                        />
                                    </div>
                                </div>
                                <div className="detailsUser">
                                    <h2 className="detailsUser_Name">
                                        {localStorage.getItem("username")}
                                    </h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="grid containerBill">
                    <div className="container">
                        <h1 className="bill">Hóa đơn</h1>
                        {currentBill.map((bill, index) => (
                            <div className="row container__bill" key={index}>
                                <AiFillCloseCircle
                                    className="icon__delete__bill"
                                    onClick={() => handleDeleteBill(bill)}
                                    style={{ cursor: "pointer" }}
                                />
                                <div className="frame__bill">
                                    <div className="img__bill">
                                        <img
                                            alt=""
                                            src={
                                                "http://localhost:8082/api/file/getImg?path=" +
                                                bill.img
                                            }
                                            className="image__bill"
                                        ></img>
                                    </div>
                                    <div className="info__bill">
                                        <h4 className="name__book__bill">
                                            {bill.bookTitle}
                                        </h4>
                                        <span className="date__bill">
                                            Thời gian: {bill.date} {bill.time}
                                        </span>
                                        <span className="address__bill">
                                            Địa chỉ: {bill.address}
                                        </span>
                                        <span className="sdt__bill">
                                            Số điện thoại: {bill.sdt}
                                        </span>
                                        <span className="number__sold">
                                            Đã mua: {bill.usedBuy} quyển
                                        </span>
                                        <span className="price__one__book">
                                            Giá tiền: {bill.price}đ
                                        </span>
                                        <div className="total__book">
                                            <span className="total__bill">
                                                Tổng tiền: {bill.totalPrice}đ
                                            </span>
                                            <button
                                                className="regain"
                                                onClick={() =>
                                                    handleToBookDetail(
                                                        bill.idBook
                                                    )
                                                }
                                            >
                                                Mua lại
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {checkDeleteBill ? (
                <div className="containerDeleteBill">
                    <div className="overlay__delete__bill"></div>
                    <div className="delete__bill">
                        <h1>Bạn có chắc chắn muốn xóa bill này không?</h1>
                        <div className="confirm__btn">
                            <button
                                className="confirmDelBill"
                                onClick={handleConfirmDelBill}
                            >
                                Xác nhận
                            </button>
                            <button
                                className="confirmNoBill"
                                onClick={() => setCheckDeleteBill(false)}
                            >
                                Không
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
            <Footer />
        </>
    );
}

export default Profile;
