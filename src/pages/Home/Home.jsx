import React from 'react';
import './Home.css';
import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div className={'osnova'}>
            <button className='osnova__text'>
                <Link to="make" className="osnova__text-link" >Создать тест</Link>
            </button>
            <button className='osnova__text'>
                <Link to="test" className="osnova__text-link">Пройти тест</Link>
            </button>
        </div>

    );
};

export default Home;