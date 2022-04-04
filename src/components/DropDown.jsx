import React from 'react';
import style from './DropDown.module.css';

const DropDown = props => {
    const { handleChange } = props;
    const { title, values, name, otherName } = props.question;

    return <div className={style.container}>
        <p>{title}<span className={style.star}> *</span></p>
        {values && values.map(item =>
            <div key={item.id}>
                <div>
                    {!item.isOther ? <div className={style.radioInput}><input type="radio" name={name} value={item.value}  onChange={(event) => handleChange(event)} /><label className={style.radioInputLabel}>{item.value}</label></div> :
                        <div className={style.otherRadio}>
                            <div className={style.radioInput}>
                                <input type="radio" name={name} value={item.value}  onChange={(event) => handleChange(event)} />
                                <label className={style.radioInputLabel}>{`${item.value}${item.isOther ? ':' : ''}`}</label>
                            </div>
                            <div className={style.otherInput}>
                                {item.isOther ? <input type="text" name={otherName} onChange={(event) => handleChange(event)} /> : ''}
                            </div>
                        </div>
                    }
                </div>
            </div>
        )}
    </div>
}

export default React.memo(DropDown);