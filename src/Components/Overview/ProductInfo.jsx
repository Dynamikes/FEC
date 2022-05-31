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
import {styleIDContext} from './Overview.jsx'

function ProductInfo() {
  const [products, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(null)
  const [styleLoaded, setStyleLoaded] = useState(false)

  let prodID = useContext(prodIDContext);
  const stars = useContext(starsContext)
  const styleID = useContext(styleIDContext);


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
      })
      .then(() => {
        setLoaded(true);
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
      console.log(response.data.results)
      for (let i = 0; i < response.data.results.length; i++) {
        if (response.data.result[i].style_id === styleID) {
          setCurrentStyle(response.data.result[i])
        }
      }
    })
    .then(() => {
      setStyleLoaded(true)
    })
  }, []);
  return (
    <ProductInfoWrapper>
      <StyledStars>
        {' '}
        <StarRatings
        rating={Number(stars)} 
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
      <Title> {loaded ? currentStyle.name : 'TITLE'} </Title>
      <StyledPrice>
        {' '}
        {loaded ? '$' + currentStyle.original_price : 'PRICE'}{' '}
      </StyledPrice>
    </ProductInfoWrapper>
    
  );
}

export default hot(ProductInfo);
