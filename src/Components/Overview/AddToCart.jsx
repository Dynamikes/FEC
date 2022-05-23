import React from 'react';
import { hot } from 'react-hot-loader/root';
// import axios from 'axios';
// import styled from 'styled-components';
import { CartDiv, StyledSizeQuantity, StyledSizeSelect, StyledQuantitySelect, AddToCartButton } from '../StyledComponents.jsx';

const AddToCart = () => {
  return (
    <CartDiv>
      <StyledSizeQuantity>
        <StyledSizeSelect name='SizeSelect' id='SizeSelect'>
          <option value='empty' disabled selected hidden> Select Size </option>
          <option value="small"> Small </option>
          <option value="medium"> Medium </option>
          <option value="large"> Large </option>
        </StyledSizeSelect>
        <StyledQuantitySelect name='Quantity' id='Quantity'>
          <option value="1"> 1 </option>
          <option value="2"> 2 </option>
          <option value="3"> 3 </option>
        </StyledQuantitySelect>
       </StyledSizeQuantity>
       <AddToCartButton>
         Add to Cart
       </AddToCartButton>
    </CartDiv>
  );
};

export default hot(AddToCart);
