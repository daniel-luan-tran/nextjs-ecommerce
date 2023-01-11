import './form-input.styles.scss';
//import './sass-test.styles.sass';

export const MyInput = ({inputId, labelName, inputName, inputValue, onChangeHandler, isRequired, helpId, helpText, typeName, styles, className}) => {
    return (
        <div className={`group ${className}`}>
            <label htmlFor={inputId} className={`form-input-label ${inputValue !== "" ? 'shrink' : ''}`}>{labelName}</label>
            <input style={styles} type={typeName} className={`form-input ${className}`} id={inputId} aria-describedby={helpId} name={inputName} value={inputValue} onChange={onChangeHandler} required={isRequired ? true : false}/>
            <div id={helpId} className="form-text">{helpText}</div>
        </div>
    )
}