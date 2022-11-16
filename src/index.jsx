import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import Products from "./Products/Products.jsx";
import Categories from "./categories/categories.jsx";
import { useState } from "react";
import Cart from "./Cart/cart.jsx";
import Add from "./Add/add.jsx";
import "./index.css";

const Index = () => {
  const [defaultCategory, setCategory] = useState([
    "vegetables",
    "fruits",
    "cans",
    "cartons",
    "chips",
  ]);

  const [currentTab, setCurrentTab] = useState(1);

  const [cartKey, SetCartKey] = useState("cart1");

  const [cartProducts, setCartProducts] = useState({
    cart1: [],
    cart2: [],
    cart3: [],
  });

  const handleChange = (category) => {
    setCategory(category);
  };

  const onAdd = ({ product }) => {
    const exist = cartProducts[cartKey].find((x) => x.id === product.id);
    const tempCart = JSON.parse(JSON.stringify(cartProducts));
    if (exist) {
      tempCart[cartKey] = cartProducts[cartKey].map((x) =>
        x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
      );
      setCartProducts(tempCart);
    } else {
      tempCart[cartKey] = [...cartProducts[cartKey], { ...product, qty: 1 }];
      setCartProducts(tempCart);
    }
  };

  const onRemove = (item) => {
    const exist = cartProducts[cartKey].find((x) => x.id === item.id);
    const tempCart = cartProducts.slice();
    if (exist.qty === 1) {
      tempCart[cartKey] = cartProducts[cartKey].filter((x) => x.id !== item.id);
      setCartProducts(tempCart);
    } else {
      tempCart[cartKey] = cartProducts[cartKey].map((x) =>
        x.id === item.id ? { ...exist, qty: exist.qty - 1 } : x
      );
      setCartProducts(tempCart);
    }
  };

  function openTab(index, newKey) {
    SetCartKey(newKey);
    setCurrentTab(index);
  }

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="component_holder">
                <div className="left_side">
                  <Categories handleChange={handleChange} />{" "}
                  <Products onAdd={onAdd} defaultCategory={defaultCategory} />
                </div>
                <div className="right_side">
                  <h1>Available Carts</h1>

                  <div>
                    <div className="tab">
                      <button
                        className={
                          currentTab === 1 ? "tabs active-tabs" : "tabs"
                        }
                        onClick={(event) => openTab(1, "cart1")}
                        id="defaultOpen"
                      >
                        Cart 1
                      </button>
                      <button
                        className={
                          currentTab === 2 ? "tabs active-tabs" : "tabs"
                        }
                        onClick={(event) => openTab(2, "cart2")}
                      >
                        Cart 2
                      </button>
                      <button
                        className={
                          currentTab === 3 ? "tabs active-tabs" : "tabs"
                        }
                        onClick={(event) => openTab(3, "cart3")}
                      >
                        Cart 3
                      </button>
                    </div>

                    <div
                      id="Cart1"
                      className={
                        currentTab === 1
                          ? "tabcontent  active-content"
                          : "tabcontent"
                      }
                    >
                      <Cart
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartProducts={cartProducts}
                        id={1}
                        Cartkey="cart1"
                      />
                    </div>

                    <div
                      id="Cart2"
                      className={
                        currentTab === 2
                          ? "tabcontent  active-content"
                          : "tabcontent"
                      }
                    >
                      <Cart
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartProducts={cartProducts}
                        id={2}
                        Cartkey="cart2"
                      />
                    </div>

                    <div
                      id="Cart3"
                      className={
                        currentTab === 3
                          ? "tabcontent  active-content"
                          : "tabcontent"
                      }
                    >
                      <Cart
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartProducts={cartProducts}
                        id={3}
                        Cartkey="cart3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/Add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

render(<Index />, document.getElementById("root"));
