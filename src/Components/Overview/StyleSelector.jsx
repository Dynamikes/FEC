/* eslint-disable react/prop-types */
import React, {useState, useEffect, useContext} from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
// import styled from 'styled-components';
// import axios from 'axios';
import { SelectorWrapper, Title, StyleThumbnail, StyleSelectorContainer, HighlightStyleThumbnail } from '../StyledComponents.jsx';
import {styleIDContext} from './Overview'
import {prodIDContext} from '../../App.jsx'
import {MAIN_API_KEY} from '../../config.js'
function StyleSelector(props) {
const [styleThumbs, setStyleThumbs] = useState(null)
const [loaded, setLoaded] = useState(false)
const styleID = useContext(styleIDContext)
const prodID = useContext(prodIDContext)
var tempStyleThumbs = [];
useEffect(() => {
  axios({
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodID}/styles`,
    method: 'get',
    headers: {
      Authorization: MAIN_API_KEY,
    },
  })
  .then((response) => {
    // if (styleID === null) {
      for (let i = 0; i < response.data.results.length; i++) {
        tempStyleThumbs.push([response.data.results[i].photos[0].url, response.data.results[i].style_id])
      }

    // }
    // else {
    //   tempStyleThumbs = [];
    //   for (let i = 0; i < response.data.results.length; i++) {
    //     if (response.data.results[i].style_id !== styleID) {
    //       tempStyleThumbs.push([response.data.results[i].photos[0].thumbnail_url, response.data.results[i].style_id])
    //     }
    //   }
    // }
    setStyleThumbs(tempStyleThumbs)
  })
  .then(() => {
    setLoaded(true);
  })
  .catch((err) => {
    console.log('Breaking in StyleSelector get. Err:', err)
  })
}, [styleID]);

  return (
    <SelectorWrapper>
      <StyleSelectorContainer>
        {loaded ? styleThumbs.map((thumb) => {

          if (thumb[1] === styleID) {
            return <HighlightStyleThumbnail key={thumb[1]} src={thumb[0]} onClick={() => {props.click(thumb[1])}}/>
          } else {
            return <StyleThumbnail key={thumb[1]} src={thumb[0]} onClick={() => {props.click(thumb[1])}}/>
          }

        }) : ''}


      </StyleSelectorContainer>
    </SelectorWrapper>
  );
}

export default hot(StyleSelector);
