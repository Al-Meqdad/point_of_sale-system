import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Add = () =>{
  const { state } = useLocation();

  const navigate = useNavigate();
  const [productName, setProductName] = useState([]);
  const [productCategory, setProductCategory] = useState([]);
  const [productPrice, setProductPrice] = useState([]);


    const postList = (array) => {
        fetch(`http://localhost:5050/${state[0]}/` , {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          
          body: JSON.stringify(array),
        });
      };

      if(state[0]==="products")
    return(
        <div>
           <form
        className="edit-form"
        onSubmit={(e) => {
          e.preventDefault();
          postList({name:productName,category:productCategory,price:productPrice})
          navigate("/");
        }}
      >
        <label htmlFor="name">
          <div>Product Name</div>

          <input
            id="name"
            placeholder="Product Name"
            onChange={(e) => setProductName(e.target.value)}
            
          />
        </label>

        <label htmlFor="category">
          <div>Product Category</div>

          <input
            id="category"
            placeholder="Product Category"
            onChange={(e) => setProductCategory(e.target.value)}


          />
        </label>

        <label htmlFor="price">
          <div>Product price</div>

          <input
            id="price"
            placeholder="Product Price"
            onChange={(e) => setProductPrice(e.target.value)}

          />
        </label>

        <button>Submit</button>
      </form>
        </div>
    )
}

export default Add