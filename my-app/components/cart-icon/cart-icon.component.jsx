import "../../components/cart-icon/cart-icon.styles.scss"
import { useState, useEffect } from "react";
import{ ReactComponent as ShoppingBag } from '../../assets/shopping-bag.svg'
import { useContext } from "react";
import { CartContext } from "../contexts/cart.context";
import { useSelector } from "react-redux";
import { getCurrentCartCount } from "../../store/cart/cart.selector";

const CartIcon = () => {
    const cartCount = useSelector(getCurrentCartCount);
    return (
        <div className="cart-icon-container" data-bs-toggle="collapse" data-bs-target="#cart-dropdown" aria-expanded="false" aria-controls="cart-dropdown" >
            <ShoppingBag className="shopping-icon" />
            <span className="item-count">{cartCount}</span>
        </div>
    );
}

export default CartIcon; 