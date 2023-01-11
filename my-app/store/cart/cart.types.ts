export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = 'SET_CART_ITEMS',
    SET_CART_COUNT = 'SET_CART_COUNT',
};

export type Product = {
    id: number,
    imageUrl: string,
    name: string,
    price: number,
    quantity: number
}

export type CartState = {
    productChosen: Product[],
    cartCount: number
}

