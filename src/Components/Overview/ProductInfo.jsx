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

function ProductInfo() {
  const [products, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  let product_id = useContext(prodIDContext);
  const stars = useContext(starsContext)

  useEffect(() => {
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/',
      method: 'get',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
      .then((response) => {
        console.log('responsedata,', response)
        setProduct(response.data);
      })
      .then(() => {
        console.log('productInfo', products)
        setLoaded(true);
      })
      .catch((err) => {
        setError(err);
        console.log('Breaking in getOurData. Err:', err);
      });
  }, []);
  return (
    <ProductInfoWrapper>
      <StyledStars>
        {' '}
        <StarRatings
        rating={Number(stars)} //Need to pull rating for product in from Ratings to replace 1...
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
        {loaded ? products[0].category : 'CATEGORY'}
      </StyledCategory>
      <Title> {loaded ? products[0].name : 'TITLE'} </Title>
      <StyledPrice>
        {' '}
        {loaded ? '$' + products[0].default_price : 'PRICE'}{' '}
      </StyledPrice>
    </ProductInfoWrapper>
  );
}

export default hot(ProductInfo);
