import React from 'react';
import style from './Loader.module.css';

const Loader = props => {

    return <div className={style.container}>
        <p>Loading...</p>
    </div>

}

export default React.memo(Loader);