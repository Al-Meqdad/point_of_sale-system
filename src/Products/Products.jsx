import "./Pstyling.css"
import { useEffect, useState } from "react";

const Product = ({category=["vegetables", "fruits","cans","cartons","chips"]}) =>{
    const [products, setProducts] = useState([]);
    console.log(category)
    
    useEffect(() => {
        requestPets();
      }, []); //eslint-disable-line react-hooks/exhaustive-deps
    
      async function requestPets() {
        const res = await fetch(
            `http://localhost:5050/products`
        );
        const json = await res.json();
        setProducts(json);

      }
    
return(
    <div>
    <h1>Featured Products</h1>
    <div className='item-container'>
      {products.filter(products => category.includes(products.category)).map((product) => (
        
        <div className='card'key={product.name}>
            <h3 >{product.name}</h3>
            <p >{product.category}</p>
        </div>
      ))}
    </div>
  </div>
)
}

export default Product;

