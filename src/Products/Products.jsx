import "./Pstyling.css"
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"



const Product = ({defaultCategory,defaultProducts}) =>{
    const [products, setProducts] = useState(defaultProducts);
    const navigate = useNavigate();


    useEffect(() => {
        async function requestPets() {
          const res = await fetch(
              `http://localhost:5050/products`
          );
          const json = await res.json();
          setProducts(json);
          
  
        }
        requestPets()
      }, []); //eslint-disable-line react-hooks/exhaustive-deps
  
      
    const del = (newIndex) =>{

      setProducts(products.filter((_,index) => index !== newIndex))

    }
    const ed = (ind) =>{
      navigate('/Edit', {state:[products,ind]} );
    }
    
return(
    <div>
    <h1>Featured Products</h1>
    <div className='item-container'>
      {products.filter(p => defaultCategory.includes(p.category)).map((product,index) => (
        
        <div className='card'key={product.name}>
            <h3 >{product.name}</h3>
            <p >{product.category}</p>
            <button onClick={event=> del(index)}>Delete</button>
            <button onClick={event => ed(index)}>Edit</button>
        </div>
      ))}
      
    </div>

  </div>
)
}

export default Product;

