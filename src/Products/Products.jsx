import "./Pstyling.css";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Edit from "../Edit/Edit";
import Delete from "../Delete/Delete";
import Pagination from "../Pagination/Pagination";
import Add from "../Add/add"


const Product = ({ defaultCategory, onAdd }) => {
  const [products, setProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState();
  const [toggleDelete, setModal] = useState(false);
  const [toggleEdit, setEditModal] = useState(false);
  const [toggleAdd, settoggleAdd] = useState(false);
  const [query, setQuery] = useState("");
  const [id, setId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const curentDisplay = products
    .filter((p) => defaultCategory.includes(p.category))
    .filter((product) =>
      !query
        ? product
        : product.name.toLowerCase().includes(query.toLowerCase())
    )
    .slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    async function requestProducts() {
      const res = await fetch(`http://localhost:5050/products`);
      const json = await res.json();
      setProducts(json);
    }
    requestProducts();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const modalInfo = (productId) => {
    setModal(true);
    setId(productId);
  };

  const expandModal = (project) => {
    setCurrentProduct(project);
    setEditModal(true);
  };
  const closeModal = () => {
    setModal(false);
    setEditModal(false);
    settoggleAdd(false)
  };


  const filteredProducts = curentDisplay;

  return (
    <div className="products_component">
      <h1>Featured Products</h1>
      <div className="search_style">
        <div className="search_style_child">
          {" "}
          <label>Search Products</label>
          <input type="text" onChange={(e) => setQuery(e.target.value)}  className="ca_radius"/>
        </div>

        <button onClick={(event) => settoggleAdd(true)} className="ca_radius search_style_child">Add a Product</button>
      </div>
      <div className="product_container">
        {filteredProducts
          .filter((p) => defaultCategory.includes(p.category))
          .filter((product) =>
            !query
              ? product
              : product.name.toLowerCase().includes(query.toLowerCase())
          )
          .map((product) => (
            <div className="card" key={product.id}>
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.category}</p>
              <p>${product.price}</p>

              <button onClick={(event) => onAdd({ product: product })}>
                {" "}
                Add to cart
              </button>
              <button onClick={(event) => modalInfo(product.id)}>Delete</button>
              <button onClick={(event) => expandModal(product)}>
                Edit data
              </button>
            </div>
          ))}
      </div>
      <Pagination
        totalPosts={products}
        itemsPerPage={itemsPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        defaultCategory={defaultCategory}
        query={query}
      />
      <Modal show={toggleDelete} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete this?</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Delete Gener="products" id={id} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>close</Button>
        </Modal.Footer>
      </Modal>

      <Modal show={toggleAdd} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the product information here</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Add Gener="products" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>close</Button>
        </Modal.Footer>
      </Modal>

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
        <Modal.Footer>
          <Button onClick={closeModal}>close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Product;
