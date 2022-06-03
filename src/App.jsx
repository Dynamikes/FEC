import React, {useState} from 'react';
import { hot } from 'react-hot-loader/root';
import Overview from './Components/Overview/Overview.jsx';
import Reviews from './Components/Reviews/Reviews.jsx';
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx';
import QA from './Components/QA/QA.jsx';
import PropTypes from 'prop-types';
import HomePage from './HomePage.jsx'
import {
  Flexbox,
  StyledPageTitle,
  AppWrapper,
  HomeButton,
  HomeButtonDiv
} from './Components/StyledComponents.jsx';
export const prodIDContext = React.createContext();
export const starsContext = React.createContext();
export const productForAdd = React.createContext();
export const allProductsContext = React.createContext();
import { MAIN_API_KEY } from './config.js';
import axios from 'axios';

const App = (props) => {
  const [prodID, setProdID] = useState(40344)
  const [stars, setStars] = useState(null);
  const [productName, setProductName] = useState(null);
  const [allProducts, setAllProducts] = useState([]);

  const changeStars = (count) => {
    setStars(count);
  }

  const productAdd = (prod) => {
    setProductName(prod);
  }


  const name = props.name;

  const updateID = (id) => {
    setProdID(id);
    console.log(id)
  }
  const updateAllProducts = (array) => {
    setAllProducts(array);
  }
  return prodID ? (
    <prodIDContext.Provider value={prodID} >
    <starsContext.Provider value={stars} >
    <productForAdd.Provider value={productName}>
    <AppWrapper>
        <HomeButton onClick={()=>{updateID(null)}}> Home! </HomeButton>
      <StyledPageTitle>Hello {name}</StyledPageTitle>
      <Flexbox className='Overview' >
        <Overview  productAdd={productAdd} />
      </Flexbox>
      <Flexbox>
        <RelatedProducts />
      </Flexbox>
      <Flexbox id="ratings_and_reviews">
        <Reviews changeStars={changeStars}/>
      </Flexbox>
      <Flexbox>
        <QA />
      </Flexbox>
    </AppWrapper>
    </productForAdd.Provider>
    </starsContext.Provider>
    </prodIDContext.Provider>
  ) :
  <allProductsContext.Provider value={allProducts}>
    <HomePage updateID={updateID} updateAllProducts={updateAllProducts}/>
  </allProductsContext.Provider>
};
App.propTypes = {
  name: PropTypes.node,
};
export default hot(App);
