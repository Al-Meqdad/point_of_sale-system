import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StrictMode } from "react";
import Products from './Products/Products.jsx'
import Nav from "./Navbar/nav.jsx"
import Categories from "./categories/categories.jsx";

const Index = () => {
  return (
    <StrictMode>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<><Categories /> <Products /></>} />
          </Routes>
        </BrowserRouter>
    </StrictMode>
  );
};
console.log("hello");
render(<Index />, document.getElementById("root"));
