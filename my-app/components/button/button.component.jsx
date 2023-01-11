import './button.styles.scss';

const button_type = {
    googleSignIn : 'google-sign-in',
    inverted: 'inverted',
    default: ''
}

const type = {
    submit: 'submit',
    button: 'button'
}

export const MyButton = ({buttonName, buttonType, typeName, onClickHandler, styles, otherProps}) => {
    
    return (
        <>
        {
            onClickHandler 
                ?
                <button type={type[typeName]} className={`button-container ${button_type[buttonType]}`} onClick={onClickHandler} style={styles} {...otherProps} >{buttonName}</button>
                :
                <button type={type[typeName]} className={`button-container ${button_type[buttonType]}`} style={styles} {...otherProps} >{buttonName}</button>
        }
        </>
    )
}