import { combineReducers } from "redux";
import { testReducer } from "./test/test.reducer";
// import { cartReducer } from "./cart/cart.reducer";
// import { navigationReducer } from "./navigation/navigation.reducer";
// import { productReducer } from "./product/product.reducer";
// import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
    test: testReducer
    // user: userReducer, product: productReducer, navigation: navigationReducer, cart: cartReducer
})