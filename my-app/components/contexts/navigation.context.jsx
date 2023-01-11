import { createContext, useEffect, useState } from 'react';

export const NavigationContext = createContext(
    {
        navigation: null,
        setNavigation: () => {},
    }
);

//Truyền dữ liệu vào context
export const NavigationProvider = ({children}) => {
    // window.history.pushState({}, '', window.location.href);
    // console.log(window.location.href);
    let location = window.location.href;
    const [navigation, setNavigation] = useState(location);
    const value = {navigation, setNavigation};
    
    return (
        <NavigationContext.Provider value={value}>
            {children}
        </NavigationContext.Provider>
    );
}