import "./Pstyling.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Product = ({ defaultCategory }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const [toggleModal, setModal] = useState(false);
  const [id, setId] = useState();

  function closeModal() {
    setModal(false);
  }

  useEffect(() => {
    async function requestPets() {
      const res = await fetch(`http://localhost:5050/products`);
      const json = await res.json();
      setProducts(json);
    }
    requestPets();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const del = (id) => {
    fetch("http://localhost:5050/products/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(setProducts(products.filter((oldid) => oldid.id !== id)));
  };

  const ed = (ind) => {
    navigate("/Edit", { state: [products, ind] });
  };

  const modalInfo = (caller, productId) => {
    if (caller === 1) {
      setModal(true);
      setId(productId);
    } else if (caller === 2) {
      closeModal();
      del(id);
    }
  };

  const add =() =>{
    navigate("/Add",{state: ["products"]})
  }

  return (
    <div>
      <h1>Featured Products</h1>
      <div className="item-container">

        {products
          .filter((p) => defaultCategory.includes(p.category))
          .map((product, index) => (
            <div className="card" key={product.name}>
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>{product.price}</p>
              <button> Add to cart</button>
              <button onClick={(event) => modalInfo(1, product.id)}>
                Delete
              </button>
              <button onClick={(event) => ed(index)}>Edit</button>
            </div>
          ))}
        <Modal
         show={toggleModal} onHide={closeModal}
        >
            <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
          
          </Modal.Header>

          <Modal.Body>Are you sure you want to delete this?</Modal.Body>
          <Modal.Footer>
          <Button onClick={event => modalInfo(2)}>Delete</Button>
          <Button onClick={closeModal}>close</Button>
          </Modal.Footer>
        </Modal>
        <button onClick={(event) => add()}>Add a Product</button>
      </div>
    </div>
  );
};

export default Product;
