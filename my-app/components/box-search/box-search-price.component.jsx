import { useContext, useState } from "react";
import { SearchContext } from "../contexts/search.context";
import "./box-search-price.styles.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands, icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Divider, Grid, Input, Slider, TextField } from "@mui/material";
import { MyInput } from "../form-input/form-input.component";
import { getCurrentProductArray } from "../../store/product/product.selector";
import { useSelector } from "react-redux";

export const BoxSearchPrice = () => {
    const {searchPriceMin, setSearchPriceMin, searchPriceMax, setSearchPriceMax} = useContext(SearchContext);
    const currentProductArray = useSelector(getCurrentProductArray);
    const arrayPrice = currentProductArray.map(_ => _.price);
    const maxPrice = Math.max(...arrayPrice);

    const onChangeHandlerMin = (e) => {
        e.preventDefault();
        const price = e.target.value;
        setSearchPriceMin(price);
    }
    const onChangeHandlerMax = (e) => {
        e.preventDefault();
        const price = e.target.value;
        setSearchPriceMax(price);
    }

    const onClickCloseMin = () => {
        setSearchPriceMin("");
    }
    const onClickCloseMax = () => {
        setSearchPriceMax("");
    }
    
    return (
        <>
        {/* <form className="box-search-price-min border rounded-pill mobile-field" style={{minWidth: "260px"}}>
            <FontAwesomeIcon icon={solid('dollar-sign')} style={{marginLeft: "10px", marginRight: "10px", cursor: "pointer"}} />
            <span>From: </span><input type="number" className="border-0 input-style-price" onChange={onChangeHandlerMin} value={searchPriceMin} placeholder="Enter price from"></input>
            {searchPriceMin != "" && <FontAwesomeIcon icon={regular('circle-xmark')} style={{marginLeft: "10px", marginRight: "10px", cursor: "pointer"}} onClick={onClickCloseMin} />}
        </form>
        <form className="box-search-price-max border rounded-pill mobile-field" style={{minWidth: "260px"}}>
            <FontAwesomeIcon icon={solid('dollar-sign')} style={{marginLeft: "10px", marginRight: "10px", cursor: "pointer"}} />
            <span style={{marginRight: "21px"}}>To: </span><input type="number" className="border-0 input-style-price" onChange={onChangeHandlerMax} value={searchPriceMax} placeholder="Enter price to"></input>
            {searchPriceMax != "" && <FontAwesomeIcon icon={regular('circle-xmark')} style={{marginLeft: "10px", marginRight: "10px", cursor: "pointer"}} onClick={onClickCloseMax} />}
        </form> */}
        <MyInput className="mobile-field mt-3 mb-0" styles={{background: "#f0f0f0"}} typeName={'number'} inputId='filled-price-min-mb' labelName='From price $' placeholder="Enter price" inputValue={searchPriceMin} onChangeHandler={onChangeHandlerMin}  />
        <TextField
            value={searchPriceMin | 0}
            id="filled-number"
            label="From price $"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"
            style={{width: "100%"}}
            onChange={onChangeHandlerMin}
            autoComplete="off"
            placeholder="Enter price $"
            className="mb-3 desktop-field"
        />
        <Slider value={searchPriceMin | 0} style={{marginLeft: "10px", marginRight: "10px", width: "-webkit-fill-available"}} onChange={onChangeHandlerMin} min={0} max={maxPrice} defaultValue={0} aria-label="Default" valueLabelDisplay="auto" />
        <Divider />
        <MyInput className="mobile-field mt-3 mb-0" styles={{background: "#f0f0f0"}} typeName={'number'} inputId='filled-price-max-mb' labelName='To price $' placeholder="Enter price" inputValue={searchPriceMax} onChangeHandler={onChangeHandlerMax}  />
        <TextField
            value={searchPriceMax | 0}
            id="filled-number"
            label="To price $"
            type="number"
            InputLabelProps={{
                shrink: true,
            }}
            variant="filled"
            style={{width: "100%"}}
            onChange={onChangeHandlerMax}
            autoComplete="off"
            placeholder="Enter price $"
            className="my-3 desktop-field"
        />
        <Slider value={searchPriceMax | 0} style={{marginLeft: "10px", marginRight: "10px", width: "-webkit-fill-available"}} onChange={onChangeHandlerMax} min={0} max={maxPrice} defaultValue={0} aria-label="Default" valueLabelDisplay="auto" />
        </>
    )
}