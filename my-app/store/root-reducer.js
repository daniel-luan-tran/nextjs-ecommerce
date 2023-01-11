import { combineReducers } from "redux";
import { cartReducer } from "./cart/cart.reducer";
import { navigationReducer } from "./navigation/navigation.reducer";
import { productReducer } from "./product/product.reducer";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    user: userReducer, product: productReducer, navigation: navigationReducer, cart: cartReducer
})