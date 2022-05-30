import React from 'react';
import { hot } from 'react-hot-loader/root';
//import styled from 'styled-components';
//import axios from 'axios';
import {
  ProductInfoWrapper,
  StyledParagraph,
  Title,
} from '../StyledComponents.jsx';

function ProductDescription() {
  return (
    <ProductInfoWrapper>
      <Title>Product Description</Title>
      <StyledParagraph>
        This is a short description about the product. But now im gonna make it super long to see how far the length goes but i lost the copy pasta and ive had too many monsters.
      </StyledParagraph>
    </ProductInfoWrapper>
  );
}

export default hot(ProductDescription);
