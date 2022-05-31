import React, { useState, useEffect, useContext } from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
//import styled from 'styled-components';
//import axios from 'axios';
import {
  ProductInfoWrapper,
  Title,
  StyledStars,
  StyledCategory,
  StyledPrice,
  StyledShare,
} from '../StyledComponents.jsx';
import {MAIN_API_KEY} from '../../config.js'
import {prodIDContext} from '../../App.jsx';
import StarRatings from 'react-star-ratings';
import {starsContext} from '../../App.jsx';
import {styleIDContext} from './Overview'
import {productForAdd} from '../../App.jsx';

function ProductInfo({productAdd}) {
  const [products, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(null);
  const [styleLoaded, setStyleLoaded] = useState(false);
  let prodID = useContext(prodIDContext);
  const stars = useContext(starsContext);
  const styleID = useContext(styleIDContext);
  const prodName = useContext(productForAdd);
  console.log('prodname', prodName)
  var tempProd = '';

  useEffect(() => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodID}`,
      method: 'get',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
      .then((response) => {
        setProduct(response.data);
        console.log('just product pull', response.data)
        tempProd = response.data.name
      })
      .then(() => {
        setLoaded(true);
        console.log('this is products', tempProd)
        productAdd(tempProd)
        
      })
      .then(() => {
        console.log('post productadd prodname' , prodName)
      })
      .catch((err) => {
        setError(err);
        console.log('Breaking in getOurData. Err:', err);
      });
  }, [prodID]);

  useEffect(() => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodID}/styles`,
      method: 'get',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
    .then((response) => {
      console.log('responsedataresults', response.data.results)
      if (styleID !== null) {
        for (let i = 0; i < response.data.results.length; i++) {
        if (response.data.results[i].style_id === styleID) {
          setCurrentStyle(response.data.results[i])
        }
      }} else {
        setCurrentStyle(response.data.results[0])
      }
    })
    .then(() => {
      setStyleLoaded(true)
      console.log('this is currentstyle', currentStyle)
    })
  }, [styleID]);
  return (
    <ProductInfoWrapper>
      <StyledStars>
        {' '}
        <StarRatings
        rating={Number(stars)}
        starRatedColor="gold"
        starDimension='25px'
        starSpacing={'2px'}
      />{' '}
        <a href='#ratings_and_reviews'>
          {' '}
          <small>Reviews</small>{' '}
        </a>
      </StyledStars>
      <StyledCategory>
        {' '}
        {loaded ? products.category : 'CATEGORY'}
      </StyledCategory>
      <Title> {styleLoaded ? products.name : 'TITLE'} </Title>
      <StyledPrice>
        {' '}
        {styleLoaded ? '$' + currentStyle.original_price : 'PRICE'}{' '}
      </StyledPrice>
    </ProductInfoWrapper>

  );
}

export default hot(ProductInfo);
