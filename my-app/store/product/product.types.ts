export enum PRODUCT_ACTION_TYPES {
    SET_CURRENT_PRODUCT = 'SET_CURRENT_PRODUCT',
    SET_CURRENT_PRODUCT_ARRAY = 'SET_CURRENT_PRODUCT_ARRAY',
    FETCH_PRODUCT_START = 'FETCH_PRODUCT_START',
    FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS',
    FETCH_PRODUCT_FAILED ='FETCH_PRODUCT_FAILED',
};

export type ProductState = {
    currentProduct: CategoryMap, 
    currentProductArray: ProductArray[],
    isLoading: boolean,
    error: Error | null,
  }

export type Payload = {
    categoryMap: CategoryMap,
    arrayData: ProductArray[],
  }

export type Product = {
    id: string,
    imageUrl: string,
    name: string,
    price: number,
}

export type ProductArray = {
    id: string,
    imageUrl: string,
    name: string,
    price: number,
    category: string,
}

export type CategoryMap = {
    title: string,
    items: Product[],
}