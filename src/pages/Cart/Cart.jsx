import React from "react";
import { Navbar } from "../../components";
import "./Cart.css";

import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "../../redux/cartSlice";

export function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleQuantityChange = (number, quantity) => {
    dispatch(updateQuantity({ number, quantity: Number(quantity) }));
  };

  let totalSum = 0;
  for (const item of cartItems) {
    totalSum += item.pages * item.quantity;
  }

  return (
    <>
      <Navbar />
      <div className="cart-layout container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div className="item" key={item.number}>
              <div>
                <img src={item.cover} alt="cover" />
              </div>
              <div className="item-info">
                <h3>{item.title}</h3>
                <div>
                  <h4>{item.pages * item.quantity} $</h4>
                  <span>
                    <input
                      type="number"
                      min="1"
                      max="9"
                      onChange={(e) =>
                        handleQuantityChange(item.number, e.target.value)
                      }
                      value={item.quantity}
                    />
                    <i
                      className="fas fa-times"
                      onClick={() => dispatch(removeFromCart(item.number))}
                    ></i>
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className="cart-info item">
            <h4>
              Total:
              <span> {totalSum} $</span>
            </h4>
            <button>Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
}
