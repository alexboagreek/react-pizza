import React, { useState, useEffect } from 'react';

import Categories from '../Categories';
import Sort from '../Sort';
import PizzaBlock from '../PizzaBlock';
import Skeleton from '../PizzaBlock/Skeleton';


const Home = () =>  {
    
        const [goods, setGoods] = useState([]);
        const [isLoading, setIsLoading] = useState(true);

        useEffect(() => {
            fetch('https://62a02298a9866630f8077dff.mockapi.io/goods').then(response => { 
            return response.json(); 
        }).then(array => { 
            setGoods(array); 
            setIsLoading(false)}); 
        }, []);
        return (
        <>
            <div className="content__top">
            <Categories />
            <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                isLoading 
                ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                : goods.map((obj) => <PizzaBlock key={obj.id} {...obj} />)

                }  
                
            </div> 
        </>
        );
    
}

export default Home;
