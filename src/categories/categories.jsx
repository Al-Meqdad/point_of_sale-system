
import { useEffect, useState } from "react";
import Product from "../Products/Products.jsx";
const Categories = () =>{
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        requestCategories();
      }, []); //eslint-disable-line react-hooks/exhaustive-deps
    
      async function requestCategories() {
        const res = await fetch(
            "http://localhost:5050/categories"
        );
        const json = await res.json();
        setCategories(json);
      }

      const send = (category) => {
        <Product category={category} />
        console.log(category)
      }

    
return(
    <div>
    <h1>Featured Categories</h1>
    <div className='item-container'>
      {categories.map((category) => (
        <div className='card'key={category.category}>
            <button onClick={() => send(category.category)}>{category.category} </button>
        </div>
      ))}
    </div>
  </div>
)
}

export default Categories;

