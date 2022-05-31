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

function ProductInfo() {
  const [products, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [currentStyle, setCurrentStyle] = useState(null)
  const [styleLoaded, setStyleLoaded] = useState(false)

  let prodID = useContext(prodIDContext);
  const stars = useContext(starsContext)
  const styleID = useContext(styleIDContext);
  console.log(styleID)


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
      <Title> {styleLoaded ? currentStyle.name : 'TITLE'} </Title>
      <StyledPrice>
        {' '}
        {styleLoaded ? '$' + currentStyle.original_price : 'PRICE'}{' '}
      </StyledPrice>
    </ProductInfoWrapper>

  );
}

export default hot(ProductInfo);
