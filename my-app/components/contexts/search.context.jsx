import { createContext, useState } from "react";

export const SearchContext = createContext(
    {
        searchString: "",
        setSearchString: () => {},
        searchPriceMin: "",
        setSearchPriceMin: () => {},
        searchPriceMax: "",
        setSearchPriceMax: () => {},
    }
);

export const SearchProvider = ({children}) => {
    const [searchString, setSearchString] = useState("");
    const [searchPriceMin, setSearchPriceMin] = useState("");
    const [searchPriceMax, setSearchPriceMax] = useState("");
    const value = {searchString, setSearchString, searchPriceMin, setSearchPriceMin, searchPriceMax, setSearchPriceMax};
    return (
        <SearchContext.Provider value={value} >{children}</SearchContext.Provider>
    );
}