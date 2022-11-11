import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StrictMode } from "react";
import Products from './Products/Products.jsx'
import Nav from "./Navbar/nav.jsx"
import Categories from "./categories/categories.jsx";
import { useState } from "react";

const Index = () => {
  const [categories, setCategory]= useState(["vegetables", "fruits","cans","cartons","chips"])

  const handleChange= (category)=>{
    setCategory(category)

  }
  return (
    <StrictMode>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<><Categories handleChange={handleChange} /> <Products category={categories}/></>} />
          </Routes>
        </BrowserRouter>
    </StrictMode>
  );
};
render(<Index />, document.getElementById("root"));
