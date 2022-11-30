import "./Pstyling.css";
import { useEffect, useState, FunctionComponent } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Edit from "../Edit/Edit";
import Delete from "../Delete/Delete";
import Pagination from "../Pagination/Pagination";
import Add from "../Add/add";
import { ProductsApi } from "../ApiRespones";
import { useSelector, useDispatch } from "react-redux";
import changeEdit from "../actionCreators/changeEdit";
import changeDelete from "../actionCreators/changeDelete";
import changeAdd from "../actionCreators/changeAdd";

interface RootState {
  edit: boolean;
  del: boolean;
  add: boolean;
  category: string[] | string;
}

interface PageProps {
  onAdd: ({ product }: { product: ProductsApi }) => void;
}

const Product: FunctionComponent<PageProps> = (props) => {
  const dispatch = useDispatch();
  const toggleEdit = useSelector((state: RootState) => state.edit);
  const toggleAdd = useSelector((state: RootState) => state.add);
  const toggleDelete = useSelector((state: RootState) => state.del);
  const defaultCategory = useSelector((state: RootState) => state.category);

  const [products, setProducts] = useState([] as ProductsApi[]);
  const [currentProduct, setCurrentProduct] = useState({} as ProductsApi);
  const [query, setQuery] = useState("");
  const [id, setId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const lastPageIndex: number = currentPage * itemsPerPage;
  const firstPageIndex: number = lastPageIndex - itemsPerPage;
  const curentDisplay: ProductsApi[] = products
    .filter((p) => defaultCategory.includes(p.category))
    .filter((product) =>
      !query
        ? product
        : product.name.toLowerCase().includes(query.toLowerCase())
    ).slice(firstPageIndex, lastPageIndex);

  useEffect(() => {
    async function requestProducts() {
      const res = await fetch(`http://localhost:5050/products`);
      const json = (await res.json()) as ProductsApi[];
      setProducts(json);
    }
    void requestProducts();
  }, []);

  const modalInfo = (productId: number) => {
    dispatch(changeDelete(true));
    setId(productId);
  };

  const expandModal = (project: ProductsApi) => {
    setCurrentProduct(project);
    dispatch(changeEdit(true));
  };
  const closeModal = () => {
    dispatch(changeDelete(false));
    dispatch(changeEdit(false));
    dispatch(changeAdd(false));
  };

  const filteredProducts = curentDisplay;

  return (
    <div className="products_component">
      <h1>Featured Products</h1>
      <div className="search_style">
        <div className="search_style_child">
          {" "}
          <label htmlFor="Serach">Search Products</label>
          <input
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            className="ca_radius"
          />
        </div>

        <button
          onClick={() => dispatch(changeAdd(true))}
          className="ca_radius search_style_child"
        >
          Add a Product
        </button>
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

              <button onClick={() => props.onAdd({ product })}>
                {" "}
                Add to cart
              </button>
              <button onClick={() => modalInfo(product.id)}>Delete</button>
              <button onClick={() => expandModal(product)}>Edit data</button>
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
