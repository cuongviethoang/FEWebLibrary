import React, { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "./Card.css";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Card = ({ book }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        });
    }, []);
    return (
        <>
            {isLoading ? (
                <div className="cards">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton height={420} duration={2} />
                    </SkeletonTheme>
                </div>
            ) : (
                <Link
                    to={`/Book/${book.id}`}
                    style={{ textDecoration: "none", color: "#fff" }}
                >
                    <div className="cards">
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
                            <p className="soldBook">Đã bán: {book.sold}</p>
                            <p className="totalBook">
                                Còn lại: {book.totalBook}
                            </p>
                            <p className="priceBook">
                                Giá bán:
                                <span> {book.price}đ</span>
                            </p>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Card;
