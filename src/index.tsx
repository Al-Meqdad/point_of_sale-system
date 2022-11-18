import { render } from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import Products from "./Products/Products";
import Categories from "./categories/categories";
import Cart from "./Cart/cart"
import { useState } from "react";
/*import Cart from "./Cart/cart.jsx";*/
import "./index.css";
import{ProductsApi} from "./ApiRespones"



const Index = () => {
  const [defaultCategory, setCategory] = useState([
    "vegetables",
    "fruits",
    "cans",
    "cartons",
    "chips",
  ] as string[] | string);

  const [currentTab, setCurrentTab] = useState(1);

  const [cartKey, SetCartKey] = useState("cart1");

  const [cartProducts, setCartProducts] = useState<{[cart: string]: ProductsApi[]}>({
    cart1: [] ,
    cart2: [],
    cart3:[]
  }) 

  const[updateCart,setUpdateCart] =useState(0)

  const handleChange = (category: string[] | string ) => {
    setCategory(category );
  };

  const onAdd= ( {product}:{
    product:ProductsApi
  }) => {
    
    const exist= (cartProducts[cartKey].find((x) => x.id === product.id)) as unknown as (ProductsApi | undefined);
    const tempCart = cartProducts;   

    if (exist) {
      tempCart[cartKey] = cartProducts[cartKey].map((x) =>
      x.id === product.id ? { ...exist, qty: exist.qty+1 } : x
    );
      
      setCartProducts(tempCart);
      setUpdateCart(Math.random())
    } else  {
      tempCart[cartKey] = [...cartProducts[cartKey], { ...product, qty: 1 }]; 
      setCartProducts(tempCart);
      setUpdateCart(Math.random())

    }
  };

  const onRemove = ({product}:{
    product:ProductsApi
  }) => {
    const exist = cartProducts[cartKey].find((x) => x.id === product.id);
    
    const tempCart = cartProducts
 
    if (exist) {
      if(exist.qty){ 
            tempCart[cartKey] = cartProducts[cartKey].filter((x) => x.id !== product.id);
        setCartProducts(tempCart);
      }else {
        tempCart[cartKey] = cartProducts[cartKey].map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty-= 1 } : x
        );
        setCartProducts(tempCart);
      }
 
    } 
  };

  function openTab(index:number, newKey:string) {
    SetCartKey(newKey);
    setCurrentTab(index);
  }

  return (
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <div className="component_holder">
                <div className="left_side">
                  <Categories handleChange={handleChange} />{" "}
                  <Products onAdd={onAdd} defaultCategory={defaultCategory} />
                </div>
                <div className="right_side">
                  <h1>Available Carts</h1>

                  <div className="carts">
                    <div className="tab">
                      <button
                        className={
                          currentTab === 1 ? "tabs active-tabs" : "tabs"
                        }
                        onClick={() => openTab(1, "cart1")}
                        id="defaultOpen"
                      >
                        Cart 1
                      </button>
                      <button
                        className={
                          currentTab === 2 ? "tabs active-tabs" : "tabs"
                        }
                        onClick={() => openTab(2, "cart2")}
                      >
                        Cart 2
                      </button>
                      <button
                        className={
                          currentTab === 3 ? "tabs active-tabs" : "tabs"
                        }
                        onClick={() => openTab(3, "cart3")}
                      >
                        Cart 3
                      </button>
                    </div>

                    <div
                      id="Cart1"
                      className={
                        currentTab === 1
                          ? "tabcontent  active-content"
                          : "tabcontent"
                      }
                    >
                      <Cart
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartProducts={cartProducts["cart1"]}
                        updateCart={updateCart}
                        Cartkey="cart1"
                      />
                    </div>

                    <div
                      id="Cart2"
                      className={
                        currentTab === 2
                          ? "tabcontent  active-content"
                          : "tabcontent"
                      }
                    >
                      <Cart
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartProducts={cartProducts["cart2"]}
                        updateCart={updateCart}
                        Cartkey="cart2"
                      />
                    </div>

                    <div
                      id="Cart3"
                      className={
                        currentTab === 3
                          ? "tabcontent  active-content"
                          : "tabcontent"
                      }
                    >
                      <Cart
                        onAdd={onAdd}
                        onRemove={onRemove}
                        cartProducts={cartProducts["cart3"]}
                        updateCart={updateCart}
                        Cartkey="cart3"
                      />
                    </div>
                  </div>
                </div>

              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  );
};

render(<Index />, document.getElementById("root"));
