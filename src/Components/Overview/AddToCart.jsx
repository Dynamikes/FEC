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
display: flex;
flex-direction: column;
`

const AddToCart = () => {

  const [cart, setCart] = useState([]);
  const [sizes, setSizes] = useState(null)
  const [inStock, setInStock] = useState(false)
  const [loadedCount, setLoadedCount] = useState(0);
  const [skus, setSkus] = useState([]);
  const [skusLoaded, setSkusLoaded] = useState(false)
  const [currentSize, setCurrentSize] = useState(null)
  const [currentQuant, setCurrentQuant] = useState(null)
  const [selectedQuant, setSelectedQuant] = useState(null)
  const styleID = useContext(styleIDContext)
  const prodID = useContext(prodIDContext)


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
      var currentStyle = null;
      for (let i = 0; i < response.data.results.length; i++) {
        if (response.data.results[i].style_id === styleID) {
          currentStyle = response.data.results[i].skus;
          return currentStyle;

        }
      }
    })
    .then((currentStyle) => {
      let temp = loadedCount
      setLoadedCount(temp + 1)
      setCart(currentStyle)
    })

    .catch((err) => {
      console.log('Breaking in StyleSelector get. Err:', err)
    })
  }, [styleID]);

  useEffect( () => {
    const tempSkus = [];
    for (const key in cart) {
      tempSkus.push([key, cart[key]])
    }
  setSkus(tempSkus);

  }, [cart])

  const getData = async () => {
    if (skus.length) {
      const tempCurrentSize =  skus[0][1].size;
      const tempCurrentQuant =  skus[0][1].quantity;
      setCurrentQuant(tempCurrentQuant);
        if(currentSize === null) {
          setCurrentSize(tempCurrentSize);
        }
      setSkusLoaded(true);
    }
  }

  useEffect(() => {
    if (!skus.length) {
      getData();
    }
  }, [skus])


  const isThis = (event) => {
    event.preventDefault()
    let tempSku = 0;
    for (let x = 0; x < skus.length; x++) {
      if (skus[x][1].size === currentSize) {
        tempSku = skus[x][0]
      }
    }
    for (let i = 0; i < selectedQuant; i++) {
      axios({
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/cart`,
        method: 'post',
        headers: {
          Authorization: MAIN_API_KEY,
        },
        data: {
          sku_id: tempSku
        }
      })
      .catch((err) => {
        console.log('Breaking in the silly post request. Err:', err)
      })
    }

  }

  useEffect(() => {
  if (skus !== null && currentSize !== null) {
    let tempSkus = skus.slice();
  for (let i = 0; i < tempSkus.length; i++) {

        if (tempSkus[i][1].size === currentSize) {
          setCurrentQuant(tempSkus[i][1].quantity)
        }
      }
  }
  }, [currentSize, styleID])
    return (
    <CartDiv>
      <CartForm onSubmit={isThis}>
      <StyledSizeQuantity>
        <div>
        <label>Size:</label>
        <StyledSizeSelect  name='SizeSelect' id='SizeSelect' onChange={(e) => {setCurrentSize(e.target.value)} }>
          <SizeOption selected disabled hidden> </SizeOption>
          {skus !== null
          ?
            skus.map((sku, index) => {
              return (
                <SizeOption key={index} > {sku[1].size} </SizeOption>
              )
            })
          :
          <option> hello </option>
          }
        </StyledSizeSelect>
        </div>
        <div>
        <label> Quantity: </label>
         <StyledQuantitySelect selected='' name='Quantity' id='Quantity' onChange={(e) => {setSelectedQuant(e.target.value)} }>
        { currentQuant !== 0
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
        </div>
      </StyledSizeQuantity>
      <AddToCartButton type="submit" value="Add to Cart" />
      </CartForm>
    </CartDiv>
  );
};

export default hot(AddToCart);


// range of 1 ->