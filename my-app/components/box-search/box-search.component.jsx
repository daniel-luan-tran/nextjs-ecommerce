import { useContext, useState } from "react";
import { SearchContext } from "../contexts/search.context";
import "./box-search.styles.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands, icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { TextField } from "@mui/material";
import { MyInput } from "../form-input/form-input.component";

export const BoxSearch = () => {
    const {searchString, setSearchString} = useContext(SearchContext);

    const onChangeHandler = (e) => {
        e.preventDefault();
        const keyword = e.target.value;
        setSearchString(keyword);
    }

    const onClickHandler = () => {
        setSearchString("");
    }

    return (
        <>
        {/* <form className="box-search border rounded-pill mobile-field" style={{minWidth: "260px"}}>
            <FontAwesomeIcon icon={solid('magnifying-glass')} style={{marginLeft: "10px", marginRight: "10px", cursor: "pointer"}} />
            <input type="text" className="border-0 input-style-keyword" onChange={onChangeHandler} value={searchString} placeholder="Enter keyword"></input>
            {searchString != "" && <FontAwesomeIcon icon={regular('circle-xmark')} style={{marginLeft: "10px", marginRight: "10px", cursor: "pointer"}} onClick={onClickHandler} />}
        </form> */}
        <MyInput className="mobile-field mt-2 mb-3" styles={{background: "#f0f0f0"}} typeName={'text'} inputId='filled-keyword-mb' labelName='Keyword' placeholder="Enter keyword" inputValue={searchString} onChangeHandler={onChangeHandler}  />
        <TextField
            id="filled-keyword-desk"
            className="desktop-field"
            label="Keyword"
            type="search"
            variant="filled"
            onChange={onChangeHandler}
            style={{width: "100%"}}
            autoComplete="off"
            placeholder="Enter keyword"
        />
        </>
    )
}