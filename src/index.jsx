import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from "react";
import Products from "./Products/Products.jsx";
import Nav from "./Navbar/nav.jsx";
import Categories from "./categories/categories.jsx";
import { useState } from "react";
import Edit from "./Edit/Edit.jsx";
import Cart from "./Cart/cart.jsx"
import Add from "./Add/add.jsx"

const Index = () => {
  const [defaultCategory, setCategory] = useState([
    "vegetables",
    "fruits",
    "cans",
    "cartons",
    "chips",
  ]);

  const handleChange = (category) => {
    setCategory(category);
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
                <div className='col-md'>
                <Categories handleChange={handleChange} />{" "}
                <Products defaultCategory={defaultCategory} />
                </div>
              <div className="col-md">
              <Cart />
              </div>
              </div>
            }
          />
          <Route path="/Edit" element={<Edit />} />
          <Route path="/Add" element={<Add />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};
render(<Index />, document.getElementById("root"));
