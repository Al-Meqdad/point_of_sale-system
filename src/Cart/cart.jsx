import { useState } from "react"


const Cart = ({product})=>{
    const [items,setItems] =useState(product)

    if(items){
        return(
            <div>
                
                {items.map((i) =>{
    
                        <div>
                        <h3>{product.name}</h3>
                       <p>{product.category}</p>
                       <button> Add to cart</button>
                       <button >
                         Delete
                       </button>
                       <button >Edit</button>
                         </div>
             
    
                  })}
    
            </div>
        )
    }
    else{
        return(
            <div>Items</div>
        )
        }
   
}

export default Cart