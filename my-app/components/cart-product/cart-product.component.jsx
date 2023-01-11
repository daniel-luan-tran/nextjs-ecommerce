import { useState } from "react";
import "../../components/cart-product/cart-product.styles.scss"
import MyImage from "../lazy-load/lazy-load.component";

const CartProduct = ({item}) => {
    return (
        <ul className="cart-item" >
            <MyImage className="cart-item-img" imageUrl={item.imageUrl} />
            {/* <img className="cart-item-img" src={`${item.imageUrl}`} /> */}
            <li>{item.name}</li>
            <li>${item.price}</li>
            <li>{item.quantity}</li>
        </ul>
    
    );
}

export default CartProduct;