import { useLocation } from 'react-router-dom';
import { useState } from "react";
 import "./Edit.css"
 import {useNavigate} from "react-router-dom"


 const Edit = ({handleProduct}) => {
    const { state } = useLocation();

    const [product, setProduct] = useState(state[0][state[1]])
    const [productName, setProductName] = useState([]);
    const [productCategory, setProductCategory] = useState([]);
    const navigate = useNavigate();

    return(
   <div className='edit-container'>
    <form className='edit-form'
        onSubmit={(e) => {
          e.preventDefault();
          
          handleProduct(productName,productCategory,state[0], state[1]);
          navigate('/')
        }}
      >

        <label htmlFor="name">
            <div>Product Name</div>
          
          <input
            id="name"
            placeholder={product.name}
            onChange={(e) => setProductName(e.target.value)}
          />
        </label>

        <label htmlFor="category">
            <div>Product Category</div>
          
          <input
            id="category"
            placeholder={product.category}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </label>

        <button >Submit</button>
      </form>
   
   </div>
    )
}
 
 export default Edit