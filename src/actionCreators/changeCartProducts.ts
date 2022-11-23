import { ProductsApi } from "../ApiRespones";

export default function changeCaAdd(toggle:{[cart: string]: ProductsApi[]}){
    return {type:"CHANGE_CART",payload: toggle}

}