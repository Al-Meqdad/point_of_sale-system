import { ProductsApi } from "../ApiRespones";

export default function edit(
  state = {
    cart1: [],
    cart2: [],
    cart3: [],
  },
  action: { type: "CHANGE_CART"; payload: { [cart: string]: ProductsApi[] } }
) {
  switch (action.type) {
    case "CHANGE_CART":
      return action.payload;
    default:
      return state;
  }
}
