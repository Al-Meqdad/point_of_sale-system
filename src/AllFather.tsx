import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StrictMode, FunctionComponent, useState } from "react";
import Products from "./Products/Products";
import Categories from "./categories/categories";
import Cart from "./Cart/cart";
import "./Index.css";
import { ProductsApi } from "./ApiRespones";
import store from "./Store";
import { Provider, useSelector, useDispatch } from "react-redux";
import changeCartProducts from "./actionCreators/changeCartProducts";


interface RootState {
  cartContains: { [cart: string]: ProductsApi[] };
}

const AllFather: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState(1);
  const [cartKey, SetCartKey] = useState("cart1");
  const cartProducts = useSelector((state: RootState) => state.cartContains);
  const [updateCart, setUpdateCart] = useState(0);

  const onAdd = ({ product }: { product: ProductsApi }) => {

    const exist = cartProducts[cartKey].find((x) => x.id === product.id);
    const tempCart = cartProducts;
    if (exist) {
      tempCart[cartKey] = cartProducts[cartKey].map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      dispatch(changeCartProducts(tempCart));
      setUpdateCart(Math.random());
    } else {
      tempCart[cartKey] = [...cartProducts[cartKey], { ...product, qty: 1 }];
      dispatch(changeCartProducts(tempCart));
      setUpdateCart(Math.random());
    }
    
  };

  const onRemove = ({ product }: { product: ProductsApi }) => {
    const exist = cartProducts[cartKey].find((x) => x.id === product.id);

    const tempCart = cartProducts;

    if (exist) {
      if (exist.qty > 1) {
        tempCart[cartKey] = cartProducts[cartKey].map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        );

        dispatch(changeCartProducts(tempCart));
        setUpdateCart(Math.random());
      } else {
        tempCart[cartKey] = cartProducts[cartKey].map((x) =>
          x.id === product.id ? { ...exist, qty: 1 } : x
        );
        dispatch(changeCartProducts(tempCart));
        setUpdateCart(Math.random());
      }
    }
  };
  const onDelete = ({ product }: { product: ProductsApi }) => {
    const tempCart = cartProducts;
    tempCart[cartKey] = cartProducts[cartKey].filter(
      (x) => x.id !== product.id
    );
    dispatch(changeCartProducts(tempCart));
    setUpdateCart(Math.random());
  };

  function openTab(index: number, newKey: string) {
    SetCartKey(newKey);
    setCurrentTab(index);
  }

  return (
    <StrictMode>
      <Provider store={store}>
        <div className="component_holder">
          <div className="left_side">
            <Categories /> <Products onAdd={onAdd} />
          </div>
          <div className="right_side">

            <h1>Available Carts</h1>

            <div className="carts">
              
              <div className="tab">
                <button
                  className={currentTab === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => openTab(1, "cart1")}
                  id="defaultOpen"
                >
                  Cart 1
                </button>
                <button
                  className={currentTab === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => openTab(2, "cart2")}
                >
                  Cart 2
                </button>
                <button
                  className={currentTab === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => openTab(3, "cart3")}
                >
                  Cart 3
                </button>
              </div>

              <div
                id="Cart1"
                className={
                  currentTab === 1 ? "tabcontent  active-content" : "tabcontent"
                }
              >
                <Cart
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  cartProducts={cartProducts["cart1"]}
                  updateCart={updateCart}
                  Cartkey="cart1"
                />
              </div>

              <div
                id="Cart2"
                className={
                  currentTab === 2 ? "tabcontent  active-content" : "tabcontent"
                }
              >
                <Cart
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  cartProducts={cartProducts["cart2"]}
                  updateCart={updateCart}
                  Cartkey="cart2"
                />
              </div>

              <div
                id="Cart3"
                className={
                  currentTab === 3 ? "tabcontent  active-content" : "tabcontent"
                }
              >
                <Cart
                  onAdd={onAdd}
                  onRemove={onRemove}
                  onDelete={onDelete}
                  cartProducts={cartProducts["cart3"]}
                  updateCart={updateCart}
                  Cartkey="cart3"
                />
              </div>
            </div>
          </div>
        </div>
      </Provider>
    </StrictMode>
  );
};

export default AllFather;
