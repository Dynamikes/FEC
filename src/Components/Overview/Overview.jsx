import React from 'react';
import { hot } from 'react-hot-loader/root';
import ImageView from './ImageView.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductInfo from './ProductInfo.jsx';
import styled from 'styled-components';

const StyledSideBar = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;
const StyledProductInfo = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  z-index: 1;
`;
const StyledProductName = styled.h2`
  display: flex;
  justify-content: center;
  background: black;
  color: gold;
`;
const BigWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const StyledImageView = styled.div`
  display: flex;
  width: 100%;
  z-index: 2;
`;

function Overview() {
  return (
    <BigWrapper>
      <StyledProductName>Product Name</StyledProductName>
      <Wrapper>
        <StyledImageView>
          <ImageView />
        </StyledImageView>
        <StyledSideBar>
          <StyleSelector />
          <AddToCart />
        </StyledSideBar>
      </Wrapper>
      <StyledProductInfo>
        <ProductInfo />
      </StyledProductInfo>
    </BigWrapper>
  );
}

export default hot(Overview);
