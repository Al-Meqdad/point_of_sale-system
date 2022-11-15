import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import Products from "./Products/Products.jsx";
import Nav from "./Navbar/nav.jsx";
import Categories from "./categories/categories.jsx";
import { useState } from "react";
import Cart from "./Cart/cart.jsx";
import Add from "./Add/add.jsx";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

const Index = () => {
  const [defaultCategory, setCategory] = useState([
    "vegetables",
    "fruits",
    "cans",
    "cartons",
    "chips",
  ]);

  const [cartProducts, setCartProducts] = useState([]);

  const handleChange = (category) => {
    setCategory(category);
  };

  const onAdd = (product) => {
    const exist = cartProducts.find((x) => x.id === product.id);

    if (exist) {
      setCartProducts(
        cartProducts.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartProducts([...cartProducts, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (item) => {
    const exist = cartProducts.find((x) => x.id === item.id);
    if (exist.qty === 1) {
      setCartProducts(cartProducts.filter((x) => x.id !== item.id));
    } else {
      setCartProducts(
        cartProducts.map((x) =>
          x.id === item.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <StrictMode>
      <BrowserRouter>
        <Nav></Nav>
        <Routes>
          <Route
            path="/"
            element={
              <div className="row">
                <div className="col-md">
                  <Categories handleChange={handleChange} />{" "}
                  <Products onAdd={onAdd} defaultCategory={defaultCategory} />
                </div>
                <div className="col-md">
                  <Tabs
                    defaultActiveKey="Cart1"
                    id="justify-tab-example"
                    className="mb-3"
                    justify
                  >
                    <Tab eventKey="Cart1" title="Cart 1">
                      <Cart
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartProducts={cartProducts}
                        id={1}
                        key="cart1"
                      />
                    </Tab>
                    <Tab eventKey="Cart2" title="Cart 2">
                      <Cart
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartProducts={cartProducts}
                        id={2}
                        key="cart2"
                      />
                    </Tab>
                    <Tab eventKey="Cart3" title="Cart 3">
                      <Cart
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartProducts={cartProducts}
                        id={3}
                        key="cart3"
                      />
                    </Tab>
                  </Tabs>
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
