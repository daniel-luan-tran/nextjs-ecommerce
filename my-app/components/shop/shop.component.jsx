import { React, useContext, useState, useEffect } from "react";
import { BoxSearch } from "../box-search/box-search.component";
import { SearchContext } from "../contexts/search.context";
import ProductCard from "../product-card/product-card.component";
import ProductCardV2 from "../product-card/product-card-v2.component";
import { chain, pluck } from "underscore";
import "../shop/shop.styles.scss"
import { IsExist } from "../../luan-library/check-exist-library";
import { BoxSearchPrice } from "../box-search/box-search-price.component";

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { NavigationContext } from "../contexts/navigation.context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, openSidebar }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(openSidebar && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);  

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


export const Shop = (props) => {
    const {categorySelected} = props;
    const {currentProduct, currentProductArray} = props
    const {searchString, searchPriceMin, searchPriceMax, setSearchString, setSearchPriceMin, setSearchPriceMax} = useContext(SearchContext);
    const {navigation, setNavigation} = useContext(NavigationContext);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filteredProductsByKeyword, setFilteredProductsByKeyword] = useState([]);

    const theme = useTheme();
    const [openSidebar, setOpenSidebar] = useState(true);
  
    const handleDrawerOpen = () => {
      setOpenSidebar(true);
    };
  
    const handleDrawerClose = () => {
      setOpenSidebar(false);
    };
  
    useEffect(() => {
        setSearchString("");
        setSearchPriceMin("");
        setSearchPriceMax("");
    }, [navigation]);

    useEffect(() => {
        IsExist(currentProduct) && Object.entries(currentProduct).map((item) => {
            const category = item[0];
            const _products = item[1];
            return _products.map((product, index) => {
                return setFilteredProducts(currentProductArray 
                    && currentProductArray.filter((_) => _.name.toLowerCase().includes(searchString.toLowerCase()) 
                    && ((searchPriceMin != "" && searchPriceMax != "" && searchPriceMin <= searchPriceMax) ? (_.price >= searchPriceMin && _.price <= searchPriceMax) 
                        : (searchPriceMin != "" && searchPriceMax == "") ? _.price >= searchPriceMin 
                        : (searchPriceMin == "" && searchPriceMax != "") ? _.price <= searchPriceMax
                        : (searchPriceMin != "" && searchPriceMax != "" && searchPriceMin > searchPriceMax) ? _.price > 0
                        : _.price > 0)
                    ));
            })
        });
    }, [searchString, searchPriceMin, searchPriceMax])

    useEffect(() => {
        const result = chain(currentProductArray)
        .groupBy('category')
        .map((value, key) => {
            return {
                category: key,
                data: value
            }
        })
        .value();
        
        return setFilteredProductsByKeyword(result);
    }, [currentProductArray])

    useEffect(() => {
        const result = chain(filteredProducts)
        .groupBy('category')
        .map(function(value, key) {
            return {
                category: key,
                data: value
            }
        })
        .value();
        return setFilteredProductsByKeyword(result);
    }, [filteredProducts])

    const renderProductCard = (item) => { //Render with specific category
        const category = item[0];
        const _products = item[1];
        return _products.map((product, index) => {
            if (product.name.toLowerCase().includes(searchString.toLocaleLowerCase())
                && ((searchPriceMin != "" && searchPriceMax != "") ? (product.price >= searchPriceMin && product.price <= searchPriceMax) 
                : (searchPriceMin != "" && searchPriceMax == "") ? product.price >= searchPriceMin 
                : (searchPriceMin == "" && searchPriceMax != "") ? product.price <= searchPriceMax
                : product.price > 0)
                ) {return <ProductCard key={`${category}-${product.id}`} product={product} index={index} category={category} />
            }
        })
    }

    const renderProductCardByFilteredProducts = (filteredProductsByKeyword) => { //Render with all categories
        return filteredProductsByKeyword.length > 0 
        ? 
            filteredProductsByKeyword.map((product, index) => {
                return <ProductCardV2 key={`${product.category}`} product={product.data} category={product.category} />
            } )
        : <></>
    }

    return(
        <>
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}
            <div className="box-menu-icon">
                <IconButton
                    className="menu-icon-sidebar"
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2,...(openSidebar && { display: 'none' }) }}
                    >
                    <FontAwesomeIcon icon={solid('magnifying-glass')} />
                    {/* <MenuIcon  /> */}
                </IconButton>
            </div>

            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    top: "65px",
                },
                }}
                variant="persistent"
                anchor="left"
                open={openSidebar}
                >
                <DrawerHeader className="filter-header">
                    <FontAwesomeIcon icon={solid('magnifying-glass')} />
                    <div style={{textAlign: "left", width: "100%", fontWeight: '700', marginLeft: "10px"}}>Filter</div>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List style={{padding: "8px"}}>
                    {/* <div className="fw-bold mobile-field">Keyword</div> */}
                    <div className="mb-3"><BoxSearch /></div>
                    {/* <div className="fw-bold mobile-field">Price</div> */}
                    <div className="mb-3"><BoxSearchPrice /></div>
                </List>
                <Divider />
            </Drawer>
            <Main open={openSidebar}>
                <div id="product-list" className="products-container main-background" style={{paddingTop: "85px", width: "70%", marginRight: "auto", marginLeft: "auto" }}>
                    {
                        categorySelected == "" || typeof categorySelected == "undefined"
                        ?
                        renderProductCardByFilteredProducts(filteredProductsByKeyword)
                        :
                        IsExist(currentProduct) ? Object.entries(currentProduct).map((item) => {
                            if (item[0] == categorySelected) {
                                return renderProductCard(item)
                            }
                        })
                        :
                        <></>
                    }
                </div>
            </Main>
        </Box>
        </>
    )

}