import { createContext, useState, useEffect, useReducer } from "react";

export const CartContext = createContext(
    {
        toggleShow: false,
        setToggleShow: () => {},

        productChosen : [],
        //setProductChosen : () => {},
        addItemToCart: () => {},
        DecreaseItemFromCart: () => {},
        setNewProductChosen: () => {},
        cartCount: 0,
        //setCartCount: () => {},
    }
)

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
  };
  
  const INITIAL_STATE = {
    toggleShow: false,
    productChosen: [],
    cartCount: 0,
  };

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                ...payload,
            }

        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

export const CartProvider = ({children}) => {
    const [{cartCount, productChosen, toggleShow}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const checkExistProduct = (_product) => {
        if (typeof productChosen != "undefined") {
            if (productChosen.filter(_ => _.id == _product.id).length > 0)
                return true;
            else
                return false;
        }
        else
            return false;
    }

    const setCartShowReducer = () => {
        const payload = {
            toggleShow: !toggleShow
        }

        dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN}, payload);
    }

    const updateCartReducer = (cartItems) => {
        const newCartCount = cartItems.length;

        const payload = {
            productChosen: cartItems,
            cartCount: newCartCount,
        }

        dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload});
    }

    const setItem = (_product) => {
        const setQuantity = (newProduct) => {
            return newProduct.map((item) => 
            item.id == _product.id 
                ? {...item, quantity: item.quantity + 1} //spread out all of properties except quantity is set new value
                : {...item}
            );
        }
        if (checkExistProduct(_product)) {
            var newProduct = productChosen;
            updateCartReducer(setQuantity(newProduct));
        } else {
            const newProduct = [...productChosen, _product];
            updateCartReducer(newProduct);
        }
    }

    const setDecreaseItem = (_product) => {
        const setQuantity = (newProduct) => {
            return newProduct.map((item) => 
            item.id == _product.id 
                ? {...item, quantity: _product.quantity} //spread out all of properties except quantity is set new value
                : {...item}
            );
        }

        if (checkExistProduct(_product)) {
            var newProduct = productChosen;
            updateCartReducer(setQuantity(newProduct));
        } else {
            const newProduct = [...productChosen, _product];
            updateCartReducer(newProduct);
        }
        //////
    }

    const _product = {
        id: 0,
        name: "",
        price: 0,
        imageUrl: "",
        quantity: 0,
    }

    const setNewProductChosen = (_product) => { //For remove item
        updateCartReducer(_product);
    }

    const addItemToCart = (product) => {
        _product.id = product.id;
        _product.name = product.name;
        _product.price = product.price;
        _product.imageUrl = product.imageUrl;
        _product.quantity = 1;
        setItem(_product);
    }

    const DecreaseItemFromCart = (product) => {
        _product.id = product.id;
        _product.name = product.name;
        _product.price = product.price;
        _product.imageUrl = product.imageUrl;
        _product.quantity = product.quantity;
        setDecreaseItem(_product);
    }

    const setToggleShow = () => {
        setCartShowReducer();
    }

    const value = {productChosen, addItemToCart, DecreaseItemFromCart, setNewProductChosen, toggleShow, setToggleShow, cartCount};

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}