import { useEffect, useState } from "react";
import "./c.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Edit from "../Edit/Edit";

const Categories = ({ handleChange }) => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const [currentProduct, setCurrentProduct] = useState();
  const [toggleEdit, setEditModal] = useState(false);
  const [query, setQuery] = useState("");

  const getFilteredCategories = (query, categories) => {
    if (!query) {
      return categories;
    } else {
      return categories.filter((c) =>
        c.category.toLowerCase().includes(query.toLowerCase())
      );
    }
  };
  const filteredCategories = getFilteredCategories(query, categories);

  useEffect(() => {
    requestCategories();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  async function requestCategories() {
    const res = await fetch("http://localhost:5050/categories");
    const json = await res.json();
    setCategories(json);
  }

  const array = [];
  for (let values of Object.values(categories)) {
    array.push(values.category);
  }

  const add = () => {
    navigate("/Add", { state: ["categories"] });
  };

  const expandModal = (project) => {
    setCurrentProduct(project);
    setEditModal(true);
  };

  const closeModal = () => {
    setEditModal(false);
  };

  return (
    <div>
      <h1>Featured Categories</h1>
      <label>Search Categories</label>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <div className="item-container">
        <div className="card">
          <input
            type="radio"
            id="category1"
            name="category"
            onChange={(event) => handleChange(array)}
          />
          <label htmlFor="category1">All</label>

          {filteredCategories.map((c) => (
            <div key={c.category}>
              <input
                type="radio"
                id={c.category}
                name="category"
                onChange={(event) => handleChange(c.category)}
              />

              <label htmlFor={c.category}>
                {c.category}{" "}
                <button onClick={(event) => expandModal(c)}>Edit data</button>
              </label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={(event) => add()}>Add a Category</button>
      <Modal
        backdropClassName="newBackdrop"
        show={toggleEdit}
        onHide={closeModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Edit current={currentProduct} Gener="categories" />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Categories;
