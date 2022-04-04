import React from 'react';
import style from './Title.module.css';

const Title = props => {
    const { title, description } = props.question;

    return <div className={style.container}>
        <div className={style.topBar}></div>
        <div className={style.content}>
            <p className={style.title}>{title}</p>
            <p>{description}</p>
            <p className={style.required}>*Required</p>
        </div>
    </div>

}

export default React.memo(Title);