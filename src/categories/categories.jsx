import { useEffect, useState } from "react";
import "./c.css"

const Categories = ({handleChange}) =>{
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

      const array=[]
      for (let values of Object.values(categories)){
        array.push(values.category)
      }
     


    
return(
    <div>
    <h1>Featured Categories</h1>
    <div className='item-container'>
      <div className='card'>
    <input type="radio" id="category1"  name="category" onChange={event => handleChange(array)} />
    <label htmlFor="category1">All</label>
  
      {categories.map((c) => (
        <>
            <input type="radio"  id={c.category} name="category" onChange={event => handleChange(c.category)} />
            <label htmlFor={c.category}>{c.category}</label>

        </>
      ))}
  </div>
    </div>
  </div>
)
}

export default Categories;

