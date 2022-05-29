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
export const styleIDContext = React.createContext();
export const prodIDContext = React.createContext();
function Overview() {
  //hook that adds state ttoggle
  //function that toggles state from A to B
  let [toggle, setToggle] = useState(!toggle);
  const [styleID, setStyleID] = useState(null)
  const [prodID, setProdID] = useState(40344)

  const toggleFunc = () => {
    setToggle(!toggle);
  };

  return (
    <styleIDContext.Provider value={styleID}>
      <prodIDContext.Provider value={prodID} >
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
    </prodIDContext.Provider>
    </styleIDContext.Provider>
  );
}

export default hot(Overview);
