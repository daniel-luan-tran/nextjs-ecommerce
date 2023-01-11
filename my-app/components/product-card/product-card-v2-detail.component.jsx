import { MyButton } from "../button/button.component";
import "../product-card/product-card.styles.scss";
import { useContext, useState } from "react";
import {CartContext} from '../../components/contexts/cart.context';
import { useDispatch, useSelector } from "react-redux";
import { selectCartItemsReducer } from "../../store/cart/cart.selector";
import { addItemToCartAction, setCurrentCartCount } from "../../store/cart/cart.action";
import { Alert, Snackbar, Stack } from "@mui/material";
import MyImage from "../lazy-load/lazy-load.component";

const ProductCardV2Detail = ({item}) => {
    /* Notification */
    const [typeNotify, setTyeNotify] = useState("success");
    const [openNotify, setOpenNotify] = useState(false);
    const mess = typeNotify == "success" ? "Added!" 
    : typeNotify == "error" ? "Error!" 
    : typeNotify == "warning" ? "Removed!" 
    : typeNotify == "info" ? "Information!" 
    : "Success!";
    const triggerNotify = (isOpen, type) => {
        setTyeNotify(type);
        setOpenNotify(isOpen);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenNotify(false);
    };
    /* Notification */

    const {id, name, imageUrl, price} = item;

    const productChosen = useSelector(selectCartItemsReducer);
    const dispatch = useDispatch();
    const onClickHandler = () => {
        dispatch(addItemToCartAction(item, productChosen));
        triggerNotify(true, "success");
    }
    return(
        <>
        <Snackbar open={openNotify} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
            <Alert onClose={handleClose} severity={typeNotify} sx={{ width: '100%' }}>
                {mess}
            </Alert>
        </Snackbar>
        <div className='product-card-container'>
            {/* <MyImage className="" imageUrl={imageUrl} /> */}
            <img src={`${imageUrl}`} />
            <div className="footer">
                <span className="name">{name}</span>
                <span className="price">${price}</span>
            </div>
            <MyButton buttonName='Add cart' typeName='button' buttonType='inverted' onClickHandler={onClickHandler} />
        </div>
        </>
    );
}
export default ProductCardV2Detail;