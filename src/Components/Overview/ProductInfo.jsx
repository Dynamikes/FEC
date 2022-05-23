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
import {
  API_KEY,
  MAIN_URL,
} from '/home/tannerhebert/hackreactorhub/FEC/FEC/src/config.js';
// import {
//   MAIN_URL,
//   API_KEY,
// } from '/home/tannerhebert/hackreactorhub/FEC/FEC/src/config.js';
// const getOurData = () => {
//   const [products, setProduct] = useState(null);
//   const [error, setError] = useState('');
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     axios({
//       url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/',
//       method: 'get',
//       headers: {
//         Authorization: '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',
//       },
//     })
//       .then((response) => {
//         setProduct(response.data);
//         console.log(response.data);
//       })
//       .then(() => {
//         setLoaded(true);
//       })
//       .catch((err) => {
//         setError(err);
//         console.log('Breaking in getOurData. Err:', err);
//       });
//   }, []);
//   return { products, error, loaded };
// };

// const getOurData = () => {
//   axios({
//     url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/',
//     method: 'get',
//     // baseURL: window.MAIN_URL,
//     headers: {
//       Authorization: window.API_KEY,
//     },
//   })
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((err) => {
//       console.log('Breaking in basic axios request. Err:', err);
//     });
// };
function ProductInfo() {
  const [products, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios({
      url: MAIN_URL + 'products/',

      method: 'get',
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
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
      <StyledPrice> $500 </StyledPrice>
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
