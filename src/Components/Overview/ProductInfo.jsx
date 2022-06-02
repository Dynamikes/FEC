import React, { useState, useEffect, useContext } from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import styled from 'styled-components';
//import axios from 'axios';
import {
  ProductInfoWrapper,
  Title,
  StyledStars,
  StyledCategory,
  StyledPrice,
  StyledShare,
  SalePrice,
  StyledParagraph
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
        tempProd = response.data.name
      })
      .then(() => {
        setLoaded(true);
        productAdd(tempProd)
      })
      .catch((err) => {
        setError(err);
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
    })
  }, [styleID]);
  return (
    <ProductInfoWrapper>
      {styleLoaded ? <div><Title> {products.name} </Title> <span> {currentStyle.name}</span> </div>: null }
      <StyledStars>
        {' '}
        <StarRatings
        rating={Number(stars)}
        starRatedColor="gold"
        starDimension='15px'
        starSpacing={'2px'}
      />{' '}
        <a href='#ratings_and_reviews'>
          {' '}
          <small>Read all Reviews</small>{' '}
        </a>
      </StyledStars>
      <StyledCategory>
        {' '}
        {loaded ? 'Category: ' + products.category : null}
      </StyledCategory>
      <StyledPrice>
        {' '}
        { styleLoaded ? (currentStyle.sale_price ? <span>Price: <s> {'$' + currentStyle.original_price }</s> <SalePrice>{'  $' + currentStyle.sale_price } </SalePrice> </span> : <span> Price: {'$' + currentStyle.original_price }{' '} </span>) : null }
      </StyledPrice>
          <StyledParagraph>
            {loaded ? products.description : null}
          </StyledParagraph>
    </ProductInfoWrapper>

  );
}

export default hot(ProductInfo);
