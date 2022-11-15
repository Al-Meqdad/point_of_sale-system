import "./Pstyling.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Edit from "../Edit/Edit";

const Product = ({ defaultCategory, onAdd }) => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState();
  const [toggleModal, setModal] = useState(false);
  const [toggleEdit, setEditModal] = useState(false);
  const [query, setQuery] = useState("");
  const [id, setId] = useState();
  const navigate = useNavigate();

  const getFilteredProducts = (query, products) => {
    if (!query) {
      return products;
    } else {
      return products.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  };

  const closeModal = () => {
    setModal(false);
    setEditModal(false);
  };

  useEffect(() => {
    async function requestPets() {
      const res = await fetch(`http://localhost:5050/products`);
      const json = await res.json();
      setProducts(json);
    }
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const modalInfo = (caller, productId) => {
    if (caller === 1) {
      setModal(true);
      setId(productId);
    } else if (caller === 2) {
      closeModal();
      del(id);
    }
  };

  const expandModal = (project) => {
    setCurrentProduct(project);
    setEditModal(true);
  };

  const add = () => {
    navigate("/Add", { state: ["products"] });
  };

  const del = (id) => {
    fetch("http://localhost:5050/products/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(setProducts(products.filter((oldid) => oldid.id !== id)));
  };

  const filteredProducts = getFilteredProducts(query, products);

  return (
    <div>
      <h1>Featured Products</h1>
      <label>Search Products</label>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <div className="item-container">
        {filteredProducts
          .filter((p) => defaultCategory.includes(p.category))
          .map((product, index) => (
            <div className="card" key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>${product.price}</p>
              <button onClick={(event) => onAdd(product)}> Add to cart</button>
              <button onClick={(event) => modalInfo(1, product.id)}>
                Delete
              </button>
              <button onClick={(event) => expandModal(product)}>
                Edit data
              </button>
            </div>
          ))}
        <Modal show={toggleModal} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>

          <Modal.Body>Are you sure you want to delete this?</Modal.Body>
          <Modal.Footer>
            <Button onClick={(event) => modalInfo(2)}>Delete</Button>
            <Button onClick={closeModal}>close</Button>
          </Modal.Footer>
        </Modal>
        <button onClick={(event) => add()}>Add a Product</button>

        <Modal
          backdropClassName="newBackdrop"
          show={toggleEdit}
          onHide={closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Edit current={currentProduct} Gener="products" />
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default Product;
