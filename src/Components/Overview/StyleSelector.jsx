import React, {useState, useEffect, useContext} from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
// import styled from 'styled-components';
// import axios from 'axios';
import { SelectorWrapper, Title, StyleThumbnail, StyleSelectorContainer } from '../StyledComponents.jsx';
import {styleIDContext} from './Overview'
import {API_KEY} from '../../config.js'
function StyleSelector() {
const [styleThumbs, setStyleThumbs] = useState(null)
const [loaded, setLoaded] = useState(false)
const styleID = useContext(styleIDContext)
const tempStyleThumbs = [];
useEffect(() => {
  axios({
    url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/styles',
    method: 'get',
    headers: {
      Authorization: API_KEY,
    },
  })
  .then((response) => {
    console.log(response.data)
    console.log(styleID)
    if (styleID === null) {
      for (let i = 0; i < response.data.results.length; i++) {
        tempStyleThumbs.push([response.data.results[i].photos[0].thumbnail_url, response.data.results[i].style_id])
      }
      console.log(tempStyleThumbs)
      
    }
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
      <Title>StyleSelector</Title>
      <StyleSelectorContainer>
        {loaded ? styleThumbs.map((thumb) => {
          return <StyleThumbnail key={thumb[1]} src={thumb[0]} />
        }) : ''}
        
        
      </StyleSelectorContainer>
    </SelectorWrapper>
  );
}

export default hot(StyleSelector);
