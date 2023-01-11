import { CartAction } from "./cart.action";
import { CartState, CART_ACTION_TYPES, Product } from "./cart.types";

const CART_INITIAL_STATE : CartState = {
    productChosen: [] as Product[],
    cartCount: 0 as number,
};

export const cartReducer = (state = CART_INITIAL_STATE, action = {} as CartAction) => {
    switch (action.type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...action.payload,
            };
        case CART_ACTION_TYPES.SET_CART_COUNT:
            return {
                ...state,
                cartCount: action.payload,
            };
        default:
            return state
            //throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};