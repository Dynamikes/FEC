import React from 'react';
import { hot } from 'react-hot-loader/root';
// import axios from 'axios';
import styled from 'styled-components';
const CartDiv = styled.div`
  display: flex;
  justify-content: center;
  background-color: blue;
  border: 10px;
  border-color: black;
`;
const CartH3 = styled.h3`
  background-color: blue;
`;
const AddToCart = () => {
  return (
    <CartDiv>
      <CartH3>AddToCart</CartH3>
    </CartDiv>
  );
};

export default hot(AddToCart);
