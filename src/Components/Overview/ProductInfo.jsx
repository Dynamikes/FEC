import React, { useState, useEffect } from 'react';
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
import config from '../../config.js'

function ProductInfo() {
  const [products, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios({
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/',
      method: 'get',
      headers: {
        Authorization: config.API_KEY,
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
  }, []);
  return (
    <ProductInfoWrapper>
      <StyledStars>
        {' '}
        ⭐⭐⭐⭐⭐{' '}
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
      <StyledShare>
        <div
          className='fb-share-button'
          data-href='https://facebook.com'
          data-layout='button_count'
          data-size='small'>
          <a
            target='_blank'
            rel='noreferrer'
            href='https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffacebook.com%2F&amp;src=sdkpreparse'
            className='fb-xfbml-parse-ignore'>
            Share
          </a>
        </div>
        <a
          rel='noReferrer'
          href='//www.pinterest.com/pin/create/button/'
          className='pin-it-button'
          count-layout='none'
          target='_blank'>
          <img
            src='//assets.pinterest.com/images/pidgets/pin_it_button.png'
            alt='Pin it'
          />{' '}
        </a>
        <a
          className='twitter-share-button'
          rel='noReferrer'
          target='_blank'
          href='https://twitter.com/intent/tweet'>
          <img src='' alt='Tweet' />
        </a>
      </StyledShare>
    </ProductInfoWrapper>
  );
}

export default hot(ProductInfo);
