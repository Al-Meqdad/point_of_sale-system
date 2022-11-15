import { useState } from "react";
import "./Edit.css";

const Edit = ({ current, Gener }) => {
  const [productName, setProductName] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productPrice, setProductPrice] = useState([]);

  const updateList = (array) => {
    fetch(`http://localhost:5050/${Gener}/` + current.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(array),
    });
  };
  if (Gener === "products") {
    return (
      <div className="edit-container">
        <form
          className="edit-form"
          onSubmit={(e) => {
            updateList({
              name: productName,
              category: productCategory,
              price: productPrice,
            });
          }}
        >
          <label htmlFor="name">
            <div>Product Name</div>

            <input
              id="name"
              placeholder={current.name}
              onChange={(e) => setProductName(e.target.value)}
            />
          </label>

          <label htmlFor="category">
            <div>Product Category</div>

            <input
              id="category"
              placeholder={current.category}
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </label>

          <label htmlFor="price">
            <div>Product price</div>

            <input
              id="price"
              placeholder={current.price}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </label>

          <button>Submit</button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="edit-container">
        <form
          className="edit-form"
          onSubmit={(e) => {
            updateList({ category: productCategory });
          }}
        >
          <label htmlFor="category">
            <div>Product Category</div>

            <input
              id="category"
              placeholder={current.category}
              onChange={(e) => setProductCategory(e.target.value)}
            />
          </label>

          <button>Submit</button>
        </form>
      </div>
    );
  }
};

export default Edit;
