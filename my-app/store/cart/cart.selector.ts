import { setCurrentCartCount, setCurrentCartItems } from "./cart.action";
import {createSelector} from "reselect";
import { useSelector } from "react-redux";
import { CartState, Product } from "./cart.types";

export const selectCartItemsReducer = (state : any) => {
    return state.cart.productChosen;
};

export const getCurrentCartCount = (state : any) => {
    return state.cart.cartCount;
}

const updateCartReducer = (productChosen : Product[]): CartState => {
    const payload : CartState = {
        productChosen: productChosen,
        cartCount: productChosen.length
    }
    return payload;
}

export const updateCartCountReducer = createSelector([updateCartReducer], (payload) => {
    const count : number = payload.cartCount;
    return count;
});

const checkExistProduct = (_product: Product, productChosen: Product[]) => {
    if (typeof productChosen != "undefined") {
        if (productChosen.filter(_ => _.id == _product.id).length > 0)
            return true;
        else
            return false;
    }
    else
        return false;
}

const setItem = (_product: Product, productChosen: Product[]): CartState => {
    const setQuantity = (newProduct: Product[]):Product[] => {
        return newProduct.map((item) => 
        item.id == _product.id 
            ? {...item, quantity: item.quantity + 1} //spread out all of properties except quantity is set new value
            : {...item}
        );
    }
    if (checkExistProduct(_product, productChosen)) {
        var newProduct: Product[] = productChosen;
        return updateCartReducer(setQuantity(newProduct));
    } else {
        var newProduct: Product[] = [...productChosen, _product];
        return updateCartReducer(newProduct);
    }
}

const setDecreaseItem = (_product: Product, productChosen: Product[]):CartState => {
    const setQuantity = (newProduct : Product[]) => {
        return newProduct.map((item) => 
        item.id == _product.id 
            ? {...item, quantity: _product.quantity} //spread out all of properties except quantity is set new value
            : {...item}
        );
    }

    if (checkExistProduct(_product, productChosen)) {
        var newProduct = productChosen;
        return updateCartReducer(setQuantity(newProduct));
    } else {
        const newProduct = [...productChosen, _product];
        return updateCartReducer(newProduct);
    }
    //////
}

export const setNewProductChosen = (_product : Product[]) => { //For remove item
    return updateCartReducer(_product);
}

export const addItemToCart = (product: Product, productChosen: Product[]):CartState => {
    const _product : Product = {
        id: 0,
        name: "",
        price: 0,
        imageUrl: "",
        quantity: 0,
    }
    _product.id = product.id;
    _product.name = product.name;
    _product.price = product.price;
    _product.imageUrl = product.imageUrl;
    _product.quantity = 1;
    return setItem(_product, productChosen);
}

export const DecreaseItemFromCart = (product: Product, productChosen: Product[]) : CartState => {
    const _product = {
        id: 0,
        name: "",
        price: 0,
        imageUrl: "",
        quantity: 0,
    }
    _product.id = product.id;
    _product.name = product.name;
    _product.price = product.price;
    _product.imageUrl = product.imageUrl;
    _product.quantity = product.quantity;
    return setDecreaseItem(_product, productChosen);
}