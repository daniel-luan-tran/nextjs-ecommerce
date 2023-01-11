import { useDispatch } from 'react-redux';
import { Action, ActionWithPayload, createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES, Product } from './cart.types';
import { addItemToCart, DecreaseItemFromCart, setNewProductChosen, updateCartCountReducer } from './cart.selector';

export type AddItemToCartAction = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, Product[]>;

export type SetNewProductChosenAction = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, Product[]>;

export type _DecreaseItemFromCartAcion = ActionWithPayload<CART_ACTION_TYPES.SET_CART_ITEMS, Product[]>;

export type SetCurrentCartItems = ActionWithPayload<CART_ACTION_TYPES.SET_CART_COUNT, number>;

export type CartAction = AddItemToCartAction | SetNewProductChosenAction | _DecreaseItemFromCartAcion | SetCurrentCartItems;

//Các component sẽ gọi vào các action này, các action này sẽ callback các selector
export const addItemToCartAction = (product: Product, productChosen: Product[]) => {
    const payload = addItemToCart(product, productChosen);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, payload);
}
export const setNewProductChosenAction = (_productArray : Product[]) => { //for remove item
    const _cartItems = setNewProductChosen(_productArray);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, _cartItems);
}
export const DecreaseItemFromCartAcion = (product: Product, productChosen: Product[]) => {
    const _cartItems = DecreaseItemFromCart(product, productChosen);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, _cartItems);
}
export const setCurrentCartItems = (cartItems: Product[]) => {
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
}
export const setCurrentCartCount = (productChosen: Product[]) => {
    const newCartCount : number = updateCartCountReducer(productChosen);
    return createAction(CART_ACTION_TYPES.SET_CART_COUNT, newCartCount);
}