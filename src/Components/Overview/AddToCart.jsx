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
const QuantOption = styled.option`
`
const CartForm = styled.form`
`

const AddToCart = () => {
  
  const [cart, setCart] = useState([]);
  const [sizes, setSizes] = useState(null)
  const [inStock, setInStock] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0);
  const [skus, setSkus] = useState(null);
  const [skusLoaded, setSkusLoaded] = useState(false)
  const [currentSize, setCurrentSize] = useState(null)
  const [currentQuant, setCurrentQuant] = useState(null)
  const [selectedQuant, setSelectedQuant] = useState(null)
  const styleID = useContext(styleIDContext)
  const prodID = useContext(prodIDContext)
  var currentStyle = null;
  
  const range= (start, end) => {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }


  useEffect(() => {
    axios({
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/${prodID}/styles`,
      method: 'get',
      headers: {
        Authorization: MAIN_API_KEY,
      },
    })
    .then((response) => {
      // console.log('this is style id', styleID)
      // console.log('response.data.results', response.data.results)
      for (let i = 0; i < response.data.results.length; i++) {
        if (response.data.results[i].style_id === styleID) {
          currentStyle = response.data.results[i].skus 
          //console.log('Stylematch', currentStyle)
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
    //console.log('this is cart' , cart)
    for (const key in cart) {
      tempSkus.push([key, cart[key]])
      //console.log('this is the log of attempted tempSkus', `${key}: ${cart[key]}`, tempSkus)
    }
    setSkus(tempSkus);
    //setSkusLoaded(true)

  
  }, [cart])

 
    useEffect(() => {
    const getData = async () => {
      const tempCurrentSize = await skus[0][1].size;
      const tempCurrentQuant = await skus[0][1].quantity;
      setCurrentQuant(tempCurrentQuant);
      setCurrentSize(tempCurrentSize);
      setSkusLoaded(true);
    }
    getData()
    .catch(console.error)

  }, [skus])
  
  
  const isThis = (event) => {
    event.preventDefault()
    console.log(currentSize)
    console.log(selectedQuant)

  }

  useEffect(() => {
  //  const updateQuant = async () => {
  //    const tempSize = await currentSize
  //    console.log('tempSkus', tempSkus)
  //   for (let i = 0; i < tempSkus.length; i++) {
  //     if (tempSkus.size === tempSize) {
  //       setCurrentQuant(tempSkus[i][1])
  //       console.log('QuantUpdated')
  //     }
  //   }
  //  } 

  //  updateQuant()
  //  .catch(console.error)
  if (skus !== null && currentSize !== null) {
    let tempSkus = skus.slice();
    console.log('howdy')
  for (let i = 0; i < tempSkus.length; i++) {
    //console.log('yeehaw', currentSize, tempSkus[i])
        if (tempSkus[i][1].size === currentSize) {

          setCurrentQuant(tempSkus[i][1].quantity)
          console.log('QuantUpdated')
        }
      }
  }
  

    
  }, [currentSize])
    return (
    <CartDiv>
      <CartForm onSubmit={isThis}>
      <StyledSizeQuantity>
        <StyledSizeSelect name='SizeSelect' id='SizeSelect' onChange={(e) => {setCurrentSize(e.target.value)} }>
          {skusLoaded 
          ?
            skus.map((sku, index) => {
              return (
                <SizeOption key={index} value={sku[1].size} > {sku[1].size} </SizeOption>
              )
            }) 
          : 
          <option> hello </option>
          }
        </StyledSizeSelect>
        <StyledQuantitySelect name='Quantity' id='Quantity' onChange={(e) => {setSelectedQuant(e.target.value)} }>
        {skusLoaded && currentQuant !== 0
          ?
            (range(1, currentQuant)).slice(0, 15).map((sku, index) => {
              return (
                <QuantOption key={index} > {sku} </QuantOption>
              )
            }) 
          : 
          ''
          }
          
        </StyledQuantitySelect>
      </StyledSizeQuantity>
      <AddToCartButton type="submit" value="Add to Cart" />
      </CartForm>
    </CartDiv>
  );
};

export default hot(AddToCart);


// range of 1 -> 