import { createContext, useState } from "react";

export const ProductChosenContext = createContext(
    {
        productChosen : [],
        setProductChosen : () => null,
        addItemToCart: () => {}
    }
);

export const ProductChosenProvider = ({children}) => {
    const [productChosen, setProductChosen] = useState([]);
    
    const _product = {
        id: 0,
        name: "",
        price: 0,
        imageUrl: "",
        quantity: 0,
    }

    const addItemToCart = (product) => {
        const {id, name, price, imageUrl, quantity} = _product;
        
        productChosen.push(product);
        setProductChosen(productChosen);
        
    }

    const value = {productChosen, setProductChosen, addItemToCart};

    return (
        <ProductChosenContext.Provider value={value}>{children}</ProductChosenContext.Provider>
    );
}