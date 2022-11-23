import { useState, FunctionComponent } from "react";
import "./Cart.css";
import { ProductsApi } from "../ApiRespones";

interface PageProps {
  cartProducts: ProductsApi[];
  onAdd: ({ product }: { product: ProductsApi }) => void;
  onRemove: ({ product }: { product: ProductsApi }) => void;
  onDelete: ({ product }: { product: ProductsApi }) => void;
  Cartkey: string;
  updateCart: number;
}

const Cart: FunctionComponent<PageProps> = ({
  cartProducts,
  onAdd,
  onRemove,
  onDelete,
  Cartkey,
}) => {
  const totalPrice: number = cartProducts.reduce(
    (a, c) => a + c.price * c.qty,
    0
  );
  const [discountPerc, setDiscount] = useState("0" as string);
  const priceAfterDiscount =
    totalPrice - (parseInt(discountPerc) / 100) * totalPrice;

  return (
    <div key={Cartkey} className="cart_container">
      <div>{cartProducts.length === 0 && <div> Cart is empty </div>}</div>
      <div className="List">
        <div className="Items options">
          <h4>Name</h4>
          <h4>Options</h4>
          <h4>Price</h4>
        </div>
        {cartProducts.map((item) => (
          <div key={item.id} className="Items">
            <h3>{item.name}</h3>
            <div className="add_remove">
              <button onClick={() => onAdd({ product: item })} className="add">
                +
              </button>
              {item.qty}
              <button
                onClick={() => onRemove({ product: item })}
                className="remove"
              >
                -
              </button>
              <button
                onClick={() => onDelete({ product: item })}
                className="remove"
              >
                Delete
              </button>
            </div>
            <div className="price"> ${item.price} </div>
          </div>
        ))}
      </div>
      {cartProducts.length !== 0 && (
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
            <button onClick={() => alert("Success")} className="checkout">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
