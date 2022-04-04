import React from 'react';
import style from './Input.module.css';

const Input = props => {
    const { handleChange } = props;
    const { title, placeHolder, isRequired, name } = props.question;

    return <div className={style.container}>
        <p>{title}</p>
        <input type="text" name={name} placeholder={placeHolder} required={isRequired} onChange={(event) => handleChange(event)} />
    </div>
}

export default React.memo(Input);