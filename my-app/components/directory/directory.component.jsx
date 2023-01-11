import React, { useContext } from 'react';
import MenuItem from '../menu-item/menu-item.component';
import './directory.styles.scss';
import { ProductContext } from '../contexts/product.context';
import { IsExist } from '../../luan-library/check-exist-library';
import { LoadingV2 } from '../loading/loading-v2.component';
import { useSelector } from 'react-redux';

const Directory = () => {
    const products = useSelector((state) => {
        return state.product.currentProduct
    });
    //const {products} = useContext(ProductContext);
    return (
        <div className='directory-menu'>
        {
            !IsExist(products) ?
            <LoadingV2 />
            :
            // !(Object.keys(products).length === 0 && products.constructor === Object) &&
            Object.entries(products).map((item) => {
                const category = item[0];
                const _products = item[1];
                return <MenuItem key={category} title={category} imageUrl={_products[0].imageUrl} />
            })
        }
        </div>
    )
}

export default Directory;