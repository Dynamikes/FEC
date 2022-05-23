import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';
import ImageView from './ImageView.jsx';
import StyleSelector from './StyleSelector.jsx';
import AddToCart from './AddToCart.jsx';
import ProductDescription from './ProductDescription.jsx';
import ProductInfo from './ProductInfo.jsx';
import {
  StyledSideBar,
  HiddenSideBar,
  StyledProductInfo,
  Wrapper,
  OverviewWrapper,
  StyledImageView
}
from '../StyledComponents.jsx'

function Overview() {
  //hook that adds state ttoggle
  //function that toggles state from A to B
  let [toggle, setToggle] = useState(!toggle);

  const toggleFunc = () => {
    setToggle(!toggle);
  };

  return (
    <OverviewWrapper>
      <Wrapper>
        <StyledImageView>
          <ImageView click={toggleFunc} />
        </StyledImageView>
        {toggle ? (
          <StyledSideBar>
            {' '}
            <ProductInfo />
            <StyleSelector />
            <AddToCart />{' '}
          </StyledSideBar>
        ) : (
          <HiddenSideBar>
            {' '}
            <ProductInfo />
            <StyleSelector />
            <AddToCart />{' '}
          </HiddenSideBar>
        )}
      </Wrapper>
      <StyledProductInfo>
        <ProductDescription />
      </StyledProductInfo>
    </OverviewWrapper>
  );
}

export default hot(Overview);
