import { useState } from "react";
import "./Cart.css";
const Cart = ({ cartProducts, onAdd, onRemove, id, Cartkey }) => {
  const totalPrice = cartProducts[Cartkey].reduce(
    (a, c) => a + c.price * c.qty,
    0
  );

  const [discountPerc, setDiscount] = useState(0);
  const priceAfterDiscount = totalPrice - (discountPerc / 100) * totalPrice;

  return (
    <div key={id} id={id} className="cart_container">
      <div>
        {cartProducts[Cartkey].length === 0 && <div> Cart is empty </div>}
      </div>
      <div className="List">
        {cartProducts[Cartkey].map((item) => (
          <div key={item.id} className="Items">
            <h3>{item.name}</h3>
            <div className="add_remove">
              <button
                onClick={(event) => onAdd({ product: item })}
                className="add"
              >
                +
              </button>
              {item.qty}
              <button onClick={(event) => onRemove(item)} className="remove">
                -
              </button>
            </div>
            <div className="price"> ${item.price} </div>
          </div>
        ))}
      </div>
      {cartProducts[Cartkey].length !== 0 && (
        <div className="summary">
          <div className="Total">
            <div>
              <div>Total Price : ${totalPrice}</div>
              <div>Price after Discount : ${priceAfterDiscount}</div>
            </div>
            <div>
              <label htmlFor="discount">
                <div>Discount Percentage %</div>
                <input
                  type="number"
                  id="discount"
                  placeholder="Discount Percentage"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </label>
            </div>
          </div>
          <div className="Checkout">
            <button onClick={(event) => alert("Success")} className="checkout">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
