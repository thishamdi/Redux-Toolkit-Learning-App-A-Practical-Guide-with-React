import React, { useEffect } from "react";
import { Navbar } from "../../components";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";

import { fetchBooks } from "../../redux/bookSlice";
import { addToCart } from "../../redux/cartSlice";

export function Home() {
  const books = useSelector((state) => state.books.books);
  const bookStatus = useSelector((state) => state.books.status);
  const error = useSelector((state) => state.books.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookStatus === null) {
      dispatch(fetchBooks());
    }
  }, [bookStatus, dispatch]);

  const handleAddToCart = (book) => {
    dispatch(addToCart(book));
  };

  return (
    <>
      <Navbar />

      <div className="books-container container">
        <h1>Latest Books</h1>

        {bookStatus === "loading" && <div>Loading...</div>}
        {bookStatus === "failed" && (
          <div className="error-message">{error}</div>
        )}

        <div className="book-cards">
          {bookStatus === "succeeded" &&
            books.map((book) => (
              <div className="book-card" key={book.number}>
                <img src={book.cover} alt="cover" className="book-cover" />
                <h4 className="book-title">{book.title}</h4>
                <div className="book-info">
                  <p className="book-price">{book.pages} $</p>
                  <i
                    className="fas fa-cart-plus"
                    onClick={() => handleAddToCart(book)}
                  ></i>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
