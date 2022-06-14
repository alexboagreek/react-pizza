import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from './../App';


const Home = () =>  {
    const dispatch = useDispatch();
    const categoryId = useSelector(state => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort.sortProperty);




        const { searchValue } = React.useContext(SearchContext);
        const [goods, setGoods] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [currentPage, setCurrentPage] = useState(1);


        // магия dispatch  в действии

        const onClickCategory = (id) => {
            dispatch(setCategoryId(id));
        }


        useEffect(() => {
            setIsLoading(true);

            const search = searchValue ? `&search=${searchValue}` : '' ; 

            fetch(`https://62a02298a9866630f8077dff.mockapi.io/goods?page=${currentPage}&limit=4&${
                categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sortType.replace('-', '')}&order=${sortType.includes('-') ? 'asc' : 'desc'}${search}`)
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
            <Categories value={ categoryId } onClickCategory={ onClickCategory } />
            <Sort />
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
