import { Action, ActionWithPayload, createAction } from '../../utils/reducer/reducer.utils';
import { Payload, ProductArray, PRODUCT_ACTION_TYPES } from './product.types';


export type FetchProductStart = Action<PRODUCT_ACTION_TYPES.FETCH_PRODUCT_START>;

export type FetchProductSuccess = ActionWithPayload<PRODUCT_ACTION_TYPES.FETCH_PRODUCT_SUCCESS, Payload>;

export type FetchProductFailed = ActionWithPayload<PRODUCT_ACTION_TYPES.FETCH_PRODUCT_FAILED, Error>

export type ProductAction = FetchProductStart | FetchProductSuccess | FetchProductFailed;


export const fetchProductStart = () : FetchProductStart => {
    return createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCT_START);
}

export const fetchProductSuccess = ({categoryMap, arrayData} : Payload ) : FetchProductSuccess => {
    return createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCT_SUCCESS, {categoryMap, arrayData});
}

export const fetchProductFailed = (error : Error) : FetchProductFailed => {
    return createAction(PRODUCT_ACTION_TYPES.FETCH_PRODUCT_FAILED, error)
}

// export const setCurrentProduct = (product: Product) => {
//     return createAction(PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCT, product);
// }

// export const setCurrentProductArray = (productArray: productArray) => {
//     return createAction(PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCT_ARRAY, productArray);
// }