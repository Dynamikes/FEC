import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import ImageView from './ImageView.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductInfo from './ProductInfo.jsx';
import styled from 'styled-components';

const StyledSideBar = styled.div`
  flex-direction: column;
  z-index: 1;
  display: default;
`;
// display: none;
const HiddenSideBar = styled(StyledSideBar)`
  display: none;
`;
const StyledProductInfo = styled.div`
  display: flex;
  align-self: flex-end;
  justify-content: center;
`;
const Wrapper = styled.div`
  display: flex;
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
  z-index: 2;
  width: 100%;
`;

function Overview() {
  //hook that adds state ttoggle

  //function that toggles state from A to B

  //switch statement that sets styled sidebar if A or hidden sidebar if B
  let [toggle, setToggle] = useState(!toggle);

  const toggleFunc = () => {
    setToggle(!toggle);
  };

  return (
    <BigWrapper>
      <StyledProductName>Product Name</StyledProductName>
      <Wrapper>
        <StyledImageView>
          <ImageView click={toggleFunc} />
        </StyledImageView>
        {toggle ? (
          <StyledSideBar>
            {' '}
            <StyleSelector />
            <AddToCart />{' '}
          </StyledSideBar>
        ) : (
          <HiddenSideBar>
            {' '}
            <StyleSelector />
            <AddToCart />{' '}
          </HiddenSideBar>
        )}
      </Wrapper>
      <StyledProductInfo>
        <ProductInfo />
      </StyledProductInfo>
    </BigWrapper>
  );
}

export default hot(Overview);
