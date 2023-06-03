import React from "react";
import "../GridSystem/Grid.css";
import "./Footer.css";
import { BsFacebook, BsPinterest, BsYoutube } from "react-icons/bs";
import { AiFillInstagram, AiFillTwitterCircle } from "react-icons/ai";

function Footer() {
    return (
        <>
            <div className="footer">
                <div className="grid containerFooter">
                    <div className="container">
                        <div className="row container__footer">
                            <div className="col l-4 footer__left">
                                <div className="frame__footer__left">
                                    <h1 className="title__footer">
                                        WebBook.VN
                                    </h1>
                                    <p className="desc__footer__left">
                                        WebBook.VN nhận đặt hàng trực tuyến và
                                        giao tận nơi. Không hỗ trợ đặt mua và
                                        nhận hàng trực tiếp tại văn phòng cũng
                                        như tất cả Hệ thông WebBook trên toàn
                                        quốc
                                    </p>
                                    <div className="img__bct">
                                        <img
                                            className="image__bct"
                                            alt=""
                                            src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/logo-bo-cong-thuong-da-thong-bao1.png"
                                        />
                                    </div>
                                    <div className="social__footer__media">
                                        <BsFacebook className="social__face" />
                                        <AiFillInstagram className="social__insta" />
                                        <BsYoutube className="social__youtube" />
                                        <AiFillTwitterCircle className="social__twice" />
                                        <BsPinterest className="social__pinterest" />
                                    </div>
                                    <div className="social__download">
                                        <img
                                            alt=""
                                            src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/android1.png"
                                            className="img__ggplay"
                                        />
                                        <img
                                            alt=""
                                            src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/appstore1.png"
                                            className="img__appstore"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col l-8 footer__right">
                                <div className="row footer__right__top">
                                    <div className="l-4 listService">
                                        <h3>DỊCH VỤ</h3>
                                        <ul className="list__service">
                                            <li>Điều khoản sử dụng</li>
                                            <li>
                                                Chính sách bảo mật thông tin cá
                                                nhân
                                            </li>
                                            <li>
                                                Chính sách bảo mật thanh toán
                                            </li>
                                            <li>Giới thiệu Fahasa</li>
                                            <li>
                                                Hệ thống trung tâm - nhà sách
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="l-4 listHelp">
                                        <h3>HỖ TRỢ</h3>
                                        <ul className="list__help">
                                            <li>
                                                Chính sách đổi - trả - hoàn tiền
                                            </li>
                                            <li>
                                                Chính sách bảo hoành - bổi hoàn
                                            </li>
                                            <li>Chính sách vận chuyển</li>
                                            <li>Chính sách khách sỉ</li>
                                            <li>
                                                Phương thức thanh toán và xuất
                                                HĐ
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="l-4 listMyUser">
                                        <h3>TÀI KHOẢN CỦA TÔI</h3>
                                        <ul className="list__myUser">
                                            <li>
                                                Đăng nhâp / tạo tài khoản mới
                                            </li>
                                            <li>Thay đổi địa chỉ khách hàng</li>
                                            <li>Chi tiết tài khoản</li>
                                            <li>Lịch sử mua hàng</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row footer__right__bottom">
                                    <h3>LIÊN HỆ</h3>
                                    <div className="list__call">
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/vnpost1.png"
                                                className="image__call"
                                            />
                                        </div>
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/ahamove_logo3.png"
                                                className="image__call"
                                            />
                                        </div>
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_giao_hang_nhanh1.png"
                                                className="image__call"
                                            />
                                        </div>
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/Logo_ninjavan.png"
                                                className="image__call"
                                            />
                                        </div>
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media/wysiwyg/Logo-NCC/icon_snappy1.png"
                                                className="image__call"
                                            />
                                        </div>
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/vnpay_logo.png"
                                                className="image__call"
                                            />
                                        </div>
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/ZaloPay-logo-130x83.png"
                                                className="image__call"
                                            />
                                        </div>
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/momopay.png"
                                                className="image__call"
                                            />
                                        </div>
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/shopeepay_logo.png"
                                                className="image__call"
                                            />
                                        </div>
                                        <div className="img__call">
                                            <img
                                                alt=""
                                                src="https://cdn0.fahasa.com/media//wysiwyg/Logo-NCC/logo_moca_120.jpg"
                                                className="image__call"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
