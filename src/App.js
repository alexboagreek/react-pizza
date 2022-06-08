
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

import './scss/app.scss';


 
function App() {

  const [goods, setGoods] = useState([]);

  useEffect(() => {
    fetch('https://62a02298a9866630f8077dff.mockapi.io/goods').then(response => { 
      return response.json(); 
  }).then(array => { setGoods(array)}); 
  }, []);
  
  return (
    <div className="wrapper">
    <Header />
    <div className="content">
      <div className="container">
        <div className="content__top">
         <Categories />
         <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
            {
              goods.map((obj) => (
                <PizzaBlock 
                key={obj.id}
                title={obj.title} 
                price={obj.price} 
                imageUrl={obj.imageUrl}
                sizes={obj.sizes}
                types={obj.types}
                />
              ))
            }  
              
        </div>
      </div>
    </div>
  </div>
  ) 
}

export default App;
