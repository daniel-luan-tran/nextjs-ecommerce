import { createContext, useEffect, useState } from "react";
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';

export const CategoryContext = createContext(
    {
        category: null,
        setCategory: () => {}
    }
)

export const CategoryProvider = ({children}) => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getDataFromFireStore = async () => {
            const data = await getCategoriesAndDocuments();
            
            Object.entries(data).map((item) => {
                return setCategories([categories.push(item[0])]);
            })
        }
        getDataFromFireStore();
    }, []);
    
    const value = {categories, setCategories};
    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
}