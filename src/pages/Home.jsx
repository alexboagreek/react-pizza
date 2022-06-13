import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from './../App';


const Home = () =>  {

        const { searchValue } = React.useContext(SearchContext);
        const [goods, setGoods] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [categoryId, setCategoryId] = useState(0);
        const [currentPage, setCurrentPage] = useState(1);
        const [sortType, setSortType] = useState({
            name: 'популярности',
            sortProperty: 'rating',
        });

        useEffect(() => {
            setIsLoading(true);

            const search = searchValue ? `&search=${searchValue}` : '' ; 

            fetch(`https://62a02298a9866630f8077dff.mockapi.io/goods?page=${currentPage}&limit=4&${
                categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${sortType.sortProperty.includes('-') ? 'asc' : 'desc'}${search}`)
            .then(response => { 
            return response.json(); 
        }).then(array => { 
            setGoods(array); 
            setIsLoading(false)});
            
            window.scrollTo(0, 0);

        }, [categoryId, sortType, searchValue, currentPage]);
      
        const pizzas = goods.map((obj) => <PizzaBlock key={obj.id} {...obj} />);

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
            <Pagination onChangePage={number => setCurrentPage(number)}/>
        </>
        
        );
    
}

export default Home;
