import React, { useContext, useState,useEffect } from 'react';
import Directory from '../directory/directory.component';
import './homepage.styles.scss';
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { LoadingV1 } from '../loading/loading-v1.component';
import { IsExist } from '../../luan-library/check-exist-library';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingV3 } from '../loading/loading-v3.component';
import { selectProductLoading } from '../../store/product/product.selector';
import { Alert, Snackbar } from '@mui/material';
import { addItemToCartAction } from '../../store/cart/cart.action';
import { selectCartItemsReducer } from '../../store/cart/cart.selector';
import { MyButton } from '../button/button.component';
import FadeIn from 'react-fade-in/lib/FadeIn';
import MyImage from '../lazy-load/lazy-load.component';

const HomePage = (props) => {
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
    const productChosen = useSelector(selectCartItemsReducer);
    const dispatch = useDispatch();
    const onClickHandler = (product) => {
        const item = addItemToCartAction(product, productChosen)
        dispatch(item);
        triggerNotify(true, "success");
    }

    const {currentProductArray} = props;
    const {IsLoadingProduct} = useSelector(selectProductLoading);
    const settings = {
        slidesToShow: 5,
        // slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 2000,
        //dots: true,
        // centerMode: true,
        className: "center",
        swipeToSlide: true,
        // touchThreshold: 100,
        infinite: true,
        pauseOnHover: true,
        responsive: [
            {
              breakpoint: 1600,
              settings: {
                arrows: false,
                centerMode: false,
                // centerPadding: '40px',
                slidesToShow: 3
              }
            },
            {
              breakpoint: 420,
              settings: {
                arrows: false,
                centerMode: true,
                // centerPadding: '40px',
                slidesToShow: 1
              }
            }
        ]
    };

    return (
        <div className='main-background' style={{width: "70%",  marginRight: "auto", marginLeft: "auto"}}>
            <Snackbar open={openNotify} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{ vertical:"top", horizontal:"center" }}>
                <Alert onClose={handleClose} severity={typeNotify} sx={{ width: '100%' }}>
                    {mess}
                </Alert>
            </Snackbar>
            {
                IsLoadingProduct ? <LoadingV3 /> :
                <div style={{paddingTop: "85px"}}>
                {              
                !IsExist(currentProductArray) ?
                <LoadingV1 />
                :
                <FadeIn>
                    <Slider {...settings}>
                        {
                            currentProductArray.map((_, index) => {
                                return (
                                    <div key={`${_.category}-${_.id}`} className='product-card-container'>
                                        <MyImage className="" imageUrl={_.imageUrl} />
                                        {/* <img src={`${_.imageUrl}`} style={{width: "100%"}} /> */}
                                        <div className="footer">
                                            <span className="name">{_.name}</span>
                                            <span className="price">${_.price}</span>
                                        </div>
                                        <MyButton buttonName='Add cart' typeName='button' buttonType='inverted' onClickHandler={() => {onClickHandler(_)}} />
                                    </div>
                                    // <ProductCard key={`${_.category}-${_.id}`} product={_} index={1} category={_.category} imgSize={{width: "280px"}} />
                                )
                            })
                        }
                    </Slider>
                </FadeIn>
                }
                {
                    <FadeIn>
                        <div className='homepage' style={{paddingTop: "15px"}}>
                            <Directory />
                        </div>
                    </FadeIn>
                }
            </div>
            }
        </div>
    )
}
export default HomePage
