import CartProduct from "../cart-product/cart-product.component";
import "./cart-product-list.styles.scss"

const CartProductList = (props) => {
    const {productChosen} = props;
    return (
        <div className="cart-product-list">
            {
                (typeof productChosen != 'undefined' && productChosen.length > 0)
                ? 
                productChosen.map((item) => {
                    return(<CartProduct key={item.id} item={item} />);
                })
                : 
                <div style={{display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}}><span style={{fontWeight: "bold", textAlign: "center"}}>Nothing in cart</span></div>
            }
        </div>
    );
}

export default CartProductList;