import { MyButton } from "../button/button.component";
import "../product-card/product-card.styles.scss";
import { useContext } from "react";
import {CartContext} from '../../components/contexts/cart.context';
import ProductCardV2Detail from "./product-card-v2-detail.component";
import FadeIn from 'react-fade-in';

const ProductCardV2 = ({category, product}) => {
    return(
        <>
            <div className="category-name text-uppercase">
                <FadeIn>
                    <h1>{category}</h1>
                </FadeIn>
            </div>
            {
            product.map((item, index) => {
                return (
                    <FadeIn key={index}>
                        <ProductCardV2Detail item={item} />
                    </FadeIn>
                )
            })
            }

        </>
    );
}
export default ProductCardV2;