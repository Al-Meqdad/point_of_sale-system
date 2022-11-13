import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { StrictMode } from "react";
import Products from './Products/Products.jsx'
import Nav from "./Navbar/nav.jsx"
import Categories from "./categories/categories.jsx";
import { useState } from "react";
import Edit from "./Edit/Edit.jsx"
const Index = () => {
  const [defaultCategory, setCategory]= useState(["vegetables", "fruits","cans","cartons","chips"])
  const [defaultProducts, setProducts]= useState([])

  const handleChange= (category)=>{
    setCategory(category)
  }
  const handleProduct = (name,category,products,ind) =>{
      products[ind].name=name
      products[ind].category=category
      console.log(products)
      setProducts(products)
  }
  
  

  return (
    <StrictMode>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path="/" element={<><Categories handleChange={handleChange} /> <Products defaultCategory={defaultCategory} defaultProducts={defaultProducts}/></>} />
            <Route path="/Edit" element={<Edit handleProduct={handleProduct} />} />
          </Routes>
        </BrowserRouter>
    </StrictMode>
  );
};
render(<Index />, document.getElementById("root"));
