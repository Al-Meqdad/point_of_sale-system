import { useState } from "react";

const Cart = ({ cartProducts, onAdd, onRemove, id }) => {
  const totalPrice = cartProducts.reduce((a, c) => a + c.price * c.qty, 0);
  const [discountPerc, setDiscount] = useState(0);
  const [priceafterDiscount, setpriceafterDiscount] = useState(totalPrice);

  const discount = (percentage) => {
    setpriceafterDiscount(totalPrice);
    setpriceafterDiscount(totalPrice - (percentage / 100) * totalPrice);
  };

  return (
    <div key={id} id={id}>
      <h3>Shopping cart</h3>
      <div>{cartProducts.length === 0 && <div> Cart is empty </div>}</div>
      {cartProducts.map((item) => (
        <div key={item.id} className="row">
          <div className="col-2">{item.name}</div>
          <div className="col-2">
            <button onClick={(event) => onAdd(item)} className="add">
              +
            </button>
            <button onClick={(event) => onRemove(item)} className="remove">
              -
            </button>
          </div>
          <div className="col-2 text-right">
            {item.qty} x ${item.price}
          </div>
        </div>
      ))}
      {cartProducts.length !== 0 && (
        <div className="row">
          <hr></hr>
          <div className="col-6">
            <div>Total Price : ${totalPrice}</div>
            <div>Price after Discount : ${priceafterDiscount}</div>
          </div>
          <div className="col-6">
            <form
              className="edit-form"
              onSubmit={(e) => {
                e.preventDefault();
                discount(discountPerc);
              }}
            >
              <label htmlFor="name">
                <div>Discount Percentage %</div>

                <input
                  id="name"
                  placeholder="Discount Percentage"
                  onChange={(e) => setDiscount(e.target.value)}
                />
              </label>
              <button>Discount</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
