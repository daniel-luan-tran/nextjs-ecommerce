import React, { useContext } from 'react';
import './menu-item.styles.scss';
import { useNavigate } from 'react-router-dom';
import { NavigationContext } from '../contexts/navigation.context';

const MenuItem = ({title, imageUrl}) => {
    const {navigation, setNavigation} = useContext(NavigationContext);
    const navigate = useNavigate();
    
    const onClickHandler = (title) => {
        setNavigation(`shop/${title}`);
        navigate(`shop/${title}`)
    }

    return (
        <div className={`menu-item large`} onClick={() => {onClickHandler(title)}}>
            <div className='background-image'
                style={{backgroundImage: `url(${imageUrl})`}}
            >
                <div className='content'>
                    <h1 className='title'>{title.toUpperCase()}</h1>
                    <span className='subtitle'>Shop now</span>
                </div>
            </div>
        </div>
    )
}

export default MenuItem;