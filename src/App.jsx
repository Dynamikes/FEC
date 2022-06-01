import React, {useState} from 'react';
import { hot } from 'react-hot-loader/root';
import Overview from './Components/Overview/Overview.jsx';
import Reviews from './Components/Reviews/Reviews.jsx';
import RelatedProducts from './Components/RelatedProducts/RelatedProducts.jsx';
import QA from './Components/QA/QA.jsx';
import PropTypes from 'prop-types';
import {
  Flexbox,
  StyledPageTitle,
  AppWrapper,
} from './Components/StyledComponents.jsx';
export const prodIDContext = React.createContext();
export const starsContext = React.createContext();
export const productForAdd = React.createContext();
import { MAIN_API_KEY } from './config.js';
import axios from 'axios';

const App = (props) => {
  const [prodID, setProdID] = useState(40351)
  const [stars, setStars] = useState(null);
  const [productName, setProductName] = useState(null);
  let products = [];

  const changeStars = (count) => {
    setStars(count);
  }

  const productAdd = (prod) => {
    setProductName(prod);
    console.log('Is productadd being invoked', )
  }

  const getAllProducts = async () => {
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products?count=100',
      method: 'get',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
      .then((response) => {
        products.push(response.data);
        console.log('this is all data: ', response.data);
      })
      .catch((err) => {
        console.log('Breaking in getOurData. Err:', err);
      });
    console.log('products:', products);
  };
  getAllProducts();

  const name = props.name;
  return prodID ? (
    <prodIDContext.Provider value={prodID} >
    <starsContext.Provider value={stars} >
    <productForAdd.Provider value={productName}>
    <AppWrapper>
      <StyledPageTitle>Hello {name}</StyledPageTitle>
      <Flexbox>
        <Overview productAdd={productAdd} />
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
  ) : null ;
};
App.propTypes = {
  name: PropTypes.node,
};
export default hot(App);
