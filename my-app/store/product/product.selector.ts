import { Dispatch } from "react";
import { AnyAction } from "redux";
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";
import { fetchProductFailed, fetchProductStart, fetchProductSuccess } from "./product.action";
import { ProductAction } from "./product.action";
import { CategoryMap, Product, ProductArray } from "./product.types";

const dispatchAsync = async (dispatch: Dispatch<AnyAction>) => {
    dispatch(fetchProductStart());
    try {
        const categoryMap = await getCategoriesAndDocuments() as CategoryMap;
        let arrayData:Array<ProductArray> = [];
        Object.entries(categoryMap).map((_) => {
            let arrayItems = _[1] as Array<ProductArray>;
            let titleCategory = _[0];
            arrayItems.map((__) => {
                arrayData.push({...__, category: titleCategory});
            });
        })
        dispatch(fetchProductSuccess({categoryMap, arrayData}));
    } catch (error) {
        dispatch(fetchProductFailed(error as Error));
    }
}

export const fetchProductAsyncReduxThunk = (dispatch: Dispatch<AnyAction>) => {
    return dispatchAsync(dispatch);
}

export const selectProductLoading = (state: any) => {
    return state.product.isLoading;
}

export const getCurrentProduct = (state : any) : Product => {
    return state.product.currentProduct
}
export const getCurrentProductArray = (state : any) : ProductArray[] => {
    return state.product.currentProductArray
}
  