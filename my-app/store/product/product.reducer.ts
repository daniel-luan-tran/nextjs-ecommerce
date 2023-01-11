import { ProductAction } from "./product.action";
import { CategoryMap, Product, ProductArray, ProductState, PRODUCT_ACTION_TYPES } from "./product.types";

export const PRODUCT_INITIAL_STATE : ProductState = {
  currentProduct: {} as CategoryMap, 
  currentProductArray: [] as ProductArray[],
  isLoading: false,
  error: null,
};

export const productReducer = (state = PRODUCT_INITIAL_STATE, action = {} as ProductAction) => {
  // const { type, payload } = action;
  switch (action.type) {
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_START:
      return { ...state, isLoading: true };
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_SUCCESS:
      // const {categoryMap, arrayData} : Payload = payload;
      return { ...state, currentProduct: action.payload.categoryMap, currentProductArray: action.payload.arrayData, isLoading: false };
    case PRODUCT_ACTION_TYPES.FETCH_PRODUCT_FAILED:
      return { ...state, error: Error, isLoading: false };
    // case PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCT:
    //   return { ...state, currentProduct: payload };
    // case PRODUCT_ACTION_TYPES.SET_CURRENT_PRODUCT_ARRAY:
    //   return { ...state, currentProductArray: payload };
    default:
      return state;
  }
};