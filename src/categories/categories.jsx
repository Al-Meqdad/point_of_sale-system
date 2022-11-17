import { useEffect, useState } from "react";
import "./c.css";
import Modal from "react-bootstrap/Modal";
import Edit from "../Edit/Edit";
import { BsFillTrashFill, BsFillGearFill } from "react-icons/bs";
import Button from "react-bootstrap/Button";
import Delete from "../Delete/Delete";
import Pagination from "../Pagination/Category_Pagination";
import Add from "../Add/add"


const Categories = ({ handleChange }) => {
  const [categories, setCategories] = useState([]);
  const [currentProduct, setCurrentProduct] = useState();
  const [toggleEdit, setEditModal] = useState(false);
  const [toggleDelete, setModal] = useState(false);
  const [toggleAdd, settoggleAdd] = useState(false);

  const [query, setQuery] = useState("");
  const [id, setId] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const lastPageIndex = currentPage * itemsPerPage;
  const firstPageIndex = lastPageIndex - itemsPerPage;
  const curentDisplay = categories
    .filter((c) =>
      !query ? c : c.category.toLowerCase().includes(query.toLowerCase())
    )
    .slice(firstPageIndex, lastPageIndex);

  const filteredCategories = curentDisplay;

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



  const expandModal = (project) => {
    setCurrentProduct(project);
    setEditModal(true);
  };

  const closeModal = () => {
    setEditModal(false);
    setModal(false);
    settoggleAdd(false)
  };

  const modalInfo = (productId) => {
    setModal(true);
    setId(productId);
  };

  return (
    <div>
      <h1>Featured Categories</h1>
      <div className="category_component">
        <div className="search_style">
          <div>
            <label>Search Categories</label>
            <input
              className="ca_radius"
              type="text"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button onClick={(event) => settoggleAdd(true)} className="ca_radius">
            Add a Category
          </button>
        </div>
        <div className="item_container">
          <div className="category_container">
            <div className="label_holder">
              <input
                type="radio"
                id="category1"
                name="category"
                defaultChecked
                onChange={(event) => handleChange(array)}
              />
              <label htmlFor="category1">All</label>
            </div>

            {filteredCategories.map((c) => (
              <div className="label_holder" key={c.category}>
                <input
                  type="radio"
                  id={c.category}
                  name="category"
                  onChange={(event) => handleChange(c.category)}
                />

                <label htmlFor={c.category}>{c.category}</label>
                <div className="inside_buttons">
                  <button
                    onClick={(event) => expandModal(c)}
                    className="edit_btn"
                  >
                    <BsFillGearFill />{" "}
                  </button>
                  <button
                    onClick={(event) => modalInfo(c.id)}
                    className="delete_btn"
                  >
                    <BsFillTrashFill />{" "}
                  </button>
                </div>
              </div>
            ))}
            <Pagination
              totalPosts={categories}
              itemsPerPage={itemsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              query={query}
            />
          </div>
        </div>

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
          <Modal.Footer>
            <Button onClick={closeModal}>close</Button>
          </Modal.Footer>
        </Modal>

    <Modal show={toggleAdd} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Enter the product information here</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Add Gener="categories" />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={closeModal}>close</Button>
        </Modal.Footer>
      </Modal>

        <Modal show={toggleDelete} onHide={closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Delete Gener="categories" id={id} />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={closeModal}>close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default Categories;
