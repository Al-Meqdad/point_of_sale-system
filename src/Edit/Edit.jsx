import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./Edit.css";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const { state } = useLocation();

  const product = state[0][state[1]];
  const [productName, setProductName] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productPrice, setProductPrice] = useState([]);
  const navigate = useNavigate();

  const updateList = (id, name, category, price) => {
    fetch("http://localhost:5050/products/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, category, price }),
    });
  };

  return (
    <div className="edit-container">
      <form
        className="edit-form"
        onSubmit={(e) => {
          e.preventDefault();

          updateList(
            state[0][state[1]].id,
            productName,
            productCategory,
            productPrice
          );
          navigate("/");
        }}
      >
        <label htmlFor="name">
          <div>Product Name</div>

          <input
            id="name"
            placeholder={product.name}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>

        <label htmlFor="category">
          <div>Product Category</div>

          <input
            id="category"
            placeholder={product.category}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </label>

        <label htmlFor="price">
          <div>Product price</div>

          <input
            id="price"
            placeholder={product.price}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        </label>

        <button>Submit</button>
      </form>
    </div>
  );
};

export default Edit;
