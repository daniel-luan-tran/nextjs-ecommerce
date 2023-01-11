// import ShopData from '../../shop-data.json';
// import SHOP_DATA from '../../shop-data.js';
// import { createContext, useEffect, useState } from 'react';
// import { addCollectionAndDocuments, getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

// //Khởi tạo context => Gọi useContext(ProductContext) -> {products}
// export const ProductContext = createContext(
//     {
//         products: null,
//         setProducts: () => null,
//         productsArray: [],
//         setProductsArray: () => {}
//     }
// );

// //Truyền dữ liệu vào context
// export const ProductProvider = ({children}) => {
//     const [products, setProducts] = useState({});
//     const [productsArray, setProductsArray] = useState({});
//     const [isShowShop, setIsShowShop] = useState(true);
//     const value = {products, setProducts, isShowShop, setIsShowShop, productsArray, setProductsArray};

//     useEffect(() => {
//         const getDataFromFireStore = async () => {
//             const data = await getCategoriesAndDocuments();
//             let arrayData = [];

//             Object.entries(data).map((_) => {
//                 _[1].map((__) => {
//                     arrayData.push({...__, category: _[0]});
//                 });
//             })
            
//             setProductsArray(arrayData);
//             setProducts(data);
//         }
//         getDataFromFireStore();
//     }, []);

//     return (
//         <ProductContext.Provider value={value}>
//             {children}
//         </ProductContext.Provider>
//     );
// }