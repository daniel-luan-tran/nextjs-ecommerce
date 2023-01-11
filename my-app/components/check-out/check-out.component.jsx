import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../contexts/cart.context";
import { MyButton } from "../button/button.component";
import "./check-out.styles.scss";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, DecreaseItemFromCart, selectCartItemsReducer, setNewProductChosen } from "../../store/cart/cart.selector";
import { addItemToCartAction, DecreaseItemFromCartAcion, setNewProductChosenAction } from "../../store/cart/cart.action";
import CustomizedSnackbars, { Notification } from "../notification/notification.component";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import Alert from "@mui/material/Alert";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import "../product-card/product-card.styles.scss";
import FadeIn from "react-fade-in/lib/FadeIn";
import MyImage from "../lazy-load/lazy-load.component";

const theme = createTheme({
//   status: {
//     danger: '#e53e3e',
//   },
  palette: {
    primary: {
      main: '#0971f1',
      darker: '#053e85',
    },
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    danger: {
        main: '#b71c1c',
        // darker: '#ef5350',
        contrastText: '#fff',
    }
  },
});

const Checkout = () => {
    const [openNotify, setOpenNotify] = useState(false);
    const [typeNotify, setTyeNotify] = useState("success");
    const [openConfirm, setOpenConfirm] = useState(false);
    const [product, setProduct] = useState(null);

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

    const triggerConfirm = (product) => {
        setProduct(product)
        setOpenConfirm(true);
    };
    
    const handleCloseConfirm = (type) => {
        if(type == "disagree")
            setOpenConfirm(false);
        else {
            RemoveItem(product)
            setOpenConfirm(false);
        }
    };    

    const productChosen = useSelector(selectCartItemsReducer);
    const dispatch = useDispatch();
    const totalPrice = (productChosen) => {
        return productChosen.reduce((acc, product) => {
            let rs = acc + (product.quantity * product.price)
            return rs
        }, 0);
    }

    const _setItemsRemoved = (product) => {
        let tempArray = [];
        productChosen.map((item) => {
            if(item.id != product.id) {
                tempArray.push(item);
            }
        });
        return tempArray;
    }

    const _setItems = (product, type) => {
        return productChosen.map((item) => {
            if (type == -1){
                const _product = item.id == product.id ? (item.quantity > 1 ? {...item, quantity: item.quantity+type} : {...item}) : {...item}
                return _product;
            } else{
                const _product = item.id == product.id ? {...item, quantity: item.quantity+type} : {...item};
                return _product;
            }
        });
    }

    const DecreaseQuantity = (product, type = -1) => {
        if(product.quantity > 1) {
            const productToDecreased = _setItems(product, type).filter(_ => _.id == product.id)[0];
            dispatch(DecreaseItemFromCartAcion(productToDecreased, productChosen));
            triggerNotify(true, "warning");
        } else {
            // if(window.confirm("Only 1 this item left in your cart. Do you want to remove it?")) {
                //RemoveItem(product, true);
                // triggerNotify(true, "warning");
            // } else {}
            triggerConfirm(product)
        }
    }// Nếu quantity giảm xuống 0 thì gọi hàm RemoveItem()

    const IncreaseQuantity = (product, type = +1) => {
        const productToIncreased = _setItems(product, type).filter(_ => _.id == product.id)[0];
        dispatch(addItemToCartAction(productToIncreased, productChosen));
        triggerNotify(true, "success");
    }

    const RemoveItem = (product, hasConfirmed = false) => {
        if (hasConfirmed) {
            const productDeleted = _setItemsRemoved(product);
            dispatch(setNewProductChosenAction(productDeleted));
            triggerNotify(true, "warning");
        } else {
            // if(window.confirm("Do you want to remove it?")) {
                const productDeleted = _setItemsRemoved(product);
                dispatch(setNewProductChosenAction(productDeleted));
                triggerNotify(true, "warning");
            // }
        }
    }

    return(
        <>
        <Snackbar open={openNotify} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
            <Alert onClose={handleClose} severity={typeNotify} sx={{ width: '100%' }}>
                {mess}
            </Alert>
        </Snackbar>
        <Dialog
            open={openConfirm}
            keepMounted
            onClose={() => {handleCloseConfirm("disagree")}}
            aria-describedby="alert-dialog-slide-description"
            >
            {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    Do you want to remove it?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color="error" variant="outlined" onClick={() => {handleCloseConfirm("disagree")}}>Disagree</Button>
                <Button variant="outlined" onClick={() => {handleCloseConfirm("agree")}}>Agree</Button>
            </DialogActions>
        </Dialog>
        <FadeIn>
            <div id="checkout-component" style={{paddingTop: "85px", maxWidth: "50%", margin: "auto"}}>
                {/* <Notification isOpen={openNotify} type={typeNotify} /> */}
                <div className="row justify-content-center py-3 border-bottom fw-bold mb-d-none checkout-head-bg">
                    <div className="col-lg-2 d-flex justify-content-center align-items-center">Image</div>
                    <div className="col-lg-3 d-flex justify-content-center align-items-center">Description</div>
                    <div className="col-lg-2 d-flex justify-content-center align-items-center">Quantity</div>
                    <div className="col-lg-2 d-flex justify-content-center align-items-center">Price/Item</div>
                    <div className="col-lg-2 d-flex justify-content-center align-items-center">Price</div>
                    <div className="col-lg-1 d-flex justify-content-center align-items-center">Remove</div>
                </div>
                {
                    typeof productChosen != "undefined" && productChosen.length > 0
                    ?
                    (
                        productChosen.map((product) => {
                            return (
                            <div key={product.id} className="row justify-content-center py-3 border-bottom checkout-data-bg">
                                <div className="col-lg-2 d-flex justify-content-center align-items-center">
                                    <MyImage className="check-out-img" imageUrl={product.imageUrl} />
                                    {/* <img className="check-out-img" src={`${product.imageUrl}`} /> */}
                                </div>
                                <div className="col-lg-3 d-flex align-items-center justify-content-center mb-prod-name prod-name">{product.name}</div>
                                <div className="col-lg-2 d-flex justify-content-between align-items-center">
                                    <ThemeProvider theme={theme}>
                                        <Button styles={{borderRadius: "inherit"}} size="small" onClick={() => {DecreaseQuantity(product)}} variant="contained" color="neutral">
                                            {/* <span>{"<"}</span> */}
                                            <KeyboardDoubleArrowLeftIcon />
                                        </Button>
                                    </ThemeProvider>

                                    {/* <MyButton buttonName="<" buttonType="default" typeName="button" styles={{maxWidth: "10px", minWidth: "10px", paddingLeft: "12px", paddingRight: "12px", height: "28px", alignItems: "center"}} onClickHandler={() => {DecreaseQuantity(product)}} /> */}
                                    <MyButton buttonName={product.quantity} buttonType="default" typeName="button" styles={{maxWidth: "10px", minWidth: "10px", paddingLeft: "12px", paddingRight: "12px", maxHeight: "32px", alignItems: "center"}} />
                                    {/* <span>{product.quantity}</span> */}
                                    <ThemeProvider theme={theme}>
                                        <Button  size="small" onClick={() => {IncreaseQuantity(product)}} variant="contained" color="neutral">
                                            <KeyboardDoubleArrowRightIcon />
                                        </Button>
                                    </ThemeProvider>
                                    {/* <MyButton buttonName=">" buttonType="default" typeName="button" styles={{maxWidth: "10px", minWidth: "10px", paddingLeft: "12px", paddingRight: "12px", height: "28px", alignItems: "center"}} onClickHandler={() => {IncreaseQuantity(product)}} />*/}
                                </div>
                                <div className="col-lg-2 d-flex justify-content-center align-items-center mb-fied-price-item">${product.price}</div>
                                <div className="col-lg-2 d-flex justify-content-center align-items-center mb-fied-price-sum">${product.price * product.quantity}</div>
                                <div className="col-lg-1 d-flex justify-content-center align-items-center">
                                    {/* <MyButton buttonName="x" buttonType="default" typeName="button" styles={{maxWidth: "10px", minWidth: "10px", paddingLeft: "12px", paddingRight: "12px", height: "28px", alignItems: "center"}} onClickHandler={() => {triggerConfirm(product)}} /> */}
                                    <ThemeProvider theme={theme}>
                                        <Button  size="small" onClick={() => {triggerConfirm(product)}} variant="contained" color="neutral" >
                                            <DeleteIcon />
                                        </Button>
                                    </ThemeProvider>
                                </div>
                            </div>
                            )
                        })
                    )
                    :
                    <div className="fw-bold">Nothing in cart!!!</div>
                }
                <div className="row justify-content-center py-3 border-bottom checkout-head-bg mb-3">
                    <div className="col-lg-9 d-flex justify-content-center align-items-center"></div>
                    <div className="col-lg-2 d-flex justify-content-center align-items-center fw-bold">TotalPrice</div>
                    <div className="col-lg-1 d-flex justify-content-center align-items-center fw-bold">${totalPrice(productChosen)}</div>
                </div>
            </div>
        </FadeIn>
        </>
    );
}

export default Checkout;