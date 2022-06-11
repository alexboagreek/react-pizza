import React, { useState, useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';


const Home = ({ searchValue }) =>  {
    
        const [goods, setGoods] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [categoryId, setCategoryId] = useState(0);
        const [sortType, setSortType] = useState({
            name: 'популярности',
            sortProperty: 'rating',
        });

        useEffect(() => {
            setIsLoading(true);
            fetch(`https://62a02298a9866630f8077dff.mockapi.io/goods?${
                categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${sortType.sortProperty.includes('-') ? 'asc' : 'desc'}`)
            .then(response => { 
            return response.json(); 
        }).then(array => { 
            setGoods(array); 
            setIsLoading(false)});
            
            window.scrollTo(0, 0);

        }, [categoryId, sortType]);
      
        const pizzas = goods.filter(obj => {
            if (obj.title.toLowerCase().includes(searchValue.toLowerCase())){
                return true;
            }
            return false;
        })
            .map((obj) => <PizzaBlock key={obj.id} {...obj} />);

        return (
        <>
            <div className="content__top">
            <Categories value={ categoryId } onClickCategory={ (index) => setCategoryId(index) } />
            <Sort value={ sortType } onChangeSort={ (index) => setSortType(index) }/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                isLoading 
                ? [...new Array(6)].map((_, index) => <Skeleton key={index}/>)
                : pizzas }     
            </div> 
        </>
        );
    
}

export default Home;
