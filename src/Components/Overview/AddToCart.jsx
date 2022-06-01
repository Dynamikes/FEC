import React, {useState, useContext, useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import axios from 'axios';
import styled from 'styled-components';
import {MAIN_API_KEY} from '../../config.js'
import {styleIDContext} from './Overview'
import {prodIDContext} from '../../App.jsx'
import {
  CartDiv,
  StyledSizeQuantity,
  StyledSizeSelect,
  StyledQuantitySelect,
  AddToCartButton,
} from '../StyledComponents.jsx';


const SizeOption = styled.option`

`


const AddToCart = () => {
  
  const [cart, setCart] = useState([]);
  const [sizes, setSizes] = useState(null)
  const [inStock, setInStock] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0);
  const [skus, setSkus] = useState(null);
  const [skusLoaded, setSkusLoaded] = useState(false)
  const styleID = useContext(styleIDContext)
  const prodID = useContext(prodIDContext)
  var currentStyle = null;
  
  useEffect(() => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodID}/styles`,
      method: 'get',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
    .then((response) => {
      console.log('this is style id', styleID)
      console.log('response.data.results', response.data.results)
      for (let i = 0; i < response.data.results.length; i++) {
        if (response.data.results[i].style_id === styleID) {
          currentStyle = response.data.results[i].skus 
          console.log('Stylematch', currentStyle)
        }
      }
    })
    .then(() => {
      let temp = loadedCount
      setLoadedCount(temp + 1)
      setCart(currentStyle)
    })
    
    .catch((err) => {
      console.log('Breaking in StyleSelector get. Err:', err)
    })
  }, [styleID]);
  
  useEffect(() => {
    const tempSkus = [];
    console.log('this is cart' , cart)
    for (const key in cart) {
      tempSkus.push([key, cart[key]])
      console.log('this is the log of attempted tempSkus', `${key}: ${cart[key]}`, tempSkus)
    }
    setSkus(tempSkus);
    setSkusLoaded(true)
  
  }, [cart])


    return (
    <CartDiv>
      <StyledSizeQuantity>
        <StyledSizeSelect name='SizeSelect' id='SizeSelect'>
          {skusLoaded 
          ?
            skus.map((sku, index) => {
              return (
                <SizeOption key={index}> {sku[1].size} </SizeOption>
              )
            }) 
          : 
          <option> hello </option>
          }
        </StyledSizeSelect>
        <StyledQuantitySelect name='Quantity' id='Quantity'>
          <option value='1'> 1 </option>
          <option value='2'> 2 </option>
          <option value='3'> 3 </option>
        </StyledQuantitySelect>
      </StyledSizeQuantity>
      <AddToCartButton>Add to Cart</AddToCartButton>
    </CartDiv>
  );
};

export default hot(AddToCart);
{/* <option value='empty' disabled hidden>
            {' '}
            Select Size{' '}
          </option>
          <option value='small'> Small </option>
          <option value='medium'> Medium </option>
          <option value='large'> Large </option> */}